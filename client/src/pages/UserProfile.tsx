import { useUpdateUser } from "@/api/usersApi";
import UserProfileForm from "@/forms/user-profile-forms/UserProfileForm";

const UserProfile = () => {
	const { updateUser, isPending } = useUpdateUser();
	return (
		<UserProfileForm
			onSave={updateUser}
			isLoading={isPending}
		/>
	);
};

export default UserProfile;
