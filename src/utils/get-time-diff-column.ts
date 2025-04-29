import { ColumnDef, RowData } from "@tanstack/react-table";
import { formatTimeDiff } from "./format-time-diff";

export interface TimeDiff {
  from: string;
  to: string;
}

export const getTimeDiffColumn: <TData extends RowData>(
  props: { generateTimeDiff: (prop: TData) => TimeDiff } & ColumnDef<TData>,
) => ColumnDef<TData> = ({ generateTimeDiff, ...columnDef }) => ({
  cell: ({ row }) =>
    formatTimeDiff(
      generateTimeDiff(row.original).from,
      generateTimeDiff(row.original).to,
    ),
  ...columnDef,
});
