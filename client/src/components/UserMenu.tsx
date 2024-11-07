import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "./ui/dropdown-menu";
import { useAuth0 } from "@auth0/auth0-react";
import { CircleUserRound } from "lucide-react";
import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

const UserMenu = () => {
	const { user, logout } = useAuth0();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				asChild
				className="flex items-center p-3 font-bold hover:text-orange-500 "
			>
				<div className="flex items-center gap-2 ">
					<CircleUserRound className="text-orange-500 " />
					{user?.name}
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem>
					<Link
						to="/user-profile"
						className="font-bold hover:text-orange-500"
					>
						Profile
					</Link>
				</DropdownMenuItem>
				<Separator />
				<DropdownMenuItem>
					<Button
						onClick={() => logout()}
						className="flex flex-1 font-bold bg-orange-500"
					>
						Log Out
					</Button>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default UserMenu;
