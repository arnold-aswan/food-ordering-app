const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

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
