import { Router } from "express";
import { isAdmin, isAuthenticated } from "../utils/auth.middleware";
import { addProduct, deleteProduct, getAllProducts, getProductById, updateProduct, searchProduct } from "../Controllers/product.controler";

const productRoute = Router()

productRoute.get('/products', getAllProducts);
productRoute.get('/products/search', isAuthenticated, searchProduct);
productRoute.post('/products', isAuthenticated,isAdmin, addProduct);
productRoute.get('/products/:productId', isAuthenticated,getProductById);
productRoute.put('/products/:productId', isAuthenticated,isAdmin, updateProduct);
productRoute.delete('/products/:productId', isAuthenticated,isAdmin, deleteProduct);

export default productRoute