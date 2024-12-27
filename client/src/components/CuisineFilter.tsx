import { cuisines as cuisineList } from "@/config/restaurant-options-config";
import { Label } from "@/components/ui/label.tsx";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { ChangeEvent } from "react";
import { Button } from "@/components/ui/button.tsx";

type Props = {
  onChange: (cuisines: string[]) => void;
  selectedCuisines: string[];
  isExpanded: boolean;
  onExpandedClick: () => void;
};

const CuisineFilter = ({
  onChange,
  selectedCuisines,
  isExpanded,
  onExpandedClick,
}: Props) => {
  const handleCuisineReset = () => {
    onChange([]);
  };

  const handleCuisineChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    const newCuisinesList = checked
      ? [...selectedCuisines, value]
      : selectedCuisines?.filter((cuisine) => cuisine !== value);

    onChange(newCuisinesList);
  };
  return (
    <>
      <div className={"flex justify-between items-center px-2"}>
        <div className={"text-md font-semibold mb-2"}>Filter By Cuisine</div>
        <div
          onClick={handleCuisineReset}
          className="text-sm font-semibold
             mb-2 underline cursor-pointer text-black "
        >
          Reset Filters
        </div>
      </div>
      <div className={"space-y-2 flex flex-col"}>
        {cuisineList
          ?.slice(0, isExpanded ? cuisineList?.length : 7)
          .map((cuisine: string) => {
            const isSelected = selectedCuisines?.includes(cuisine);
            return (
              <div key={cuisine} className={"flex "}>
                <input
                  id={`cuisine_${cuisine}`}
                  type={"checkbox"}
                  className={"hidden"}
                  value={cuisine}
                  checked={isSelected}
                  onChange={handleCuisineChange}
                />
                <Label
                  htmlFor={`cuisine_${cuisine}`}
                  className={`flex flex-1 items-center cursor-pointer text-sm rounded-full px-4 py-2 font-semibold ${
                    isSelected
                      ? "border border-green-600 text-green-600"
                      : "border border-slate-600"
                  }`}
                >
                  {isSelected && <Check size={20} strokeWidth={3} />}
                  {cuisine}
                </Label>
              </div>
            );
          })}

        {/*  Button*/}
        <Button
          variant={"link"}
          className={"mt-4 flex-1"}
          onClick={onExpandedClick}
        >
          {isExpanded ? (
            <span className={"flex flex-row items-center"}>
              View Less <ChevronUp />
            </span>
          ) : (
            <span className={"flex flex-row items-center"}>
              View More <ChevronDown />
            </span>
          )}
        </Button>
      </div>
    </>
  );
};

export default CuisineFilter;
