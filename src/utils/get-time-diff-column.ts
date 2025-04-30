import { ColumnDef, RowData } from "@tanstack/react-table";
import { formatTimeDiff } from "./format-time-diff";

export interface TimeDiff {
  from: string;
  to: string;
}

export const getTimeDiffColumn: <TData extends RowData>(
  props: { generateTimeDiff: (prop: TData) => TimeDiff } & ColumnDef<TData>,
) => ColumnDef<TData> = ({ generateTimeDiff, ...columnDef }) => ({
  cell: ({ row }) => {
    const timeDiff = generateTimeDiff(row.original);
    return formatTimeDiff(timeDiff.from, timeDiff.to);
  },
  ...columnDef,
});
