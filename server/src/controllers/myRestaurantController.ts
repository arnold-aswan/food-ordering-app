import { Request, Response, NextFunction } from "express";
import Restaurant from "../models/restaurant";
import cloudinary from "cloudinary";
import mongoose from "mongoose";

const createMyRestaurant = async (req: Request, res: Response) => {
	try {
		const image = req.file as Express.Multer.File;

		const base64Image = Buffer.from(image.buffer).toString("base64");
		const dataURI = `data:${image.mimetype},base64,${base64Image}`;

		// Upload an image
		const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);

		const restaurant = new Restaurant(req.body);
		restaurant.imageUrl = uploadResponse.url;
		restaurant.user = new mongoose.Types.ObjectId(req.userId);
		restaurant.lastUpdated = new Date();
		await restaurant.save();
		res.status(201).send(restaurant);
	} catch (error) {
		console.error("Full error details:", error);

		// Log specific error properties
		if (error instanceof Error) {
			console.error("Error name:", error.name);
			console.error("Error message:", error.message);
			console.error("Error stack:", error.stack);
		}
		res.status(500).json({ message: "Error creating restaurant" });
	}
};

export default {
	createMyRestaurant,
};
