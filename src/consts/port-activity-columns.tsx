import { PortActivity } from "@/interfaces/lay-time";
import { formatDateAndTime } from "@/utils/format-date-and-time";
import { getSelectColumn } from "@/utils/get-select-column";
import { ColumnDef } from "@tanstack/react-table";

export const portActivityColumns: ColumnDef<PortActivity>[] = [
  {
    header: "Day",
    cell: ({ row }) => formatDateAndTime(row.original.fromDateAndTime).day,
  },
  getSelectColumn({ header: "Activity Type", accessorKey: "activityType" }),
];
