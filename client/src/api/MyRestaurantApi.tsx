import { useAuth0 } from "@auth0/auth0-react";
import { headers } from "@/constants/data";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Restaurant } from "@/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useCreateMyRestaurant = () => {
	const { getAccessTokenSilently } = useAuth0();

	const createMyRestaurantRequest = async (
		restaurantFormData: FormData
	): Promise<Restaurant> => {
		const accessToken = await getAccessTokenSilently();

		const response = await axios.post(
			`${API_BASE_URL}/api/my/restaurant`,
			restaurantFormData,
			{
				headers: {
					...headers,
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);
		if (response.status !== 201) {
			throw new Error("Failed to create restaurant");
		}

		return response.data;
	};

	const {
		mutateAsync: createRestaurant,
		isPending,
		isSuccess,
		isError,
	} = useMutation({ mutationFn: createMyRestaurantRequest });

	if (isSuccess) {
		toast.success("Restaurant created");
	}

	if (isError) {
		toast.error("Unable to create restaurant");
	}

	return { createRestaurant, isPending };
};

export const useGetMyRestaurant = () => {
	const { getAccessTokenSilently } = useAuth0();

	const getMyRestaurantRequest = async (): Promise<Restaurant> => {
		const accessToken = await getAccessTokenSilently();

		const response = await axios.get(`${API_BASE_URL}/api/my/restaurant`, {
			headers: {
				...headers,
				Authorization: `Bearer ${accessToken}`,
			},
		});

		if (response.status !== 200) {
			throw new Error("Failed to get restaurant");
		}

		return response.data;
	};

	const { data: restaurant, isPending } = useQuery<Restaurant>({
		queryKey: ["getMyRestaurants"],
		queryFn: getMyRestaurantRequest,
	});

	return { restaurant, isPending };
};

export const useUpdateMyRestaurant = () => {
	const { getAccessTokenSilently } = useAuth0();

	const updateRestaurantRequest = async (
		restaurantFormData: FormData
	): Promise<Restaurant> => {
		const accessToken = await getAccessTokenSilently();

		const response = await axios.put(
			`${API_BASE_URL}/api/my/restaurant`,
			restaurantFormData,
			{
				headers: {
					...headers,
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);

		if (response.status !== 200) {
			throw new Error("Could not update restaurant");
		}
		return response.data;
	};

	const {
		mutateAsync: updateRestaurant,
		isError,
		isPending,
		isSuccess,
	} = useMutation({
		mutationFn: updateRestaurantRequest,
	});

	if (isSuccess) {
		toast.success("Restaurant updated");
	}

	if (isError) {
		toast.error("Unable to update restaurant");
	}

	return { updateRestaurant, isPending };
};
