import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export const SortButton = ({
  toggleSort,
  setToggleSort,
  setSort,
}: {
  toggleSort: string;
  setToggleSort: (val: string) => void;
  setSort: (val: string) => void;
}) => {
  const handleSort = () => {
    const sortVal = toggleSort === "ASC" ? "created_at" : "-created_at";
    setToggleSort(toggleSort === "ASC" ? "DSC" : "ASC");
    setSort(sortVal);
  };

  return (
    <Button
      variant="outline"
      className="bg-white text-black border hover:bg-black hover:text-white "
      onClick={handleSort}
    >
      <ArrowUpDown className="mr-1" />
      Sort
    </Button>
  );
};
