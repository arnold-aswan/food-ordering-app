import { useSearchRestaurants } from "@/api/RestaurantApi";
import SearchResultsCard from "@/components/SearchResultsCard";
import SearchResultsInfo from "@/components/SearchResultsInfo";
import { useParams } from "react-router-dom";
import {useState} from "react";
import SearchBar from "@/components/SearchBar.tsx";
import {SearchForm} from "@/forms/zod-shemas/shemas.tsx";
import PaginationSelector from "@/components/PaginationSelector.tsx";

export type SearchState = {
	searchQuery: string;
	page: number
}

const SearchPage = () => {
	const { city } = useParams();
	const [searchState, setSearchState] = useState<SearchState>({
		searchQuery:"",
		page: 1
	})
	const { results, isPending } = useSearchRestaurants(searchState, city);

	if (!results?.data || !city) {
		return <span>No results found</span>;
	}

	if (isPending) {
		return <span>Loading ...</span>;
	}

	const setSearchQuery = (searchFormData: SearchForm)=> {
		setSearchState((prevState) => ({
			...prevState,
			searchQuery: searchFormData.searchQuery,
			page: 1
		}))
	}

	const resetSearch = () => {
		setSearchState((prevState) => ({
			...prevState,
			searchQuery: "",
			page: 1
		}))
	}

	const setPage = (page: number) => {
		setSearchState((prevState)=> ({
			...prevState,
			page,
		}))
	}

	return (
		<section className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5 ">
			<div id="cuisines-list">cuisines here</div>

			{/* Right column */}
			<div
				id="main-content"
				className="flex flex-col gap-5"
			>
				<SearchBar
					onSubmit={setSearchQuery}
					placeHolder={"search by cuisine or restaurant name"}
					onReset={resetSearch}
					searchQuery={searchState.searchQuery}
				/>
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

				<PaginationSelector
					page={results?.pagination?.page}
					pages={results?.pagination?.pages}
					onPageChange={setPage} />
			</div>
		</section>
	);
};

export default SearchPage;
