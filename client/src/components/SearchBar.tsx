import { searchBarFormSchema, SearchForm } from "@/forms/zod-shemas/shemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem } from "./ui/form";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type Props = {
	onSubmit: (formData: SearchForm) => void;
	placeHolder: string;
	onReset?: () => void;
};

const SearchBar = ({ onSubmit, onReset, placeHolder }: Props) => {
	const form = useForm<SearchForm>({
		resolver: zodResolver(searchBarFormSchema),
		defaultValues: {
			searchQuery: "",
		},
	});

	const handleReset = () => {
		form.reset({
			searchQuery: "",
		});

		if (onReset) {
			onReset();
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className={`flex items-center flex-1 gap-3 justify-between flex-row border-2 rounded-full p-3 mx-5 ${
					form.formState.errors.searchQuery && "border-red-500"
				} `}
			>
				<Search
					strokeWidth={2.5}
					size={30}
					className="ml-1 text-orange-500 hidden md:block"
				/>

				<FormField
					control={form.control}
					name="searchQuery"
					render={({ field }) => (
						<FormItem className="flex-1">
							<Input
								{...field}
								className="border-none shadow-none text-xl focus-visible:ring-0 "
								placeholder={placeHolder}
							/>
						</FormItem>
					)}
				/>

				{form.formState.isDirty && (
					<Button
						onClick={handleReset}
						type="button"
						variant="outline"
						className="rounded-full"
					>
						Clear
					</Button>
				)}

				<Button
					type="submit"
					className="rounded-full bg-orange-500 "
				>
					Search
				</Button>
			</form>
		</Form>
	);
};

export default SearchBar;
