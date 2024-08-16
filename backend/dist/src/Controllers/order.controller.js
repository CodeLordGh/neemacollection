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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.getOderById = exports.updateOrder = exports.getOrders = exports.createOrder = void 0;
const order_model_1 = require("../Models/order.model");
const cart_model_1 = require("../Models/cart.model");
const mpesaAuth_1 = __importDefault(require("../utils/mpesaAuth"));
const product_model_1 = require("../Models/product.model");
/**
 * Creates a new order with the provided products for the authenticated user.
 *
 * @param {Request} req - The HTTP request object containing the user and products.
 * @param {Response} res - The HTTP response object to send the result.
 * @return {Promise<void>} A promise that resolves when the order is created successfully or rejects with an error.
 */
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { paymentMethod, deliveryType } = req.body;
    // get all data from cart and proceed to payment checkout, confirm payment and place order
    try {
        const userId = user._id;
        const cart = yield cart_model_1.Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        const products = cart.items.map((item) => {
            return {
                product: item.productId,
                itemTotalPrice: item.buyingQuantity,
                quantity: item.buyingQuantity
            };
        });
        if (products.length < 1) {
            return res.status(404).json({ message: "Cart is empty" });
        }
        // check if user address, phone number exist. if yes then continue to payment checkout. if not tell user to fill it in the settings
        if (!user.address || !user.phone) {
            return res.status(404).json({ message: "Please fill in your address and phone number" });
        }
        let MPesa_token;
        // Call the function
        (0, mpesaAuth_1.default)().then(token => {
            MPesa_token = token;
        }).catch((error) => {
            console.error('Failed to get OAuth token:', error);
            throw error;
        });
        // check if user can buy the quantity of selected products
        for (const product of products) {
            const productInStock = yield product_model_1.Product.findById(product.product);
            if (!productInStock || productInStock.stock < product.quantity) {
                return res.status(404).json({ message: `Not enough stock for product ${product.product}` });
            }
        }
        if (paymentMethod === "wallet") {
            if (user.wallet < cart.buyingTotalPrice) {
                return res.status(404).json({ message: "Insufficient funds in your wallet. Deposits funds to your wallet or kindly use cash on delivery method!" });
            }
            // deduct payment from user's wallet
            yield deductPaymentFromWallet(user, cart.buyingTotalPrice);
        }
        const newOrder = new order_model_1.order({
            user: user,
            items: products,
            total: cart.buyingTotalPrice,
            deliveryType: deliveryType,
            paymentMethod: paymentMethod,
        });
        yield newOrder.save();
        res.status(201).json({ message: "Order created successfully", order: newOrder });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.createOrder = createOrder;
const deductPaymentFromWallet = (user, amount) => __awaiter(void 0, void 0, void 0, function* () {
    user.wallet -= amount;
    yield user.save();
});
/**
 * Retrieves all orders for the authenticated user.
 *
 * @param {Request} req - The HTTP request object containing the authenticated user.
 * @param {Response} res - The HTTP response object to send the result.
 * @return {Promise<void>} A promise that resolves when the orders are retrieved successfully or rejects with an error.
 */
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log(req.headers);
    try {
        const orders = yield order_model_1.order.find({ user: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id });
        orders.length === 0 ? res.status(404).json({ message: "You have no orders for now!" }) : res.status(200).json({ message: "Orders retrieved successfully", orders });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getOrders = getOrders;
/**
 * Updates an order by its ID with the provided data.
 *
 * @param {Request} req - The HTTP request object containing the order ID and updated data.
 * @param {Response} res - The HTTP response object to send the result.
 * @return {Promise<void>} A promise that resolves when the order is updated successfully or rejects with an error.
 */
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield order_model_1.order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json({ message: "Order updated successfully", order });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.updateOrder = updateOrder;
/**
 * Retrieves a specific order by its ID.
 *
 * @param {Request} req - The HTTP request object containing the order ID.
 * @param {Response} res - The HTTP response object to send the result.
 * @return {Promise<void>} A promise that resolves when the order is retrieved successfully or rejects with an error.
 */
const getOderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield order_model_1.order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json({ message: "Order retrieved successfully", order });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getOderById = getOderById;
/**
 * Deletes an order by its ID.
 *
 * @param {Request} req - The HTTP request object containing the order ID.
 * @param {Response} res - The HTTP response object to send the result.
 * @return {Promise<void>} A promise that resolves when the order is deleted successfully or rejects with an error.
 */
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield order_model_1.order.findByIdAndDelete(req.params.id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json({ message: "Order deleted successfully", order });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.deleteOrder = deleteOrder;
