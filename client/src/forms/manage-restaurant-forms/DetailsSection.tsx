import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

const DetailsSection = () => {
	const { control } = useFormContext();

	return (
		<div className="space-y-2">
			<div>
				<h2 className="text-2xl font-black">Details</h2>
				<FormDescription>
					Enter the details about your restaurant.
				</FormDescription>
			</div>
			{/* name */}
			<FormField
				control={control}
				name="restaurantName"
				render={({ field }) => (
					<FormItem>
						<FormLabel className="font-semibold">Name</FormLabel>
						<FormControl>
							<Input
								{...field}
								className="bg-white"
								placeholder="john doe"
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			{/* city & Country */}
			<div className="flex gap-4">
				<FormField
					control={control}
					name="city"
					render={({ field }) => (
						<FormItem className="flex-1">
							<FormLabel className="font-semibold">City</FormLabel>
							<FormControl>
								<Input
									{...field}
									className="bg-white"
									placeholder="nairobi"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={control}
					name="country"
					render={({ field }) => (
						<FormItem className="flex-1">
							<FormLabel className="font-semibold">Country</FormLabel>
							<FormControl>
								<Input
									{...field}
									className="bg-white"
									placeholder="kenya"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>

			<FormField
				control={control}
				name="deliveryPrice"
				render={({ field }) => (
					<FormItem className="md:max-w-[25%]">
						<FormLabel className="font-semibold">Delivery Price</FormLabel>
						<FormControl>
							<Input
								{...field}
								className="bg-white"
								placeholder="100"
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			{/* delivery & price */}
			<FormField
				control={control}
				name="estimatedDeliveryTime"
				render={({ field }) => (
					<FormItem className="md:max-w-[25%]">
						<FormLabel className="font-semibold">
							Estimated Delivery Time (minutes)
						</FormLabel>
						<FormControl>
							<Input
								{...field}
								className="bg-white"
								placeholder="30"
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</div>
	);
};

export default DetailsSection;
