import { useParams } from "react-router-dom";
import { useState } from "react";
import { Card, CardFooter } from "@/components/ui/card.tsx";
import { useGetRestaurant } from "@/api/RestaurantApi.tsx";
import { AspectRatio } from "@/components/ui/aspect-ratio.tsx";
import RestaurantInfo from "@/components/RestaurantInfo.tsx";
import MenuItems from "@/components/MenuItem.tsx";
import OrderSummary from "@/components/OrderSummary.tsx";
import CheckedOutButton from "@/components/CheckedOutButton.tsx";
import { CartItem, MenuItem } from "@/types.ts";
import { UserFormData } from "@/forms/user-profile-forms/UserProfileForm.tsx";
import { useCreateCheckoutSession } from "@/api/OrderApi.tsx";

const DetailPage = () => {
  const { restaurantId } = useParams();
  const { restaurant, isPending } = useGetRestaurant(restaurantId);
  const { isPending: isCheckoutLoading, createCheckoutSession } =
    useCreateCheckoutSession();

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });
  // const navigate = useNavigate();

  const addToCart = (menuItem: MenuItem) => {
    setCartItems((prevState) => {
      // 1. Check if item is already in cart
      const existingCartItem = prevState?.find(
        (cartItem) => cartItem?._id === menuItem?._id,
      );

      let updatedCartItems;
      // 2. If item exists in cart, add the quantity
      if (existingCartItem) {
        updatedCartItems = prevState?.map((cartItem) =>
          cartItem?._id === menuItem?._id
            ? { ...cartItem, quantity: cartItem?.quantity + 1 }
            : cartItem,
        );
        //   3. If item not in cart then add it to cart
      } else {
        updatedCartItems = [
          ...prevState,
          {
            _id: menuItem?._id,
            name: menuItem?.name,
            price: menuItem?.price,
            quantity: 1,
          },
        ];
      }

      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems),
      );

      return updatedCartItems;
    });
  };

  const removeFromCart = (cartItem: CartItem) => {
    setCartItems((prevState) => {
      const updatedCartItems = prevState?.filter(
        (item) => item?._id !== cartItem?._id,
      );

      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems),
      );

      return updatedCartItems;
    });
  };

  const onCheckout = async (userFormData: UserFormData) => {
    try {
      // Add explicit check for restaurant ID
      if (!restaurant || !restaurant._id) {
        throw new Error("Restaurant information is missing");
      }

      const checkoutData = {
        cartItems: cartItems.map((cartItem) => ({
          menuItemId: cartItem._id,
          name: cartItem.name,
          quantity: cartItem.quantity.toString(),
        })),
        deliveryDetails: {
          email: userFormData.email as string,
          name: userFormData.name,
          addressLine1: userFormData.addressLine1,
          city: userFormData.city,
          country: userFormData.country,
        },
        restaurantId: restaurant._id,
      };

      const response = await createCheckoutSession(checkoutData);

      if (response.data?.authorization_url) {
        window.location.href = response.data.authorization_url;
      } else {
        throw new Error("No authorization URL returned");
      }
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

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

      <div className={"grid gap-5 md:grid-cols-[4fr_2fr] md:px-8 "}>
        {/*  left menu items column*/}
        <div className={"flex flex-col gap-4"}>
          <RestaurantInfo restaurant={restaurant} />
          <span className={"text-2xl font-bold tracking-tight"}>Menu</span>
          {restaurant?.menuItems?.map((menuItem) => (
            <MenuItems
              menuItem={menuItem}
              addToCart={() => addToCart(menuItem)}
            />
          ))}
        </div>

        {/*  User cart column*/}
        <Card className={"w-full h-fit"}>
          <OrderSummary
            restaurant={restaurant}
            cartItems={cartItems}
            removeFromCart={removeFromCart}
          />
          <CardFooter>
            <CheckedOutButton
              disabled={cartItems?.length === 0}
              onCheckout={onCheckout}
              isLoading={isCheckoutLoading}
            />
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};
export default DetailPage;
