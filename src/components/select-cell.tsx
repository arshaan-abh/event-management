import { dedupe } from "@/utils/dedupe";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./shadcn/select";
import { FC, ReactNode, useMemo } from "react";

interface SelectCellProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  renderOption?: (option: string) => ReactNode;
}

export const SelectCell: FC<SelectCellProps> = ({
  value,
  onChange,
  options,
  renderOption,
}) => {
  const uniqueOptions = useMemo(() => dedupe(options), []);
  return (
    <Select value={value} defaultValue={options[0]} onValueChange={onChange}>
      <SelectTrigger className="w-full rounded-none border-none p-0 shadow-none !ring-0">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {uniqueOptions.map((option) => (
            <SelectItem key={option} value={option}>
              {renderOption ? renderOption(option) : option}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
