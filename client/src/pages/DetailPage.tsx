import { useParams } from "react-router-dom";
import { useGetRestaurant } from "@/api/RestaurantApi.tsx";
import { AspectRatio } from "@/components/ui/aspect-ratio.tsx";
import RestaurantInfo from "@/components/RestaurantInfo.tsx";
import MenuItems from "@/components/MenuItem.tsx";

const DetailPage = () => {
  const { restaurantId } = useParams();
  const { restaurant, isPending } = useGetRestaurant(restaurantId);

  if (isPending || !restaurant) {
    return "Loading...";
  }

  return (
    <section className={"flex flex-col gap-10"}>
      {/*Restaurant Image*/}
      <AspectRatio ratio={16 / 5}>
        <img
          src={restaurant.imageUrl}
          className={"rounded-md object-cover h-full w-full"}
          alt={"restaurant image"}
          loading={"lazy"}
        />
      </AspectRatio>

      <div className={"grid md:grid-cols-[4fr_2fr] md:px-32 "}>
        {/*  left menu items column*/}
        <div className={"flex flex-col gap-4"}>
          <RestaurantInfo restaurant={restaurant} />
          <span className={"text-2xl font-bold tracking-tight"}>Menu</span>
          {restaurant?.menuItems?.map((menuItem) => (
            <MenuItems menuItem={menuItem} />
          ))}
        </div>
      </div>
    </section>
  );
};
export default DetailPage;
