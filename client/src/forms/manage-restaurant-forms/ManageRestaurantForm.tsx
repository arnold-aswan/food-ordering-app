import { useFormContext } from "react-hook-form";
import { z } from "zod";
import DetailsSection from "./DetailsSection";
import { Separator } from "@/components/ui/separator";
import CuisinesSection from "./CuisinesSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { formSchema } from "../zod-shemas/shemas";

type RestaurantFormData = z.infer<typeof formSchema>;

type props = {
	onSave: (restaurantFormData: FormData) => void;
	isLoading: boolean;
};

const ManageRestaurantForm = ({ onSave, isLoading }: props) => {
	// Access the form context instead
	const { handleSubmit } = useFormContext<RestaurantFormData>();

	const onSubmit = (formDataJson: RestaurantFormData) => {
		const formData = new FormData();

		formData.append("restaurantName", formDataJson.restaurantName);
		formData.append("city", formDataJson.city);
		formData.append("country", formDataJson.country);

		formData.append("deliveryPrice", formDataJson.deliveryPrice.toString());
		formData.append(
			"estimatedDeliveryTime",
			formDataJson.estimatedDeliveryTime.toString()
		);

		formDataJson.cuisines.forEach((cuisine, index) => {
			formData.append(`cuisines[${index}]`, cuisine);
		});
		formDataJson.menuItems.forEach((menuItem, index) => {
			formData.append(`menuItems[${index}][name]`, menuItem.name);
			formData.append(`menuItems[${index}][price]`, menuItem.price.toString());
		});

		if (!formDataJson.imageFile) {
			alert("Image file is required");
			return;
		}

		formData.append("imageFile", formDataJson.imageFile);

		onSave(formData);
	};
	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="space-y-8 bg-gray-50 p-10 rounded-lg "
		>
			<DetailsSection />
			<Separator />
			<CuisinesSection />
			<Separator />
			<MenuSection />
			<Separator />
			<ImageSection />

			{isLoading ? <LoadingButton /> : <Button type="submit">Submit</Button>}
		</form>
	);
};

export default ManageRestaurantForm;
