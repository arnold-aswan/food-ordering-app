import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import UserMenu from "./UserMenu";
import { Link } from "react-router-dom";

const MainNav = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <div className="flex space-x-2 items-center ">
      {isAuthenticated ? (
        <>
          <Link
            to={"/order-status"}
            className={"font-bold hover:text-orange-500"}
          >
            Order Status
          </Link>
          <UserMenu />
        </>
      ) : (
        <Button
          variant="ghost"
          className="font-bold hover:text-orange-500 hover:bg-white "
          onClick={async () => await loginWithRedirect()}
        >
          Log In
        </Button>
      )}
    </div>
  );
};

export default MainNav;
