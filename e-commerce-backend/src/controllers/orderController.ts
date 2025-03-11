import { Request, Response } from "express";
import Order from "../models/Order";
import mongoose from "mongoose";

// Create a new order
export const createOrder = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const {
      invoiceNumber,
      items,
      totalAmount,
      shippingAddress,
      paymentDetails,
    } = req.body;
    const userId = req.user?.id; // Assuming user authentication is in place

    if (
      !userId ||
      !invoiceNumber ||
      !shippingAddress ||
      !paymentDetails ||
      !items.length
    ) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    const newOrder = await Order.create({
      user: userId,
      invoiceNumber, // ✅ Storing invoice number from frontend
      items,
      totalAmount,
      shippingAddress,
      paymentDetails,
      status: "Pending",
    });

    res
      .status(201)
      .json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getOrders = async (req: Request, res: Response): Promise<any> => {
  console.log("Received Query Params:", req.query);
  try {
    const userId = req.user?.id;
    const isAdmin = req.user?.isAdmin;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    const { orderId, name, category } = req.query;

    let filter: any = {};

    if (!isAdmin) {
      filter.user = userId; // Restrict to user's own orders
    }

    // ✅ Order ID Search (Exact Match)
    if (orderId && typeof orderId === "string") {
      if (mongoose.Types.ObjectId.isValid(orderId)) {
        filter._id = new mongoose.Types.ObjectId(orderId);
      } else {
        console.log("Invalid Order ID:", orderId);
        return res.status(400).json({ message: "Invalid order ID format" });
      }
    }

    // ✅ Name Search (Handles ObjectId, Status, and Product Name)
    if (name && typeof name === "string") {
      if (mongoose.Types.ObjectId.isValid(name)) {
        // If `name` is an ObjectId, treat it as an exact match for `_id`
        filter._id = new mongoose.Types.ObjectId(name);
      } else if (name.length >= 3) {
        // Otherwise, perform a partial search for status or product name
        const possibleStatuses = ["Pending", "Shipped", "Delivered", "Cancelled"];
        const isStatusMatch = possibleStatuses.some((status) =>
          status.toLowerCase().includes(name.toLowerCase())
        );

        if (isStatusMatch) {
          filter.status = { $regex: new RegExp(name, "i") };
        } else {
          filter.items = { $elemMatch: { name: { $regex: new RegExp(name, "i") } } };
        }
      }
    }

    // ✅ Category Search
    if (category && typeof category === "string") {
      filter.items = filter.items || { $elemMatch: {} };
      filter.items.$elemMatch.category = { $regex: new RegExp(category, "i") };
    }

    // Remove empty `$elemMatch`
    if (filter.items && Object.keys(filter.items.$elemMatch).length === 0) {
      delete filter.items;
    }

    console.log("Final MongoDB Query Filter:", JSON.stringify(filter, null, 2));

    // Fetch orders with the applied filter
    const orders = await Order.find(filter);

    if (!orders.length) {
      console.log("No orders found for filter:", JSON.stringify(filter, null, 2));
      return res.status(404).json({ message: "No orders found" });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Update order status (Admin Only)
export const updateOrderStatus = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const isAdmin = req.user?.isAdmin;

    if (!isAdmin) {
      return res
        .status(403)
        .json({ message: "Forbidden: Admin access required" });
    }

    if (
      !status ||
      !["Pending", "Shipped", "Delivered", "Cancelled"].includes(status)
    ) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
