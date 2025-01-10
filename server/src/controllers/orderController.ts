import { Request, Response } from "express";
import Order from "../models/order";
import Restaurant, { MenuItemType } from "../models/restaurant";
import axios from "axios";
import * as crypto from "crypto";

type CheckoutSessionRequest = {
	cartItems: {
		menuItemId: string;
		name: string;
		quantity: string;
	}[];
	deliveryDetails: {
		email: string;
		name: string;
		addressLine1: string;
		city: string;
		country?: string;
	};
	restaurantId: string;
};

const createCheckoutSession = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const checkoutSessionRequest: CheckoutSessionRequest = req.body;
		const restaurant = await Restaurant.findById(
			checkoutSessionRequest.restaurantId
		);

		if (!restaurant) {
			throw new Error("Restaurant not found");
		}

		const lineItems = createLineItems(
			checkoutSessionRequest,
			restaurant.menuItems
		);

		const totalAmount = lineItems.reduce(
			(sum, item) => sum + item.total,
			restaurant.deliveryPrice
		);

		// Convert total amount to kobo (smallest currency unit)
		const totalAmountInKobo = totalAmount * 100;

		const { email } = checkoutSessionRequest?.deliveryDetails;

		const newOrder = new Order({
			restaurant: restaurant,
			user: req.userId,
			status: "placed",
			deliveryDetails: checkoutSessionRequest.deliveryDetails,
			cartItems: checkoutSessionRequest.cartItems,
			totalAmount,
			createdAt: new Date(),
		});

		const response = await axios.post(
			"https://api.paystack.co/transaction/initialize",
			{
				email,
				amount: totalAmountInKobo,
				callback_url: `${process.env.FRONTEND_URL}`,
				metadata: {
					order_id: newOrder._id.toString(), //  to help track orders
				},
			},
			{
				headers: {
					Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
				},
			}
		);

		if (response.data.status === true && response.data.data.authorization_url) {
			newOrder.paymentReference = response.data.data.reference; // Store the reference
			await newOrder.save();
		}

		res.status(200).json(response.data);
		return;
	} catch (error) {
		console.error("Full error details:", error);
		res.status(500).json({ message: "Error on checkout" });
	}
};

const paystackWebHookHandler = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		//validate event
		const hash = crypto
			.createHmac("sha512", process.env.PAYSTACK_SECRET_KEY as string)
			.update(req.body)
			.digest("hex");

		// handle unsuccessful payment
		if (hash !== req.headers["x-paystack-signature"]) {
			res.status(400).json({ error: "Invalid signature" });
			return;
		}
		// Retrieve the request's body
		const event = JSON.parse(req.body.toString());

		// Handle successful payment
		if (event.event === "charge.success" && event.data.status === "success") {
			//   get order details from metadata
			const email = event.data.customer.email;
			const paymentReference = event.data.reference;
			const paymentStatus = event.data.status;
			const totalAmount = event.data.amount;

			let order;
			try {
				order = await Order.findOne({
					paymentReference,
				});
			} catch (dbError) {
				console.error("Error finding order in database:", dbError);
				res.status(500).json({ error: "Internal server error" });
				return;
			}

			console.log("Found order:", order); // Log the found order

			if (!order) {
				console.error(
					`No order found for payment reference: ${paymentReference}`
				);
				res.status(404).json({ error: "Order not found" });
				return;
			}

			if (order.status === "paid") {
				res.status(200).json({ received: true });
				return;
			}

			//   update order status
			if (paymentStatus === "success") {
				order.status = "paid";
				order.paymentReference = paymentReference;
				order.totalAmount = totalAmount;
				order.save();
			}
		}
		res.status(200).send({ received: true });
	} catch (error) {
		console.error("Webhook processing error:", error);
		// Still return 200 to Paystack to acknowledge receipt
		res.status(200).json({ received: true });
		return;
	}
};

const getMyOrders = async (req: Request, res: Response) => {
	try {
		const orders = await Order.find({ user: req.userId })
			.populate("restaurant")
			.populate("user");

		res.status(200).json(orders);
	} catch (error) {
		console.error("Error getMyOrders", error);
		res.status(500).json({ message: "Something went wrong" });
	}
};

const createLineItems = (
	checkoutSessionRequest: CheckoutSessionRequest,
	menuItems: MenuItemType[]
) => {
	const lineItems = checkoutSessionRequest.cartItems?.map((cartItem) => {
		const menuItem = menuItems?.find(
			(item) => item._id.toString() === cartItem.menuItemId.toString()
		);

		if (!menuItem) {
			throw new Error(`Menu item not fund: ${cartItem.menuItemId}`);
		}

		const { price, name } = menuItem;
		const quantity = parseInt(cartItem.quantity, 10);

		const line_item = {
			price_data: {
				product_name: name,
				unit_amount: price,
			},
			quantity,
			total: quantity * price,
		};

		return line_item;
	});

	return lineItems;
};

export default {
	createCheckoutSession,
	paystackWebHookHandler,
	getMyOrders,
};
