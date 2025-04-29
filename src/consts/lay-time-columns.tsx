import { LayTime } from "@/interfaces/lay-time";
import { getCountryColumn } from "@/utils/get-country-column";
import { getNumberColumn } from "@/utils/get-number-column";
import { getTimeDiffColumn } from "@/utils/get-time-diff-column";
import { ColumnDef } from "@tanstack/react-table";

export const layTimeColumns: ColumnDef<LayTime>[] = [
  getCountryColumn({
    generateCountry: ({ portName }) => portName,
    header: "Port Name",
  }),
  {
    header: "Cargo",
    accessorKey: "cargo",
  },
  {
    header: "F",
    accessorKey: "f",
  },
  {
    header: "BL Code",
    accessorKey: "blCode",
  },
  getNumberColumn({
    generateNumber: ({ quantity }) => quantity,
    header: "Quantity",
  }),
  getNumberColumn({
    generateNumber: ({ ldRate }) => ldRate,
    header: "L/D Rate",
  }),
  {
    header: "Term",
    accessorKey: "term",
  },
  getNumberColumn({
    generateNumber: ({ demRate }) => demRate,
    header: "Dem Rate",
  }),
  getNumberColumn({
    generateNumber: ({ desRateD }) => desRateD,
    header: "Des Rate/D",
  }),
  getNumberColumn({
    generateNumber: ({ allowed }) => allowed,
    header: "Allowed",
  }),
  getTimeDiffColumn({
    generateTimeDiff: ({ used }) => used,
    header: "Used",
  }),
  getTimeDiffColumn({
    generateTimeDiff: ({ deduction }) => deduction,
    header: "Deduction",
  }),
  getTimeDiffColumn({
    generateTimeDiff: ({ balance }) => balance,
    header: "Balance",
  }),
  {
    header: "Laycan From",
    cell: ({ row }) => row.original.laycanFrom,
  },
  {
    header: "Laycan To",
    cell: ({ row }) => row.original.laycanTo,
  },
];
