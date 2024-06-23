// src\Model\user.model.ts
import mongoose from "mongoose";
import { Schema } from "mongoose";

// interface
export interface IUser {
    // _id of type mongoose id or mongodb id
 _id: mongoose.Schema.Types.ObjectId,
  username: string;
  email: string;
  phone: String;
  isAdmin: boolean;
  password: string;
  address: string;
  wallet: number;
  deliveryType: string;
  orders: Array<mongoose.Schema.Types.ObjectId>;
}

// mongoose schema
export const UserSchema = new Schema<IUser>({
    // _id: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        required: true,
        match: /^[a-zA-Z\s]*$/
    },
    wallet: {type: Number, default: 0, min: 0},
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    orders:  [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order"
    }],
    phone: {type: String},
    deliveryType: {type: String},
    address: {type: String},
}, { timestamps: true });

// save in mongodb database
export const UserModel = mongoose.model<IUser>("User", UserSchema);

export let fakeDB : IUser;