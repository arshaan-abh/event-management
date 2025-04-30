import {
  PortActivity,
  PortActivityPercentage,
  PortActivityType,
} from "@/interfaces/lay-time";
import { formatDateAndTime } from "@/utils/format-date-and-time";
import { getSelectColumn } from "@/utils/get-select-column";
import { getDateAndTimeColumn } from "@/utils/get-date-and-time-column";
import { ColumnDef } from "@tanstack/react-table";
import { getTimeDiffColumn } from "@/utils/get-time-diff-column";

export const portActivityColumns: ColumnDef<PortActivity>[] = [
  {
    header: "Day",
    cell: ({ row }) => formatDateAndTime(row.original.fromDateAndTime).day,
  },
  getSelectColumn({
    generateValue: ({ activityType }) => activityType,
    header: "Activity Type",
    accessorKey: "activityType",
    options: Object.values(PortActivityType),
  }),
  getDateAndTimeColumn({
    generateDateAndTime: ({ fromDateAndTime }) => fromDateAndTime,
    header: "From Date & Time",
    accessorKey: "fromDateAndTime",
    editable: true,
  }),
  getTimeDiffColumn({
    generateTimeDiff: ({ fromDateAndTime }) => ({
      from: fromDateAndTime,
      to: fromDateAndTime,
    }),
    header: "Duration",
  }),
  getSelectColumn({
    generateValue: ({ percentage }) => percentage.toString(),
    header: "%",
    accessorKey: "percentage",
    options: Object.values(PortActivityPercentage).map((percentage) =>
      percentage.toString(),
    ),
  }),
  getDateAndTimeColumn({
    generateDateAndTime: ({ fromDateAndTime }) => fromDateAndTime,
    header: "To Date & Time",
    accessorKey: "toDateAndTime",
  }),
  {
    header: "Remarks",
    accessorKey: "remarks",
  },
  {
    header: "Deductions",
    accessorKey: "deductions",
  },
];
