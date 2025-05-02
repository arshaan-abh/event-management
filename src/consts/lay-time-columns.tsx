import { LayTime } from "@/interfaces/lay-time";
import { getCountryColumn } from "@/utils/get-country-column";
import { getDateAndTimeColumn } from "@/utils/get-date-and-time-column";
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
    generateTimeDiff: ({ row }) => row.original.used,
    header: "Used",
  }),
  getTimeDiffColumn({
    generateTimeDiff: ({ row }) => row.original.deduction,
    header: "Deduction",
  }),
  getTimeDiffColumn({
    generateTimeDiff: ({ row }) => row.original.balance,
    header: "Balance",
  }),
  getDateAndTimeColumn({
    generateDateAndTime: ({ row }) => row.original.laycanFrom,
    header: "Laycan From",
  }),
  getDateAndTimeColumn({
    generateDateAndTime: ({ row }) => row.original.laycanTo,
    header: "Laycan To",
  }),
];
