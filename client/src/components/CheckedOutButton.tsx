import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import LoadingButton from "@/components/LoadingButton.tsx";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import UserProfileForm, {
  UserFormData,
} from "@/forms/user-profile-forms/UserProfileForm.tsx";
import { useGetCurrentUser } from "@/api/usersApi.tsx";

type Props = {
  onCheckout: (userFormData: UserFormData) => void;
  disabled: boolean;
  isLoading: boolean;
};

const CheckedOutButton = ({ onCheckout, disabled, isLoading }: Props) => {
  const {
    isAuthenticated,
    isLoading: isAuthLoading,
    loginWithRedirect,
  } = useAuth0();

  const { pathname } = useLocation();

  const { currentUser, isPending: isGetUserLoading } = useGetCurrentUser();

  const onLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: pathname,
      },
    });
  };

  if (!isAuthenticated) {
    return (
      <Button className={"bg-orange-500 flex-1"} onClick={onLogin}>
        Log in to Check out
      </Button>
    );
  }

  if (isAuthLoading || !currentUser || isLoading) {
    return <LoadingButton />;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={"bg-orange-500 flex-1"} disabled={disabled}>
          Go to Checkout
        </Button>
      </DialogTrigger>
      <DialogContent className={"max-w-425px] md:min-w-[700px] bg-gray-50 "}>
        <UserProfileForm
          onSave={onCheckout}
          isLoading={isGetUserLoading}
          currentUser={currentUser}
          title={"Confirm Delivery Details"}
          buttonText={"Continue to payment"}
        />
      </DialogContent>
    </Dialog>
  );
};
export default CheckedOutButton;
