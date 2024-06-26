import { Request, Response } from "express";
import { order as Order, IOrder } from "../Models/order.model";
import { Cart } from "../Models/cart.model";
import getOAuthToken from "../utils/mpesaAuth";
import { Product } from "../Models/product.model";

/**
 * Creates a new order with the provided products for the authenticated user.
 *
 * @param {Request} req - The HTTP request object containing the user and products.
 * @param {Response} res - The HTTP response object to send the result.
 * @return {Promise<void>} A promise that resolves when the order is created successfully or rejects with an error.
 */
export const createOrder = async (req: any, res: Response) => {
  const user = req.user
  const { paymentMethod, deliveryType } = req.body
  // get all data from cart and proceed to payment checkout, confirm payment and place order

  try {
    const userId = user._id;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const products = cart.items.map((item: any) => {
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

    let MPesa_token

    // Call the function
    getOAuthToken().then(token => {
      MPesa_token = token
    }).catch((error: any) => {
      console.error('Failed to get OAuth token:', error);
      throw error;
    });

    // check if user can buy the quantity of selected products
    for (const product of products) {
      const productInStock = await Product.findById(product.product);
      if (!productInStock || productInStock.stock < product.quantity) {
        return res.status(404).json({ message: `Not enough stock for product ${product.product}` });
      }
    }

    if (paymentMethod === "wallet") {
      if (user.wallet < cart.buyingTotalPrice) {
        return res.status(404).json({ message: "Insufficient funds in your wallet. Deposits funds to your wallet or kindly use cash on delivery method!" });
      }
      // deduct payment from user's wallet
      await deductPaymentFromWallet(user, cart.buyingTotalPrice);
    }

    const newOrder = new Order({
      user: user,
      items: products,
      total: cart.buyingTotalPrice,
      deliveryType: deliveryType,
      paymentMethod: paymentMethod,
    });

    await newOrder.save();
    res.status(201).json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deductPaymentFromWallet = async (user: any, amount: number) => {
  user.wallet -= amount;
  await user.save();
};

/**
 * Retrieves all orders for the authenticated user.
 *
 * @param {Request} req - The HTTP request object containing the authenticated user.
 * @param {Response} res - The HTTP response object to send the result.
 * @return {Promise<void>} A promise that resolves when the orders are retrieved successfully or rejects with an error.
 */
export const getOrders = async (req: any, res: Response) => {
  console.log(req.headers)
  try {
    const orders: IOrder[] = await Order.find({ user: req.user?._id });

    orders.length === 0 ? res.status(404).json({ message: "You have no orders for now!" }) : res.status(200).json({ message: "Orders retrieved successfully", orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Updates an order by its ID with the provided data.
 *
 * @param {Request} req - The HTTP request object containing the order ID and updated data.
 * @param {Response} res - The HTTP response object to send the result.
 * @return {Promise<void>} A promise that resolves when the order is updated successfully or rejects with an error.
 */
export const updateOrder = async (req: Request, res: Response) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true })!;

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order updated successfully", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
/**
 * Retrieves a specific order by its ID.
 *
 * @param {Request} req - The HTTP request object containing the order ID.
 * @param {Response} res - The HTTP response object to send the result.
 * @return {Promise<void>} A promise that resolves when the order is retrieved successfully or rejects with an error.
 */
export const getOderById = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order retrieved successfully", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
/**
 * Deletes an order by its ID.
 *
 * @param {Request} req - The HTTP request object containing the order ID.
 * @param {Response} res - The HTTP response object to send the result.
 * @return {Promise<void>} A promise that resolves when the order is deleted successfully or rejects with an error.
 */
export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order deleted successfully", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};