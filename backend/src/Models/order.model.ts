import mongoose, { Schema, Document } from "mongoose";
import { UserSchema } from "./user.model";
import { ProductSchema } from "./product.model";

export interface IOrder extends Document {
  user: typeof UserSchema;
  items:[
    {
      product: typeof ProductSchema;
      quantity: number;
      itemTotalPrice: number;
    }
  ]
  status: string;
  paymentMethod: string;
  deliveryType: string;
}

const OrderSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true },
      itemTotalPrice: { type: Number, required: true },
    },
  ],
  status: {
    type: String,
    enum: ['pending', 'completed', 'cancelled' ],
    default: 'pending'
  } ,
  paymentMethod: { type: String, required: true, enum: ["payment on delivery", "wallet"], default: "wallet" },
  deliveryType: {type: String, enum: ["Shop pick-up", "Home delivery"], default: "Home delivery", require: true}
}, { timestamps: true });

export const order = mongoose.model<IOrder>("Order", OrderSchema);