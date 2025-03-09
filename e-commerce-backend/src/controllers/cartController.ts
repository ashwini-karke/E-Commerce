import { Request, Response } from "express";
import Cart from "../models/Cart";
import Product from "../models/Product";

// Add product to cart
export const addToCart = async (req: Request, res: Response): Promise<any> => {
  try {
    const { _id, name, price, description, category, image } = req.body;
    const userId = req.user?.id; // Assuming user authentication is in place

    // Validate required fields
    if (!_id || !userId) {
      return res.status(400).json({ message: "Product ID and user ID are required" });
    }

    // Check if the product exists
    const productExists = await Product.findById(_id);
    if (!productExists) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the cart exists for the user
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      // Create a new cart if it doesn't exist
      cart = await Cart.create({
        user: userId,
        items: [{ product: _id, quantity: 1, name, price, description, category, image }],
      });
    } else {
      // Check if the product is already in the cart
      const itemIndex = cart.items.findIndex((item) => item.product.toString() === _id);

      if (itemIndex > -1) {
        // If product exists, increase quantity
        cart.items[itemIndex].quantity += 1;
      } else {
        // Add new product to cart
        cart.items.push({ product: _id, quantity: 1, name, price, description, category, image });
      }

      await cart.save();
    }

    res.status(200).json({ message: "Product added to cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get cart details for a user
export const getCart = async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = req.user?.id; // Assuming user is authenticated

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart is empty" });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Remove an item from the cart
export const removeFromCart = async (req: Request, res: Response): Promise<any> => {
    try {
      const userId = req.user?.id;
      const { productId } = req.params; // Extract productId from params
  
      console.log("User ID:", userId); // Debugging
      console.log("Product ID:", productId); // Debugging
  
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized: User not found" });
      }
  
      if (!productId) {
        return res.status(400).json({ message: "Product ID is required" });
      }
  
      // Find user's cart
      const cart = await Cart.findOne({ user: userId });
  
      if (!cart) {
        return res.status(404).json({ message: "Cart not found. Please add items first." });
      }
  
      // Find the product in the cart
      const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);
  
      if (itemIndex === -1) {
        return res.status(404).json({ message: "Product not found in cart" });
      }
  
      // Decrease quantity by 1
      if (cart.items[itemIndex].quantity > 1) {
        cart.items[itemIndex].quantity -= 1;
      } else {
        // Remove item if quantity is 0
        cart.items.splice(itemIndex, 1);
      }
  
      // If the cart is empty after removal, delete the cart
      if (cart.items.length === 0) {
        await Cart.findByIdAndDelete(cart._id);
        return res.status(200).json({ message: "Cart is now empty and has been removed" });
      }
  
      // Save the updated cart
      await cart.save();
      res.status(200).json({ message: "Product quantity updated", cart });
  
    } catch (error) {
      console.error("Error updating product quantity:", error);
      res.status(500).json({ message: "Server error", error });
    }
  };
  

// Clear all items from the cart
export const clearCart = async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = req.user?.id; // Assuming authentication middleware provides `req.user`

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    // Find and delete the cart
    const deletedCart = await Cart.findOneAndDelete({ user: userId });

    if (!deletedCart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
