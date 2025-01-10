import { useGetMyOrdersRequest } from "@/api/OrderApi.tsx";
import OrderStatusHeader from "@/components/OrderStatusHeader.tsx";
import OrderStatusDetails from "@/components/OrderStatusDetails.tsx";
import { AspectRatio } from "@/components/ui/aspect-ratio.tsx";

const OrderStatusPage = () => {
  const { orders, isPending } = useGetMyOrdersRequest();
  console.log(orders);

  if (isPending) return "loading...";
  if (!orders || orders.length === 0) return "No orders";

  return (
    <div className={"space-y-10"}>
      {orders?.map((order) => (
        <div className={"space-y-10 bg-gray-50 p-10 rounded-lg"}>
          <OrderStatusHeader order={order} />
          <div className={"grid gap-10 md:grid-cols-2"}>
            <OrderStatusDetails order={order} />
            <AspectRatio ratio={16 / 5}>
              <img
                src={order?.restaurant?.imageUrl}
                alt={"restaurant image"}
                loading={"lazy"}
                className={"rounded-md object-cover h-full w-full"}
              />
            </AspectRatio>
          </div>
        </div>
      ))}
    </div>
  );
};
export default OrderStatusPage;
