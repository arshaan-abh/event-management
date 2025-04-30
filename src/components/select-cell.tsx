import { dedupe } from "@/utils/dedupe";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./shadcn/select";
import { FC, useMemo } from "react";

interface SelectCellProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
}

export const SelectCell: FC<SelectCellProps> = ({
  value,
  onChange,
  options,
}) => {
  const uniqueOptions = useMemo(() => dedupe(options), []);
  return (
    <Select value={value} defaultValue={options[0]} onValueChange={onChange}>
      <SelectTrigger className="w-[180px] rounded-none border-none p-0 shadow-none !ring-0">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Activity Types</SelectLabel>
          {uniqueOptions.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
