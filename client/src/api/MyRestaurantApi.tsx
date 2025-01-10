import { useAuth0 } from "@auth0/auth0-react";
import { headers } from "@/constants/data";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Order, Restaurant } from "@/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useCreateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyRestaurantRequest = async (
    restaurantFormData: FormData,
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    const response = await axios.post(
      `${API_BASE_URL}/api/my/restaurant`,
      restaurantFormData,
      {
        headers: {
          ...headers,
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    if (response.status !== 201) {
      throw new Error("Failed to create restaurant");
    }

    return response.data;
  };

  const {
    mutateAsync: createRestaurant,
    isPending,
    isSuccess,
    isError,
  } = useMutation({ mutationFn: createMyRestaurantRequest });

  if (isSuccess) {
    toast.success("Restaurant created");
  }

  if (isError) {
    toast.error("Unable to create restaurant");
  }

  return { createRestaurant, isPending };
};

export const useGetMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyRestaurantRequest = async (): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    const response = await axios.get(`${API_BASE_URL}/api/my/restaurant`, {
      headers: {
        ...headers,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status !== 200) {
      throw new Error("Failed to get restaurant");
    }

    return response.data;
  };

  const { data: restaurant, isPending } = useQuery<Restaurant>({
    queryKey: ["getMyRestaurants"],
    queryFn: getMyRestaurantRequest,
  });

  return { restaurant, isPending };
};

export const useUpdateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateRestaurantRequest = async (
    restaurantFormData: FormData,
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    const response = await axios.put(
      `${API_BASE_URL}/api/my/restaurant`,
      restaurantFormData,
      {
        headers: {
          ...headers,
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (response.status !== 200) {
      throw new Error("Could not update restaurant");
    }
    return response.data;
  };

  const {
    mutateAsync: updateRestaurant,
    isError,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: updateRestaurantRequest,
  });

  if (isSuccess) {
    toast.success("Restaurant updated");
  }

  if (isError) {
    toast.error("Unable to update restaurant");
  }

  return { updateRestaurant, isPending };
};

export const useGetMyRestaurantOrdersResponse = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyRestaurantOrders = async (): Promise<Order[]> => {
    const accessToken = await getAccessTokenSilently();
    const response = await axios.get(
      `${API_BASE_URL}/api/my/restaurant/orders`,
      {
        headers: {
          ...headers,
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (response.status !== 200) {
      throw new Error("Failed to get orders");
    }

    return response.data;
  };

  const { data: orders, isPending } = useQuery({
    queryKey: ["getMyRestaurantOrders"],
    queryFn: getMyRestaurantOrders,
  });

  return { orders, isPending };
};

type UpdateOrderStatusRequest = {
  orderId: string;
  status: string;
};

export const useUpdateMyRestaurantOrderStatus = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateMyRestaurantOrderStatus = async (
    updateStatusOrderRequest: UpdateOrderStatusRequest,
  ): Promise<void> => {
    const accessToken = await getAccessTokenSilently();

    const response = await axios.patch(
      `${API_BASE_URL}/api/my/restaurant/order/${updateStatusOrderRequest.orderId}/status`,
      { status: updateStatusOrderRequest.status },
      {
        headers: {
          ...headers,
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    if (response.status !== 200) {
      throw new Error("Failed to update order status");
    }

    return response.data;
  };

  const {
    mutateAsync: updateOrderStatus,
    isPending,
    error,
    isError,
    isSuccess,
    reset,
  } = useMutation({ mutationFn: updateMyRestaurantOrderStatus });

  if (isSuccess) {
    toast.success("order updated");
  }

  if (isError) {
    toast.error(error.toString());
    reset();
  }

  return { updateOrderStatus, isPending };
};
