import {useSearchRestaurants} from '@/api/RestaurantApi';
import SearchResultsCard from '@/components/SearchResultsCard';
import SearchResultsInfo from '@/components/SearchResultsInfo';
import {useParams} from 'react-router-dom';
import {useState} from 'react';
import SearchBar from '@/components/SearchBar.tsx';
import {SearchForm} from '@/forms/zod-shemas/shemas.tsx';
import PaginationSelector from '@/components/PaginationSelector.tsx';
import CuisineFilter from '@/components/CuisineFilter.tsx';
import SortOptionDropDown from '@/components/SortOptionDropDown.tsx';

export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[];
  sortOption: string;
};

const SearchPage = () => {
  const {city} = useParams();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: '',
    page: 1,
    selectedCuisines: [],
    sortOption: 'bestMatch',
  });
  const {results, isPending} = useSearchRestaurants(searchState, city);

  if (!results?.data || !city) {
    return <span>No results found</span>;
  }

  if (isPending) {
    return <span>Loading ...</span>;
  }

  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
      page: 1,
    }));
  };

  const resetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: '',
      page: 1,
    }));
  };

  const setPage = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page,
    }));
  };

  const setSelectedCuisines = (selectedCuisines: string[]) => {
    setSearchState((prevState) => ({
      ...prevState,
      selectedCuisines,
      page: 1,
    }));
  };

  const setSortOption = (sortOption: string) => {
    setSearchState((prevState) => ({
      ...prevState,
      sortOption,
      page: 1,
    }));
    console.log(sortOption);

  };

  return (
      <section className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5 ">
        <div id="cuisines-list">
          <CuisineFilter
              selectedCuisines={searchState?.selectedCuisines}
              onChange={setSelectedCuisines}
              isExpanded={isExpanded}
              onExpandedClick={() => setIsExpanded((prevState) => !prevState)}
          />
        </div>

        {/* Right column */}
        <div id="main-content" className="flex flex-col gap-5">
          <SearchBar
              onSubmit={setSearchQuery}
              placeHolder={'search by cuisine or restaurant name'}
              onReset={resetSearch}
              searchQuery={searchState.searchQuery}
          />

          <div className={'flex justify-between flex-col gap-3 lg:flex-row'}>
            <SearchResultsInfo total={results.pagination.total} city={city}/>
            <SortOptionDropDown
                onChange={(value: string) => setSortOption(value)}
                sortOption={searchState?.sortOption}
            />
          </div>

          {/* Restaurants Results */}
          {results?.data?.map((restaurant) => (
              <SearchResultsCard key={restaurant?._id} restaurant={restaurant}/>
          ))}

          <PaginationSelector
              page={results?.pagination?.page}
              pages={results?.pagination?.pages}
              onPageChange={setPage}
          />
        </div>
      </section>
  );
};

export default SearchPage;
