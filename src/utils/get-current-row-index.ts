import { RowData, Row, Table } from "@tanstack/react-table";

export const getCurrentRowIndex = <TData extends RowData>({
  row,
  table,
}: {
  row: Row<TData>;
  table: Table<TData>;
}) => {
  const sortedRows = table.getRowModel().rows;

  return {
    currentRowIndex: sortedRows.findIndex((r) => r.id === row.id),
    sortedRows,
  };
};
