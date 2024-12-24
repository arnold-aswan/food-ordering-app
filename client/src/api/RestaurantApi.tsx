import { RestaurantSearchResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useSearchRestaurants = (city?: string) => {
	const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
		const response = await axios.get(
			`${API_BASE_URL}/api/restaurant/search/${city}`
		);

		if (response.status !== 200) {
			throw new Error("Failed to get restaurant");
		}
		return response.data;
	};

	const { data: results, isPending } = useQuery({
		queryKey: ["searchRestaurants"],
		queryFn: createSearchRequest,
		enabled: !!city,
	});

	return { results, isPending };
};
