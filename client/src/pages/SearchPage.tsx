import { useSearchRestaurants } from "@/api/RestaurantApi";
import SearchResultsCard from "@/components/SearchResultsCard";
import SearchResultsInfo from "@/components/SearchResultsInfo";
import { useParams } from "react-router-dom";

const SearchPage = () => {
	const { city } = useParams();
	const { results, isPending } = useSearchRestaurants(city);

	if (!results?.data || !city) {
		return <span>No results found</span>;
	}

	if (isPending) {
		return <span>Loading ...</span>;
	}

	return (
		<section className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5 ">
			<div id="cuisines-list">cuisines here</div>

			{/* Right column */}
			<div
				id="main-content"
				className="flex flex-col gap-5"
			>
				<SearchResultsInfo
					total={results.pagination.total}
					city={city}
				/>

				{/* Restaurants Results */}
				{results?.data?.map((restaurant) => (
					<SearchResultsCard
						key={restaurant?._id}
						restaurant={restaurant}
					/>
				))}
			</div>
		</section>
	);
};

export default SearchPage;
