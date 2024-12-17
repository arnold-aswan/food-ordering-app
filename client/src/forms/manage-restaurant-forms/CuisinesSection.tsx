import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { cuisines } from "@/config/restaurant-options-config";
import { useFormContext } from "react-hook-form";
import CuisineCheckbox from "../cuisine-checkbox/CuisineCheckbox";

const CuisinesSection = () => {
	const { control } = useFormContext();

	return (
		<div className="space-y-2">
			<div>
				<h2 className="text-2xl font-black">Cuisines</h2>
				<FormDescription>
					Select the cuisines your restaurant serves.
				</FormDescription>
			</div>
			{/* Cuisines */}
			<FormField
				control={control}
				name="cuisines"
				render={({ field }) => (
					<FormItem>
						<FormControl>
							<div className="grid grid-cols-1 md:grid-cols-5 gap-1 ">
								{cuisines?.map((cuisine) => (
									<CuisineCheckbox
										key={cuisine}
										cuisine={cuisine}
										field={field}
									/>
								))}
							</div>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</div>
	);
};

export default CuisinesSection;
