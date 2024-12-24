import landing from "@/assets/landing.png";
import appDownload from "@/assets/appDownload.png";
import SearchBar from "@/components/SearchBar";
import { SearchForm } from "@/forms/zod-shemas/shemas";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
	const navigate = useNavigate();

	const handleSearchSubmit = (searchFormValues: SearchForm) => {
		navigate(`/search/${searchFormValues.searchQuery}`);
	};
	return (
		<section className="flex flex-col gap-12">
			<div className="md:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16 ">
				<h1 className="text-5xl font-bold tracking-tight text-orange-600 ">
					Tuck into a takeaway today
				</h1>
				<span className="text-xl ">food is just a click away</span>
				<SearchBar
					placeHolder="Search by City or Town"
					onSubmit={handleSearchSubmit}
				/>
			</div>

			<div className="grid md:grid-cols-2 gap-5">
				<img
					src={landing}
					alt="landing image"
				/>
				<div className="flex flex-col items-center justify-center gap-4 text-center">
					<span className="font-bold text-3xl tracking-tighter ">
						Order takeaway even faster
					</span>
					<span>
						Download the MearnEats app for faster ordering and personalized
						recommendations{" "}
					</span>
					<img src={appDownload} />
				</div>
			</div>
		</section>
	);
};

export default HomePage;
