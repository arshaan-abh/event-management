import { Files, Trash, AlertCircle } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "./shadcn/button";
import { RowData, CellContext } from "@tanstack/react-table";
import { PortActivityMeta } from "@/interfaces/port-activity-meta";
import { CustomPopover } from "./custom-popover";
import { getCurrentRowIndex } from "@/utils/get-current-row-index";

export const ActionsCell = <TData extends RowData>({
  row,
  table,
}: CellContext<TData, unknown>) => {
  const [swapPopoverOpen, setSwapPopoverOpen] = useState(false);
  const [deletePopoverOpen, setDeletePopoverOpen] = useState(false);

  const meta = useMemo(
    () => table.options.meta as PortActivityMeta,
    [table.options.meta],
  );

  const swapWith = useMemo(() => {
    const { currentRowIndex } = getCurrentRowIndex({ row, table });
    return meta.sortingSteps.find(
      (step) => step.currentIndex === currentRowIndex,
    )?.sortedIndex;
  }, [meta.sortingSteps, row, table]);

  return (
    <div className="flex size-full items-center justify-end">
      {swapWith !== undefined && (
        <CustomPopover
          message="Adjust this event automatically?"
          open={swapPopoverOpen}
          setOpen={setSwapPopoverOpen}
          onConfirm={() =>
            meta.swapData({ rowIndex1: row.index, rowIndex2: swapWith })
          }
        >
          <Button variant="ghost" size="sm">
            <AlertCircle size={16} />
          </Button>
        </CustomPopover>
      )}

      <Button
        onClick={() => meta.copyData({ rowIndex: row.index })}
        variant="ghost"
        size="sm"
      >
        <Files size={16} />
      </Button>

      <CustomPopover
        message="Sure to delete?"
        open={deletePopoverOpen}
        setOpen={setDeletePopoverOpen}
        onConfirm={() => meta.deleteData({ rowIndex: row.index })}
      >
        <Button variant="ghost" size="sm">
          <Trash size={16} />
        </Button>
      </CustomPopover>
    </div>
  );
};
