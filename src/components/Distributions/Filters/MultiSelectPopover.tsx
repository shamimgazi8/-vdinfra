import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

type OptionMap = Record<
  string,
  { icon: React.ReactNode; colorClass: string }
>;

export const MultiSelectPopover = ({
  icon,
  label,
  search,
  setSearch,
  options,
  selected,
  toggleValue,
  iconMap,
}: {
  icon: React.ReactNode;
  label: string;
  search: string;
  setSearch: (val: string) => void;
  options: string[];
  selected: string[];
  toggleValue: (val: string) => void;
  iconMap: OptionMap;
}) => {
  const filtered = options.filter((option) =>
    option.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="bg-white text-black border hover:bg-black hover:text-white border-dashed">
          {icon}
          {label}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48">
        <Input
          placeholder={`Search ${label.toLowerCase()}...`}
          className="mb-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {filtered.map((val) => {
            const key = val.toLowerCase();
            const isSelected = selected.some((s) => s.toLowerCase() === key);
            const { icon, colorClass } = iconMap[key] ?? { icon: null, colorClass: "text-gray-500" };

            return (
              <Button
                key={val}
                variant="ghost"
                className="flex items-center gap-2 justify-start"
                onClick={() => toggleValue(val)}
              >
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={(checked) =>
                    checked
                      ? toggleValue(val)
                      : toggleValue(val)
                  }
                />
                <span className={`flex items-center gap-1 capitalize ${colorClass}`}>
                  {icon}
                  {val}
                </span>
              </Button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
};
