import { CellContext, ColumnDef, RowData } from "@tanstack/react-table";
import { formatTimeDiff } from "./format-time-diff";

export interface TimeDiff {
  from: string;
  to: string;
}

export const getTimeDiffColumn: <TData extends RowData>(
  props: {
    generateTimeDiff: (cellContext: CellContext<TData, unknown>) => TimeDiff;
  } & ColumnDef<TData>,
) => ColumnDef<TData> = ({ generateTimeDiff, ...columnDef }) => ({
  cell: (cellContext) => {
    const timeDiff = generateTimeDiff(cellContext);
    return formatTimeDiff(timeDiff.from, timeDiff.to);
  },
  ...columnDef,
});
