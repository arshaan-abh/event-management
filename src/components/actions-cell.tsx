import { Popover, PopoverContent, PopoverTrigger } from "./shadcn/popover";
import { Files, Trash, CircleAlert } from "lucide-react";
import { useState } from "react";
import { Button } from "./shadcn/button";

export const ActionsCell = () => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  return (
    <div className="flex size-full items-center justify-end">
      <Button variant="ghost" size="sm">
        <Files size={16} />
      </Button>

      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="sm">
            <Trash size={16} />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="flex w-fit flex-col items-center justify-center gap-3 text-sm"
          side="top"
          align="end"
        >
          <div className="flex items-center justify-center gap-2">
            <CircleAlert className="text-amber-500" size={16} />
            <div>Sure to delete?</div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <Button
              onClick={() => setPopoverOpen(false)}
              variant="outline"
              size="sm"
            >
              Cancel
            </Button>
            <Button variant="default" size="sm">
              OK
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
