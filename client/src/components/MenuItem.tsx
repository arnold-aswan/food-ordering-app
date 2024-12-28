import { MenuItem } from "@/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";

type Props = {
  menuItem: MenuItem;
};
const MenuItems = ({ menuItem }: Props) => {
  return (
    <Card className={"cursor-pointer"}>
      <CardHeader className={"space-y-5"}>
        <CardTitle>{menuItem?.name}</CardTitle>
        <CardContent className={"font-bold p-0"}>
          $ {menuItem?.price?.toLocaleString()}
        </CardContent>
      </CardHeader>
    </Card>
  );
};
export default MenuItems;
