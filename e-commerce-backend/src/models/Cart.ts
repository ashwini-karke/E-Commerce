import mongoose, { Document, Schema } from "mongoose";

// Define interface for TypeScript type safety
interface ICartItem {
  product: mongoose.Types.ObjectId;
  quantity: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

interface ICart extends Document {
  user: mongoose.Types.ObjectId;
  items: ICartItem[];
}

const cartSchema = new Schema<ICart>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true, default: 1 },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        description: { type: String, required: true },
        category: { type: String, required: true },
        image: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<ICart>("Cart", cartSchema);
