import { Request, Response } from "express";
import Order from "../models/Order";

// Create a new order
export const createOrder = async (req: Request, res: Response): Promise<any> => {
  try {
    const { invoiceNumber, items, totalAmount, shippingAddress, paymentDetails } = req.body;
    const userId = req.user?.id; // Assuming user authentication is in place

    if (!userId || !invoiceNumber || !shippingAddress || !paymentDetails || !items.length) {
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

    res.status(201).json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get orders for a user
export const getOrders = async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    const orders = await Order.find({ user: userId });

    if (!orders.length) {
      return res.status(404).json({ message: "No orders found" });
    }

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get order details by order ID
export const getOrderDetails = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { orderId } = req.params;
    const userId = req.user?.id;
    const isAdmin = req.user?.isAdmin;

    let order;
    if (isAdmin) {
      // Admins can fetch any order
      order = await Order.findById(orderId);
    } else {
      // Users can fetch only their own orders
      order = await Order.findOne({ _id: orderId, user: userId });
    }

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
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
