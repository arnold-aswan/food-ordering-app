import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
  useUpdateMyRestaurant,
} from "@/api/MyRestaurantApi";
import ManageRestaurantForm from "@/forms/manage-restaurant-forms/ManageRestaurantForm";
import { FormProvider, useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/forms/zod-shemas/shemas";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs.tsx";
import { useGetMyRestaurantOrdersResponse } from "@/api/MyRestaurantApi.tsx";
import OrderItemCard from "@/components/OrderItemCard.tsx";

type RestaurantFormData = z.infer<typeof formSchema>;

const ManageRestaurantPage = () => {
  const { createRestaurant, isPending } = useCreateMyRestaurant();
  const { restaurant } = useGetMyRestaurant();
  const { updateRestaurant, isPending: isUpdateLoading } =
    useUpdateMyRestaurant();
  const { orders } = useGetMyRestaurantOrdersResponse();

  const isEditing = !!restaurant;

  const methods = useForm<RestaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      restaurantName: "",
      city: "",
      country: "",
      deliveryPrice: 0,
      estimatedDeliveryTime: 0,
      cuisines: [],
      menuItems: [{ name: "", price: 0 }], // ✅ Initialize menuItems with an empty item
      imageFile: undefined, // ✅ For file inputs, this can be null or undefined
    },
  });

  return (
    <FormProvider {...methods}>
      <Tabs defaultValue={"orders"}>
        <TabsList className={"grid w-full grid-cols-2"}>
          <TabsTrigger value={"orders"}>Orders</TabsTrigger>
          <TabsTrigger value={"manage-restaurant"}>
            Manage Restaurant
          </TabsTrigger>
        </TabsList>
        <TabsContent value={"manage-restaurant"}>
          <ManageRestaurantForm
            restaurant={restaurant}
            onSave={isEditing ? updateRestaurant : createRestaurant}
            isLoading={isPending || isUpdateLoading}
          />
        </TabsContent>
        <TabsContent
          value={"orders"}
          className={"space-y-5 bg-gray-50 pg-10 rounded-lg"}
        >
          <h2 className={"text-2xl font-bold"}>
            {orders?.length} active orders
          </h2>
          {orders?.map((order) => (
            <OrderItemCard order={order} key={order?._id} />
          ))}
        </TabsContent>
      </Tabs>
    </FormProvider>
  );
};

export default ManageRestaurantPage;
