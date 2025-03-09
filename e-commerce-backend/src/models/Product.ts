import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: Buffer, required: true }, // Store image as binary
    imageType: { type: String, required: true }, // Store MIME type (e.g., "image/png")
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
