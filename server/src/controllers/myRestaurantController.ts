import { Request, Response } from "express";
import Restaurant from "../models/restaurant";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";

const getMyRestaurant = async (req: Request, res: Response) => {
	try {
		const restaurant = await Restaurant.findOne({ user: req.userId });
		if (!restaurant) {
			res.status(404).json({ message: "restaurant not found" });
			return;
		}
		res.json(restaurant);
	} catch (error) {
		console.error("Full error details:", error);
		res.status(500).json({ message: "Error getting restaurant" });
	}
};

const createMyRestaurant = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const existingRestaurant = await Restaurant.findOne({ user: req.userId });

		if (existingRestaurant) {
			res.status(409).json({ message: "User restaurant already exists" });
			return;
		}

		const imageUrl = await uploadImage(req.file as Express.Multer.File);

		const restaurant = new Restaurant(req.body);
		restaurant.imageUrl = imageUrl;
		restaurant.user = new mongoose.Types.ObjectId(req.userId);
		restaurant.lastUpdated = new Date();
		await restaurant.save();
		res.status(201).send(restaurant);
	} catch (error) {
		console.error("Full error details:", error);
		res.status(500).json({ message: "Error creating restaurant" });
	}
};

const updateMyRestaurant = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const restaurant = await Restaurant.findOne({ user: req.userId });
		if (!restaurant) {
			res.status(404).json({ message: "Restaurant not found" });
			return;
		}

		restaurant.restaurantName = req.body.restaurantName;
		restaurant.city = req.body.city;
		restaurant.country = req.body.country;
		restaurant.deliveryPrice = req.body.deliveryPrice;
		restaurant.estimatedDeliveryTime = req.body.estimatedDeliveryTime;
		restaurant.cuisines = req.body.cuisines;
		restaurant.menuItems = req.body.menuItems;
		restaurant.lastUpdated = new Date();

		if (req.file) {
			const imageUrl = await uploadImage(req.file as Express.Multer.File);
			restaurant.imageUrl = imageUrl;
		}
		await restaurant.save();
		res.status(200).send(restaurant);
	} catch (error) {
		console.error("Full error details:", error);
		res.status(500).json({ message: "Error updating restaurant" });
	}
};

const uploadImage = async (file: Express.Multer.File) => {
	if (!file) {
		throw new Error("No file provided for upload.");
	}

	const image = file;
	const base64Image = Buffer.from(image.buffer).toString("base64");
	const dataURI = `data:${image.mimetype};base64,${base64Image}`;

	const uploadResponse = await cloudinary.uploader.upload(dataURI);
	return uploadResponse.url;
};

export default {
	createMyRestaurant,
	getMyRestaurant,
	updateMyRestaurant,
};
