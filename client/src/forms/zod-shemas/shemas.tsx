import { z } from "zod";

export const formSchema = z
	.object({
		restaurantName: z
			.string({ required_error: "Restaurant name is required" })
			.min(1, "Restaurant name is required"),
		city: z
			.string({ required_error: "City is required" })
			.min(1, "City is required"),
		country: z
			.string({ required_error: "Country is required" })
			.min(1, "Country is required"),
		deliveryPrice: z.coerce.number({
			required_error: "Delivery price is required",
			invalid_type_error: "Must be a valid number",
		}),
		estimatedDeliveryTime: z.coerce.number({
			required_error: "Estimated delivery time is required",
			invalid_type_error: "Must be a valid number",
		}),
		cuisines: z.array(z.string().min(1, "Please select at least one cuisine")),
		menuItems: z.array(
			z.object({
				name: z.string().min(1, "Name is required"),
				price: z.coerce.number().min(1, "Price is required"),
			})
		),
		imageUrl: z.string().optional(),
		imageFile: z.instanceof(File, { message: "Image is required" }).optional(),
	})
	.refine((data) => data.imageUrl || data.imageFile, {
		message: "Either image URL or an Image File must be provided",
		path: ["imageFile"],
	});

export type RestaurantFormData = z.infer<typeof formSchema>;
