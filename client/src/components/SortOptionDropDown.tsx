import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu.tsx";
import { Button } from "@/components/ui/button.tsx";

type Props = {
  onChange: (value: string) => void;
  sortOption: string;
};

const sort_options = [
  {
    id: 1,
    label: "Best match",
    value: "bestMatch",
  },
  {
    id: 2,
    label: "Delivery price",
    value: "deliveryPrice",
  },
  {
    id: 3,
    label: "Estimated delivery time",
    value: "estimatedDeliveryTime",
  },
];

const SortOptionDropDown = ({ onChange, sortOption }: Props) => {
  const selectedSortOption =
    sort_options.find((option) => option.value === sortOption)?.label ||
    sort_options[0].label;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={"cursor-pointer"}>
        <Button variant={"outline"} className={"w-full"}>
          Sort by: {selectedSortOption}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {sort_options?.map((option) => (
          <DropdownMenuItem
            key={option.id}
            className={"cursor-pointer"}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortOptionDropDown;
