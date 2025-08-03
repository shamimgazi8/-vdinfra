import { Input } from "@/components/ui/input";

export const SearchInput = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) => (
  <Input
    className="w-[200px]"
    placeholder="Search titles..."
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
);
