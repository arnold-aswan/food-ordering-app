import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { User } from "@/types";
import {useEffect} from "react";

const formSchema = z.object({
	email: z.string().email().optional(),
	name: z
		.string()
		.min(1, "Please enter your name")
		.min(3, "Name must be at least 3 characters"),
	addressLine1: z
		.string()
		.min(1, "Please enter your address")
		.min(3, "Address must be at least 3 characters"),
	city: z
		.string()
		.min(1, "Please enter your city")
		.min(3, "City must be at least 3 characters"),
	country: z
		.string()
		.min(1, "Please enter your country")
		.min(3, "Country must be at least 3 characters"),
});

type UserFormData = z.infer<typeof formSchema>;

type Props = {
	onSave: (userProfileData: UserFormData) => void;
	isLoading: boolean;
	currentUser: User;
};

function UserProfileForm({ onSave, isLoading, currentUser }: Props) {
	const form = useForm<UserFormData>({
		resolver: zodResolver(formSchema),
		defaultValues: currentUser
	});

	useEffect(()=> {
		form.reset(currentUser)
	},[currentUser, form])

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSave)}
				className="space-x-4 space-y-4 bg-gray-50 rounded-lg md:p-10 "
			>
				<div>
					<h2 className="text-2xl font-bold ">User Profile Form</h2>
					<FormDescription>
						View and change your profile information here
					</FormDescription>
				</div>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-semibold">Email</FormLabel>
							<FormControl>
								<Input
									{...field}
									disabled
									className="bg-white"
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-semibold">Name</FormLabel>
							<FormControl>
								<Input
									{...field}
									className="bg-white"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="flex flex-col md:flex-row gap-4 ">
					<FormField
						control={form.control}
						name="addressLine1"
						render={({ field }) => (
							<FormItem className="flex-1">
								<FormLabel className="font-semibold">Address Line 1</FormLabel>
								<FormControl>
									<Input
										{...field}
										className="bg-white"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="city"
						render={({ field }) => (
							<FormItem className="flex-1">
								<FormLabel className="font-semibold">City</FormLabel>
								<FormControl>
									<Input
										{...field}
										className="bg-white"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="country"
						render={({ field }) => (
							<FormItem className="flex-1">
								<FormLabel className="font-semibold">Country</FormLabel>
								<FormControl>
									<Input
										{...field}
										className="bg-white"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				{isLoading ? (
					<LoadingButton />
				) : (
					<Button
						type="submit"
						className="bg-orange-500 font-semibold"
					>
						Submit
					</Button>
				)}
			</form>
		</Form>
	);
}

export default UserProfileForm;