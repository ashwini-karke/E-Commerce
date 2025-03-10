import mongoose, { Document, Schema } from "mongoose";

// Define interface for TypeScript type safety
interface IOrderItem {
  product: mongoose.Types.ObjectId;
  quantity: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  invoiceNumber: string; // ✅ Added invoice number
  items: IOrderItem[];
  totalAmount: number;
  shippingAddress: string;
  paymentDetails: string;
  status: string; // 'Pending', 'Shipped', 'Delivered', 'Cancelled'
}

const orderSchema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    invoiceNumber: { type: String, unique: true, required: true }, // ✅ Added invoice number field
    items: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        description: { type: String, required: true },
        category: { type: String, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    shippingAddress: { type: String, required: true },
    paymentDetails: { type: String, required: true },
    status: { type: String, enum: ["Pending", "Shipped", "Delivered", "Cancelled"], default: "Pending" },
  },
  { timestamps: true }
);

export default mongoose.model<IOrder>("Order", orderSchema);
