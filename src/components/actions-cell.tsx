import { Popover, PopoverContent, PopoverTrigger } from "./shadcn/popover";
import { Files, Trash, CircleAlert } from "lucide-react";
import { useState } from "react";
import { Button } from "./shadcn/button";
import { RowData, CellContext } from "@tanstack/react-table";

export interface CopyDataProps {
  rowIndex: number;
}

export interface DeleteDataProps {
  rowIndex: number;
}

export const ActionsCell = <TData extends RowData>({
  row,
  table,
}: CellContext<TData, unknown>) => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const meta = table.options.meta as {
    copyData: (props: CopyDataProps) => void;
    deleteData: (props: DeleteDataProps) => void;
  };

  return (
    <div className="flex size-full items-center justify-end">
      <Button
        onClick={() => meta.copyData({ rowIndex: row.index })}
        variant="ghost"
        size="sm"
      >
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
            <Button
              onClick={() => {
                meta.deleteData({ rowIndex: row.index });
                setPopoverOpen(false);
              }}
              variant="default"
              size="sm"
            >
              OK
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
