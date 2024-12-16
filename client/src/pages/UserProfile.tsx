import { useGetCurrentUser, useUpdateUser } from "@/api/usersApi";
import UserProfileForm from "@/forms/user-profile-forms/UserProfileForm";

const UserProfile = () => {
	const { updateUser, isPending: isUpdateLoading } = useUpdateUser();
	const { currentUser, isPending: isGetLoading } = useGetCurrentUser();

	if (isGetLoading) return <span>Loading ...</span>;

	if (!currentUser) return <span>Unable to load user profile</span>;

	return (
		<UserProfileForm
			currentUser={currentUser}
			onSave={updateUser}
			isLoading={isUpdateLoading}
		/>
	);
};

export default UserProfile;
