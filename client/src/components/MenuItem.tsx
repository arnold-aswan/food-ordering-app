import { MenuItem } from "@/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";

type Props = {
  menuItem: MenuItem;
  addToCart: () => void;
};
const MenuItems = ({ menuItem, addToCart }: Props) => {
  return (
    <Card className={"cursor-pointer"} onClick={addToCart}>
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
