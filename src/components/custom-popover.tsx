import { Popover, PopoverContent, PopoverTrigger } from "./shadcn/popover";
import { CircleAlert } from "lucide-react";
import { ReactNode, FC } from "react";
import { Button } from "./shadcn/button";

interface CustomPopoverProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onConfirm: () => void;
  message: string;
  children: ReactNode;
}

export const CustomPopover: FC<CustomPopoverProps> = ({
  open,
  setOpen,
  onConfirm,
  message,
  children,
}) => {
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        className="flex w-fit flex-col items-center justify-center gap-3 text-sm"
        side="top"
        align="end"
      >
        <div className="flex items-center justify-center gap-2">
          <CircleAlert className="text-amber-500" size={16} />
          <div>{message}</div>
        </div>

        <div className="flex items-center justify-center gap-3">
          <Button onClick={() => setOpen(false)} variant="outline" size="sm">
            Cancel
          </Button>
          <Button
            onClick={() => {
              onConfirm();
              setOpen(false);
            }}
            variant="default"
            size="sm"
          >
            OK
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
