import { Request, Response } from "express";
import Product from "../models/Product";
import multer from "multer";
import mongoose from "mongoose";

// Configure Multer for file uploads (store in memory)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Create new product (Admin only)
export const addProduct = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, price, description, category } = req.body;

    // Ensure required fields are provided
    if (!name || !price || !description || !category || !req.file) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const product = await Product.create({
      name,
      price,
      description,
      category,
      image: req.file.buffer, // Store image as binary data
      imageType: req.file.mimetype, // Store MIME type (e.g., "image/png")
    });

    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all products
export const getProducts = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const products = await Product.find(
      {},
      { createdAt: 0, updatedAt: 0, __v: 0 }
    ); // Exclude unwanted fields

    // Convert binary image data to Base64 URLs
    const productsWithImages = products.map((product) => ({
      ...product.toObject(),
      image: product.image
        ? `data:${product.imageType};base64,${product.image.toString("base64")}`
        : null, // Convert binary data to a displayable format
    }));

    res.status(200).json(productsWithImages);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update product (Admin only)
export const updateProduct = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { name, price, description, category } = req.body;
    const { id } = req.params;

    // Find product by ID
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update fields if provided
    if (name) product.name = name;
    if (price) product.price = price;
    if (description) product.description = description;
    if (category) product.category = category;

    // Update image if a new file is uploaded
    if (req.file) {
      product.image = req.file.buffer;
      product.imageType = req.file.mimetype;
    }

    await product.save();
    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete a product
export const deleteProduct = async (req: Request, res: Response): Promise<any> => {
    try {
        const productId = req.params.id;

        // Check if the provided ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: "Invalid product ID format" });
        }

        const deletedProduct = await Product.findByIdAndDelete(new mongoose.Types.ObjectId(productId));

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
