import { Order } from "@/types.ts";
import { Progress } from "@/components/ui/progress.tsx";
import { ORDER_STATUS } from "@/config/order-status-config.ts";

type Props = {
  order: Order;
};

const OrderStatusHeader = ({ order }: Props) => {
  const getExpectedDelivery = () => {
    const created = new Date(order?.createdAt);
    created.setMinutes(
      created.getMinutes() + order.restaurant.estimatedDeliveryTime,
    );

    const hours = created.getHours();
    const minutes = created.getMinutes();

    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${paddedMinutes}`;
  };

  const getOrderStatusInfo = () => {
    return (
      ORDER_STATUS.find((o) => o.value === order.status) || ORDER_STATUS[0]
    );
  };

  return (
    <>
      <h1
        className={
          "text-base font-bold tracking-tighter flex flex-col" +
          " gap-5 md:flex-row md:justify-between"
        }
      >
        <span>Order Status: {getOrderStatusInfo().label}</span>
        <span>Expected By: {getExpectedDelivery()}</span>
      </h1>
      <Progress
        className={"animate-pulse"}
        value={getOrderStatusInfo().progressValue}
      />
    </>
  );
};
export default OrderStatusHeader;
