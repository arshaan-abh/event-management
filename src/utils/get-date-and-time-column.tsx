import { ColumnDef, RowData } from "@tanstack/react-table";
import { formatDateAndTime } from "./format-date-and-time";
import { DateAndTimeCell } from "@/components/date-and-time-cell";

export interface DateAndTime {
  date: string;
  time: string;
  day: string;
}

export const getDateAndTimeColumn: <TData extends RowData>(
  props: {
    generateDateAndTime: (prop: TData) => string;
  } & ColumnDef<TData>,
) => ColumnDef<TData> = ({ generateDateAndTime, ...columnDef }) => ({
  cell: ({ row }) => (
    <DateAndTimeCell
      {...formatDateAndTime(generateDateAndTime(row.original))}
    />
  ),
  ...columnDef,
});
