import { Cart } from "../Models/cart.model";
import { Product } from "../Models/product.model";

export const addToCart = async (req: any, res: any) => {
    const { productId, buyingQuantity } = req.body;

    try {
        const item = await Product.findById(productId)
        if (item) {
            const userId = req.user._id
            const cart = await Cart.findOne({ user: userId })
            if (!cart) {
                const newCart = new Cart({
                    user: userId,
                    items: [
                        {
                            productId: productId,
                            buyingQuantity: buyingQuantity,
                            buyingItemTotalPrice: item.price * buyingQuantity
                        }
                    ],
                    buyingTotalPrice: item.price * buyingQuantity
                })
                await newCart.save()
                return res.status(200).json(newCart)
            }

            const cartItem = cart.items
            const itemIndex = cartItem.findIndex((item: any) => item.productId.toString() === productId.toString())
            if (itemIndex > -1) {
                cartItem[itemIndex].buyingQuantity += buyingQuantity
                cartItem[itemIndex].buyingItemTotalPrice += item.price * buyingQuantity
                cart.buyingTotalPrice += item.price * buyingQuantity
            } 
            else {
                cartItem.push({
                    productId: productId,
                    buyingQuantity: buyingQuantity,
                    buyingItemTotalPrice: item.price * buyingQuantity
                })
                cart.buyingTotalPrice += item.price * buyingQuantity
            }

            cart.items = cartItem
            await cart.save()
            return res.status(200).json(cart)

        } else {
            return res.status(404).json({ message: "Product not found" })
        }

    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

export const getCart = async (req: any, res: any) => {
    try {
        const userId = req.user._id
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        return res.status(200).json(cart);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const removeFromCart = async (req: any, res: any) => {
    const { productId } = req.body;

    try {
        const userId = req.user._id
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const cartItem = cart.items
        const itemIndex = cartItem.findIndex((item: any) => item.productId.toString() === productId.toString())
        if (itemIndex > -1) {
            const price = cartItem[itemIndex].buyingItemTotalPrice
            cartItem.splice(itemIndex, 1)
            cart.buyingTotalPrice -= price
        }

        cart.items = cartItem
        await cart.save()
        return res.status(200).json(cart)

    } catch (error) {
        console.log(error)
        res.send(error)
    }
}