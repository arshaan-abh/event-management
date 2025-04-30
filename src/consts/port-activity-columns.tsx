import { PortActivity } from "@/interfaces/lay-time";
import { formatDateAndTime } from "@/utils/format-date-and-time";
import { getSelectColumn } from "@/utils/get-select-column";
import { getDateAndTimeColumn } from "@/utils/get-date-and-time-column";
import { ColumnDef } from "@tanstack/react-table";

export const portActivityColumns: ColumnDef<PortActivity>[] = [
  {
    header: "Day",
    cell: ({ row }) => formatDateAndTime(row.original.fromDateAndTime).day,
  },
  getSelectColumn({
    generateValue: ({ activityType }) => activityType,
    header: "Activity Type",
    accessorKey: "activityType",
  }),
  getDateAndTimeColumn({
    generateDateAndTime: ({ fromDateAndTime }) => fromDateAndTime,
    header: "From Date & Time",
    accessorKey: "fromDateAndTime",
    editable: true,
  }),
];
