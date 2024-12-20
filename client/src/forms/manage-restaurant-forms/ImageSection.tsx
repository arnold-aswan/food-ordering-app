import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

const ImageSection = () => {
	const { control } = useFormContext();

	return (
		<div className="space-y-2">
			<div>
				<h2 className="text-2xl font-black">Image</h2>
				<FormDescription>
					Add an image that will be displayed in your restaurant listing.
				</FormDescription>
			</div>

			<div className="flex flex-col gap-8 w-[50%]">
				{/* Image */}
				<FormField
					control={control}
					name="imageFile"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									className="bg-white"
									type="file"
									accept=".jpg, .jpeg, .png"
									onChange={(event) =>
										field.onChange(
											event.target.files ? event.target.files[0] : null
										)
									}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
		</div>
	);
};

export default ImageSection;
