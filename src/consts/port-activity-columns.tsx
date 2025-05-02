import { PortActivity, PortActivityType } from "@/interfaces/lay-time";
import { formatDateAndTime } from "@/utils/format-date-and-time";
import { getSelectColumn } from "@/utils/get-select-column";
import { getDateAndTimeColumn } from "@/utils/get-date-and-time-column";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import { getTimeDiffColumn, TimeDiff } from "@/utils/get-time-diff-column";
import { applyPercentageToTimeDiff } from "@/utils/apply-percentage-to-time-diff";
import { formatTimeDiff } from "@/utils/format-time-diff";

const getCurrentAndNextRowsValues: (
  cellContext: CellContext<PortActivity, unknown>,
) => { currentValue: string; nextValue: string } = ({ row, table }) => {
  const sortedRows = table.getRowModel().rows;
  const currentRowIndex = sortedRows.findIndex((r) => r.id === row.id);
  const nextRow = sortedRows[currentRowIndex + 1];
  const nextValue = nextRow?.original?.fromDateAndTime;
  const currentValue = row.original.fromDateAndTime;
  return { currentValue, nextValue };
};

const calculateDuration: (
  cellContext: CellContext<PortActivity, unknown>,
) => TimeDiff = (cellContext) => {
  const { currentValue, nextValue } = getCurrentAndNextRowsValues(cellContext);
  return {
    from: currentValue,
    to: nextValue ?? currentValue,
  };
};

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
    generateDateAndTime: ({ row }) => row.original.fromDateAndTime,
    header: "From Date & Time",
    accessorKey: "fromDateAndTime",
    editable: true,
    sortingFn: (rowA, rowB, columnId) => {
      const a = new Date(rowA.getValue(columnId)).getTime();
      const b = new Date(rowB.getValue(columnId)).getTime();
      return b - a;
    },
  }),
  getTimeDiffColumn({
    generateTimeDiff: calculateDuration,
    header: "Duration",
  }),
  getSelectColumn({
    generateValue: ({ percentage }) => percentage.toString(),
    header: "%",
    accessorKey: "percentage",
    options: ["0", "50", "100"],
    renderOption: (percentage) => `${percentage}%`,
  }),
  getDateAndTimeColumn({
    generateDateAndTime: (cellContext) => {
      const { currentValue, nextValue } =
        getCurrentAndNextRowsValues(cellContext);
      return nextValue ?? currentValue;
    },
    header: "To Date & Time",
    accessorKey: "toDateAndTime",
  }),
  {
    header: "Remarks",
    accessorKey: "remarks",
  },
  {
    header: "Deductions",
    cell: (cellContext) => {
      const duration = calculateDuration(cellContext);
      return applyPercentageToTimeDiff(
        formatTimeDiff(duration.from, duration.to),
        cellContext.row.original.percentage,
      );
    },
  },
];
