"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFromCart = exports.getCart = exports.addToCart = void 0;
const cart_model_1 = require("../Models/cart.model");
const product_model_1 = require("../Models/product.model");
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, buyingQuantity } = req.body;
    try {
        const item = yield product_model_1.Product.findById(productId);
        if (item) {
            const userId = req.user._id;
            const cart = yield cart_model_1.Cart.findOne({ user: userId });
            if (!cart) {
                const newCart = new cart_model_1.Cart({
                    user: userId,
                    items: [
                        {
                            productId: productId,
                            buyingQuantity: buyingQuantity,
                            buyingItemTotalPrice: item.price * buyingQuantity
                        }
                    ],
                    buyingTotalPrice: item.price * buyingQuantity
                });
                yield newCart.save();
                return res.status(200).json(newCart);
            }
            const cartItem = cart.items;
            const itemIndex = cartItem.findIndex((item) => item.productId.toString() === productId.toString());
            if (itemIndex > -1) {
                cartItem[itemIndex].buyingQuantity += buyingQuantity;
                cartItem[itemIndex].buyingItemTotalPrice += item.price * buyingQuantity;
                cart.buyingTotalPrice += item.price * buyingQuantity;
            }
            else {
                cartItem.push({
                    productId: productId,
                    buyingQuantity: buyingQuantity,
                    buyingItemTotalPrice: item.price * buyingQuantity
                });
                cart.buyingTotalPrice += item.price * buyingQuantity;
            }
            cart.items = cartItem;
            yield cart.save();
            return res.status(200).json(cart);
        }
        else {
            return res.status(404).json({ message: "Product not found" });
        }
    }
    catch (error) {
        console.log(error);
        res.send(error);
    }
});
exports.addToCart = addToCart;
const getCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id;
        const cart = yield cart_model_1.Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        return res.status(200).json(cart);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getCart = getCart;
const removeFromCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.body;
    try {
        const userId = req.user._id;
        const cart = yield cart_model_1.Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        const cartItem = cart.items;
        const itemIndex = cartItem.findIndex((item) => item.productId.toString() === productId.toString());
        if (itemIndex > -1) {
            const price = cartItem[itemIndex].buyingItemTotalPrice;
            cartItem.splice(itemIndex, 1);
            cart.buyingTotalPrice -= price;
        }
        cart.items = cartItem;
        yield cart.save();
        return res.status(200).json(cart);
    }
    catch (error) {
        console.log(error);
        res.send(error);
    }
});
exports.removeFromCart = removeFromCart;
