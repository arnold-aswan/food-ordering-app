import { useCreateMyRestaurant } from "@/api/MyRestaurantApi";
import ManageRestaurantForm from "@/forms/manage-restaurant-forms/ManageRestaurantForm";
import { FormProvider, useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/forms/zod-shemas/shemas";

type RestaurantFormData = z.infer<typeof formSchema>;

const ManageRestaurantPage = () => {
	const methods = useForm<RestaurantFormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			restaurantName: "",
			city: "",
			country: "",
			deliveryPrice: 0,
			estimatedDeliveryTime: 0,
			cuisines: [],
			menuItems: [{ name: "", price: 0 }], // ✅ Initialize menuItems with an empty item
			imageFile: undefined, // ✅ For file inputs, this can be null or undefined
		},
	});
	const { createRestaurant, isPending } = useCreateMyRestaurant();

	return (
		<FormProvider {...methods}>
			<ManageRestaurantForm
				onSave={createRestaurant}
				isLoading={isPending}
			/>
		</FormProvider>
	);
};

export default ManageRestaurantPage;
