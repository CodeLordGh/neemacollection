import { Request, Response } from "express";
import { Product } from "../Models/product.model";

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find({});
        if (products.length === 0) {
            res.json({message: 'No products found'});
        } else {
            res.json(products);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Error retrieving products'});
    }
}

export const addProduct = async (req: Request, res: Response) => {
    const {title, description, price, category, stock, image} = req.body;

    if (!/^[a-zA-Z\s]*$/.test(title) || !/^[a-zA-Z\s]*$/.test(description) || !category || !/^\d/.test(price) || !/^\d/.test(stock) || !/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(image)) {

        if(!/^[a-zA-Z\s]*$/.test(title)) console.log("Title is not valid")
        else if(!/^[a-zA-Z\s]*$/.test(description)) console.log("Description is not valid")
        else if (!category) console.log("Category is not valid")
        else if (!/^\d/.test(price)) console.log("Price is not valid")
        else if (!/^\d/.test(stock)) console.log("stock is not valid")

        return res.status(400).json({message: 'All fields are required'});
    }

    try {
        const existingProduct = await Product.findOne({title});
        if (existingProduct) {
            return res.json({message: `Product exist already and stock is ${existingProduct.stock}. Please update the existing product`});
        }

        const newProduct = new Product({
            title, description, price, category, stock, image
        });

        await newProduct.save();
        res.json({message: `product ${title} added successfully!`});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: `error saving product ${title}!`});
    }
}

export const getProductById = async (req: Request, res: Response) => {
    const {productId} = req.params;
    try {
        const product = await Product.findById(productId);
        if (!product) {
            res.json({message: 'Product not found'});
        } else {
            res.json(product);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Error retrieving product'});
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    const {productId} = req.params;
    const {title, description, price, category, stock} = req.body;

    try {
        const product = await Product.findByIdAndUpdate(productId);
        if (!product) {
            res.json({message: 'Product not found'});
        } else {
            product.title = title;
            product.description = description;
            product.price = price;
            product.category = category;
            product.stock = stock;
            await product.save();
        }
    }catch (error) {
        console.log(error);
        res.status(500).json({message: 'Error updating product'});
    }
    res.json({message: 'Product updated successfully'});
}

export const deleteProduct = async (req: Request, res: Response) => {
    const {productId} = req.params;
    try {
        const product = await Product.findByIdAndDelete(productId);
        if (!product) {
            res.json({message: 'Product not found'});
        } else {
            res.json({message: 'Product deleted successfully'});
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Error deleting product'});
    }

}
export const searchProduct = async (req: Request, res: Response) => {
    const {searchTerm, category, minPrice, maxPrice} = req.query;

    try{
        let query = {}
        if(searchTerm){
            query = {$or: [{title: {$regex: searchTerm, $options: 'i'}}, {description: {$regex: searchTerm, $options: 'i'}}]}
        } else if (category){
            query = { category: { $in: [category] } }
        } else if (minPrice && maxPrice){
            query = {price: {$gte: minPrice, $lte: maxPrice}}
        }

        const products = await Product.find(query);
        res.json(products)
    }catch (error) {
        console.log(error)
        res.status(500).send(`Internale server error!`)
    }
}