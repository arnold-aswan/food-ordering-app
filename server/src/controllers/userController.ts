import { Request, Response, NextFunction } from "express";
import User from "../models/user";

// Define specific request type for better type safety
interface CreateUserRequest extends Request {
	body: {
		auth0Id: string;
		email: string;
		name?: string;
		[key: string]: any; // for remaining flexible properties
	};
}

const createUser = async (
	req: CreateUserRequest,
	res: Response
): Promise<void> => {
	try {
		const { auth0Id } = req.body;
		const existingUser = await User.findOne({ auth0Id });

		if (existingUser) {
			res.status(200).send();
			return;
		}

		const newUser = new User(req.body);
		await newUser.save();

		res.status(201).json(newUser.toObject());
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Error creating user" });
	}
};

export default {
	createUser,
};
