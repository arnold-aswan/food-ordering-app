import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { CircleUserRound, Menu } from "lucide-react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import MobileNavLinks from "./MobileNavLinks";

const MobileNav = () => {
	const { isAuthenticated, loginWithRedirect, user } = useAuth0();
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Menu className="text-orange-500" />
			</SheetTrigger>
			<SheetContent className="space-y-3">
				<SheetTitle>
					{isAuthenticated ? (
						<p className="flex items-center font-bold gap-2">
							<CircleUserRound className="text-orange-500" />
							{user?.name}
						</p>
					) : (
						<p>Welcome to MearnEats.com!</p>
					)}
				</SheetTitle>
				<Separator />
				<SheetDescription className="flex flex-col gap-4">
					{isAuthenticated ? (
						<MobileNavLinks />
					) : (
						<Button
							onClick={async () => await loginWithRedirect()}
							className="flex-1 font-bold bg-orange-500 "
						>
							Log In
						</Button>
					)}
				</SheetDescription>
			</SheetContent>
		</Sheet>
	);
};

export default MobileNav;
