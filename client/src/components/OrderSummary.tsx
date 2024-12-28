import { CartItem, Restaurant } from "@/types.ts";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { Trash } from "lucide-react";

type Props = {
  restaurant: Restaurant;
  cartItems: CartItem[];
  removeFromCart: (cartItem: CartItem) => void;
};

const OrderSummary = ({ restaurant, cartItems, removeFromCart }: Props) => {
  const getTotalCost = () => {
    const totalPrice = cartItems?.reduce(
      (total, cartItem) => total + cartItem?.price * cartItem?.quantity,
      0,
    );

    return totalPrice + restaurant?.deliveryPrice;
  };

  return (
    <>
      <CardHeader>
        <CardTitle
          className={"text-2xl font-bold tracking-tight justify-between"}
        >
          <span>Your Order</span>
          <span> $ {getTotalCost().toLocaleString()}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className={"flex flex-col gap-5"}>
        {cartItems?.map((item) => (
          <div className={"flex justify-between"} key={item?._id}>
            <span>
              <Badge variant={"outline"} className={"mr-2"}>
                {item?.quantity}
              </Badge>
            </span>
            <span className={"flex items-center gap-1 "}>
              <Trash
                className={"cursor-pointer text-red-500"}
                size={20}
                onClick={() => removeFromCart(item)}
              />
              $ {(item?.price * item?.quantity).toLocaleString()}
            </span>
          </div>
        ))}
        <Separator />
        <div className={"flex justify-between"}>
          <span>Delivery</span>
          <span>$ {restaurant?.deliveryPrice?.toLocaleString()}</span>
        </div>
        <Separator />
      </CardContent>
    </>
  );
};
export default OrderSummary;
