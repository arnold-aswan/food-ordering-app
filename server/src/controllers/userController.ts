import { Request, Response, NextFunction } from "express";
import User from "../models/user";

// Define specific request type for better type safety
interface CreateUserRequest extends Request {
	body: {
		auth0Id: string;
		email: string;
		name?: string;
	};
}

interface UpdateUserRequest extends Request {
	userId: string;
	body: {
		name?: string;
		addressLine1?: string;
		city?: string;
		country?: string;
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

const updateUser = async (req: UpdateUserRequest, res: Response) => {
	try {
		const { name, addressLine1, country, city } = req.body;
		const user = await User.findById(req.userId);

		if (!user) {
			res.status(404).json({ message: "User not found" });
			return;
		}

		user.name = name;
		user.addressLine1 = addressLine1;
		user.country = country;
		user.city = city;

		await user.save();
		res.status(200).json(user.toObject());
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Error updating user" });
	}
};

export default {
	createUser,
	updateUser,
};
