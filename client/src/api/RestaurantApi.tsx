import { RestaurantSearchResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {SearchState} from "@/pages/SearchPage.tsx";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useSearchRestaurants = (searchState: SearchState ,city?: string) => {
	const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
		const params = new URLSearchParams();
		params.set("searchQuery", searchState.searchQuery)
		params.set("page", searchState.page.toString())

		const response = await axios.get(
			`${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`
		);

		if (response.status !== 200) {
			throw new Error("Failed to get restaurant");
		}
		return response.data;
	};

	const { data: results, isPending } = useQuery({
		queryKey: ["searchRestaurants", searchState],
		queryFn: createSearchRequest,
		enabled: !!city,
	});

	return { results, isPending };
};
