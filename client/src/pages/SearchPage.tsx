import { useParams } from "react-router-dom";

const SearchPage = () => {
	const { city } = useParams();
	return <div>user searched for {city}</div>;
};

export default SearchPage;
