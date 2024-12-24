import { Restaurant } from "@/types";
import { Link } from "react-router-dom";
import { AspectRatio } from "./ui/aspect-ratio";
import { Banknote, Clock, Dot } from "lucide-react";

type Props = {
	restaurant: Restaurant;
};

const SearchResultsCard = ({ restaurant }: Props) => {
	return (
		<Link
			to={`/detail/${restaurant?._id}`}
			className="grid lg:grid-cols-[2fr_3fr] gap-5 group "
		>
			{/* Card Image */}
			<AspectRatio ratio={16 / 8}>
				<img
					src={restaurant?.imageUrl}
					className="w-full h-full object-cover"
					loading="lazy"
					alt="restaurant image"
				/>
			</AspectRatio>

			<div>
				{/* Restaurant name */}
				<h3 className="text-2xl font-bold tracking-tight mb-2 group-hover:underline ">
					{restaurant?.restaurantName}
				</h3>

				{/* Card Content */}
				<div
					id="card-content"
					className="grid md:grid-cols-2 gap-2"
				>
					{/* Cuisines list */}
					<div className="flex flex-row flex-wrap">
						{restaurant?.cuisines?.map((item, index) => (
							<span
								key={index}
								className="flex "
							>
								<span>{item}</span>
								{index < restaurant?.cuisines?.length - 1 && <Dot />}
							</span>
						))}
					</div>

					<div className="flex gap-2 flex-col">
						{/* Delivery time */}
						<div className="flex items-center gap-1 text-green-600">
							<Clock className="text-green-600" />
							{restaurant?.estimatedDeliveryTime} mins
						</div>

						{/* Delivery Price */}
						<div className="flex items-center gap-1">
							<Banknote />
							Delivery from $ {restaurant?.deliveryPrice}
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default SearchResultsCard;
