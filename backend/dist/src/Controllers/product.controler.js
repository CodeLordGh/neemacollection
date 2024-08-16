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
exports.searchProduct = exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.addProduct = exports.getAllProducts = void 0;
const product_model_1 = require("../Models/product.model");
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_model_1.Product.find({});
        if (products.length === 0) {
            res.json({ message: 'No products found' });
        }
        else {
            res.json(products);
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error retrieving products' });
    }
});
exports.getAllProducts = getAllProducts;
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, price, category, stock, image } = req.body;
    if (!/^[a-zA-Z\s]*$/.test(title) || !/^[a-zA-Z\s]*$/.test(description) || !category || !/^\d/.test(price) || !/^\d/.test(stock) || !/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(image)) {
        if (!/^[a-zA-Z\s]*$/.test(title))
            console.log("Title is not valid");
        else if (!/^[a-zA-Z\s]*$/.test(description))
            console.log("Description is not valid");
        else if (!category)
            console.log("Category is not valid");
        else if (!/^\d/.test(price))
            console.log("Price is not valid");
        else if (!/^\d/.test(stock))
            console.log("stock is not valid");
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        const existingProduct = yield product_model_1.Product.findOne({ title });
        if (existingProduct) {
            return res.json({ message: `Product exist already and stock is ${existingProduct.stock}. Please update the existing product` });
        }
        const newProduct = new product_model_1.Product({
            title, description, price, category, stock, image
        });
        yield newProduct.save();
        res.json({ message: `product ${title} added successfully!` });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: `error saving product ${title}!` });
    }
});
exports.addProduct = addProduct;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    try {
        const product = yield product_model_1.Product.findById(productId);
        if (!product) {
            res.json({ message: 'Product not found' });
        }
        else {
            res.json(product);
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error retrieving product' });
    }
});
exports.getProductById = getProductById;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    const { title, description, price, category, stock } = req.body;
    try {
        const product = yield product_model_1.Product.findByIdAndUpdate(productId);
        if (!product) {
            res.json({ message: 'Product not found' });
        }
        else {
            product.title = title;
            product.description = description;
            product.price = price;
            product.category = category;
            product.stock = stock;
            yield product.save();
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error updating product' });
    }
    res.json({ message: 'Product updated successfully' });
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    try {
        const product = yield product_model_1.Product.findByIdAndDelete(productId);
        if (!product) {
            res.json({ message: 'Product not found' });
        }
        else {
            res.json({ message: 'Product deleted successfully' });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error deleting product' });
    }
});
exports.deleteProduct = deleteProduct;
const searchProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm, category, minPrice, maxPrice } = req.query;
    try {
        let query = {};
        if (searchTerm) {
            query = { $or: [{ title: { $regex: searchTerm, $options: 'i' } }, { description: { $regex: searchTerm, $options: 'i' } }] };
        }
        else if (category) {
            query = { category: { $in: [category] } };
        }
        else if (minPrice && maxPrice) {
            query = { price: { $gte: minPrice, $lte: maxPrice } };
        }
        const products = yield product_model_1.Product.find(query);
        res.json(products);
    }
    catch (error) {
        console.log(error);
        res.status(500).send(`Internale server error!`);
    }
});
exports.searchProduct = searchProduct;
