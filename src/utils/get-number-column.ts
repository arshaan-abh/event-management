import { ColumnDef, RowData } from "@tanstack/react-table";
import { formatNumber } from "./format-number";

export const getNumberColumn: <TData extends RowData>(
  props: { generateNumber: (prop: TData) => number } & ColumnDef<TData>,
) => ColumnDef<TData> = ({ generateNumber, ...columnDef }) => ({
  cell: ({ row }) => formatNumber(generateNumber(row.original)),
  ...columnDef,
});
