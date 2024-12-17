import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

type Props = {
	cuisine: string;
	field: ControllerRenderProps<FieldValues, "cuisines">;
};

const CuisineCheckbox = ({ cuisine, field }: Props) => {
	const handleChange = (checked: boolean) => {
		const currentCuisines = field.value ?? [];
		if (checked && !currentCuisines.includes(cuisine)) {
			field.onChange([...currentCuisines, cuisine]);
		} else {
			field.onChange(field.value.filter((value: string) => value !== cuisine));
		}
	};
	return (
		<FormItem className="flex flex-row items-center space-x-1 space-y-0 mt-2">
			<FormControl>
				<Checkbox
					className="bg-white mb-1"
					id={cuisine}
					checked={field.value?.includes(cuisine) ?? false}
					onCheckedChange={(checked: boolean) => handleChange(checked)}
				/>
			</FormControl>
			<FormLabel
				htmlFor={cuisine}
				className="text-sm font-normal"
			>
				{cuisine}
			</FormLabel>
		</FormItem>
	);
};

export default CuisineCheckbox;
