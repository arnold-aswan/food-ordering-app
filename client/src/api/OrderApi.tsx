import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { headers } from "@/constants/data.ts";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Order } from "@/types.ts";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type CheckoutSessionRequest = {
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: string;
  }[];
  deliveryDetails: {
    email: string;
    name: string;
    addressLine1: string;
    city: string;
    country?: string;
  };
  restaurantId: string;
};

export const useCreateCheckoutSession = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createCheckoutSessionRequest = async (
    checkoutSessionRequest: CheckoutSessionRequest,
  ) => {
    const accessToken = await getAccessTokenSilently();

    const response = await axios.post(
      `${API_BASE_URL}/api/order/checkout/create-checkout-session`,
      checkoutSessionRequest,
      {
        headers: {
          ...headers,
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (response.status !== 200) {
      console.log(response);
      throw new Error("Failed to create checkout session");
    }
    console.log(response.data);
    return response.data;
  };

  const {
    mutateAsync: createCheckoutSession,
    isPending,
    isError,
    error,
    reset,
  } = useMutation({ mutationFn: createCheckoutSessionRequest });

  if (isError) {
    toast.error(`error on checkout: ${error} : ${error.toString()}`);
    reset();
    console.log(error);
  }

  return {
    createCheckoutSession,
    isPending,
  };
};

export const useGetMyOrdersRequest = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyOrdersRequest = async (): Promise<Order[]> => {
    const accessToken = await getAccessTokenSilently();

    const response = await axios.get(`${API_BASE_URL}/api/order`, {
      headers: {
        ...headers,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status !== 200) {
      throw new Error("Failed to get orders");
    }

    return response.data;
  };

  const { data: orders, isPending } = useQuery({
    queryKey: ["getMyOrders"],
    queryFn: getMyOrdersRequest,
    refetchOnWindowFocus: true,
  });

  return { orders, isPending };
};
