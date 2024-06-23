import mongoose, { Schema, Document } from "mongoose"
import { UserSchema } from "./user.model"
import { IProduct } from "./product.model";

export interface ICart extends Document {
    user: typeof UserSchema,
    items: [{
        productId: IProduct,
        buyingQuantity: number,
        buyingItemTotalPrice: number
    }],
    buyingTotalPrice: number
}

export const cartSchema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        buyingQuantity: { type: Number, required: true, min: 1 },
        buyingItemTotalPrice: { type: Number, required: true },
      },
    ],
    buyingTotalPrice: { type: Number, required: true },
  }, { timestamps: true }
);

export const Cart = mongoose.model<ICart>("cart", cartSchema)