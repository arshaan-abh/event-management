import { CountryCell } from "@/components/country-cell";
import { ColumnDef, RowData } from "@tanstack/react-table";

export interface Country {
  code: string;
  name: string;
}

export const getCountryColumn: <TData extends RowData>(
  props: { generateCountry: (prop: TData) => Country } & ColumnDef<TData>,
) => ColumnDef<TData> = ({ generateCountry, ...columnDef }) => ({
  cell: ({ row }) => <CountryCell {...generateCountry(row.original)} />,
  ...columnDef,
});
