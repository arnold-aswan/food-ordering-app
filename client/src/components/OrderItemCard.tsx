import { Order, OrderStatus } from "@/types.ts";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Label } from "@/components/ui/label.tsx";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select.tsx";
import { ORDER_STATUS } from "@/config/order-status-config.ts";
import { useUpdateMyRestaurantOrderStatus } from "@/api/MyRestaurantApi.tsx";
import { useEffect, useState } from "react";

type Props = {
	order: Order;
};

const OrderItemCard = ({ order }: Props) => {
	const { updateOrderStatus, isPending } = useUpdateMyRestaurantOrderStatus();
	const [status, setStatus] = useState<OrderStatus>(order.status);

	useEffect(() => {
		setStatus(order.status);
	}, [order.status]);

	const handleStatusChange = async (newStatus: OrderStatus) => {
		await updateOrderStatus({
			orderId: order._id as string,
			status: newStatus,
		});

		setStatus(newStatus);
	};

	const getTime = () => {
		const orderDateTime = new Date(order.createdAt);

		const hours = orderDateTime.getHours();
		const minutes = orderDateTime.getMinutes();

		const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

		return `${hours}:${paddedMinutes}`;
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle className={"grid md:grid-cols-4 gap-4 justify-between mb-3"}>
					<div>
						Customer Name:
						<span className={"ml-2 font-normal"}>
							{order?.deliveryDetails.name}
						</span>
					</div>
					{/*Address*/}
					<div>
						Delivery Address:
						<span className={"ml-2 font-normal"}>
							{order?.deliveryDetails?.addressLine1},{" "}
							{order?.deliveryDetails?.city}
						</span>
					</div>
					{/*time*/}
					<div>
						Time:
						<span className={"ml-2 font-normal"}>{getTime()}</span>
					</div>
					{/*Cost*/}
					<div>
						Total Cost:
						<span className={"ml-2 font-normal"}>
							$ {order?.totalAmount?.toLocaleString()}
						</span>
					</div>
				</CardTitle>
				<Separator />
			</CardHeader>
			<CardContent className={"flex flex-col gap-6"}>
				<div className={"flex flex-col gap-2"}>
					{order?.cartItems?.map((cartItem) => (
						<span className={""}>
							<Badge
								variant={"outline"}
								className={"mr-2"}
							>
								{cartItem?.quantity}
							</Badge>
							{cartItem?.name}
						</span>
					))}
				</div>
				<div className={"flex flex-col space-y-1.5"}>
					<Label htmlFor={"status"}>What is the status of this order?</Label>
					<Select
						value={status}
						disabled={isPending}
						onValueChange={(value) => handleStatusChange(value as OrderStatus)}
					>
						<SelectTrigger id={"status"}>
							<SelectValue placeholder={"Status"} />
						</SelectTrigger>
						<SelectContent position={"popper"}>
							<SelectGroup>
								{ORDER_STATUS.map((item) => (
									<SelectItem
										value={item.value}
										key={item.value}
									>
										{item.label}
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
			</CardContent>
		</Card>
	);
};
export default OrderItemCard;
