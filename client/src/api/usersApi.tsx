const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { User } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

type CreateUserRequest = {
	auth0Id: string;
	email: string;
};

const headers = {
	"Content-Type": "application/json",
};

export const useCreateUser = () => {
	const { getAccessTokenSilently } = useAuth0();

	const createMyUserRequest = async (user: CreateUserRequest) => {
		const accessToken = await getAccessTokenSilently();
		const response = await axios.post(`${API_BASE_URL}/api/user`, user, {
			headers: {
				...headers,
				Authorization: `Bearer ${accessToken}`,
			},
		});
		if (response.status !== 201) {
			throw new Error("Failed to create user");
		}
	};

	const {
		mutateAsync: createUser,
		isPending,
		isError,
		isSuccess,
	} = useMutation({ mutationFn: createMyUserRequest });

	return {
		createUser,
		isPending,
		isError,
		isSuccess,
	};
};

type UpdateUserRequest = {
	name: string;
	addressLine1: string;
	city: string;
	country: string;
};

export const useUpdateUser = () => {
	const { getAccessTokenSilently } = useAuth0();

	const updateUserRequest = async (formData: UpdateUserRequest) => {
		const accessToken = await getAccessTokenSilently();
		const response = await axios.put(`${API_BASE_URL}/api/user`, formData, {
			headers: {
				...headers,
				Authorization: `Bearer ${accessToken}`,
			},
		});

		if (response.status !== 200) {
			throw new Error("Failed to update user profile");
		}
	};

	const {
		mutateAsync: updateUser,
		isPending,
		isError,
		error,
		isSuccess,
		reset,
	} = useMutation({ mutationFn: updateUserRequest });

	if (isSuccess) {
		toast.success("user profile updated");
	}

	if (isError || error) {
		toast.error(isError.toString());
		console.log(error, isError);
		reset();
	}

	return {
		updateUser,
		isPending,
	};
};

export const useGetCurrentUser = () => {
	const { getAccessTokenSilently } = useAuth0();

	const getMyUserRequest = async (): Promise<User> => {
		const accessToken = await getAccessTokenSilently();

		const response = await axios.get(`${API_BASE_URL}/api/user`, {
			headers: { ...headers, Authorization: `Bearer ${accessToken}` },
		});

		if (response.status !== 200) {
			throw new Error("Failed to get user");
		}

		return response.data;
	};

	const {
		data: currentUser,
		isPending,
		isError,
		error,
	} = useQuery({ queryKey: ["myCurrentUser"], queryFn: getMyUserRequest });

	if (isError || error) {
		toast.error(isError.toString());
		console.log(error, isError);
	}

	return { currentUser, isPending };
};
