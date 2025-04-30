import { PortActivity } from "@/interfaces/lay-time";
import { ColumnDef } from "@tanstack/react-table";

export const portActivityColumns: ColumnDef<PortActivity>[] = [
  {
    header: "Day",
    accessorKey: "fromDateAndTime",
  },
];
