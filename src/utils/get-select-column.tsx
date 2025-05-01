import { ColumnDef, RowData } from "@tanstack/react-table";
import { SelectCell } from "@/components/select-cell";
import { ReactNode } from "react";

export interface UpdateDataProps {
  rowIndex: number;
  columnId: string;
  value: unknown;
}

export const getSelectColumn: <TData extends RowData>(
  props: {
    generateValue: (props: TData) => string;
    accessorKey: keyof TData;
    options: string[];
    renderOption?: (option: string) => ReactNode;
  } & ColumnDef<TData>,
) => ColumnDef<TData> = ({
  generateValue,
  options,
  renderOption,
  ...columnDef
}) => ({
  cell: ({ row, column, table }) => {
    const value = generateValue(row.original);
    const meta = table.options.meta as {
      updateData: (props: UpdateDataProps) => void;
    };
    return (
      <SelectCell
        value={value}
        options={options}
        renderOption={renderOption}
        onChange={(value) =>
          meta.updateData({
            rowIndex: row.index,
            columnId: column.id,
            value,
          })
        }
      />
    );
  },
  ...columnDef,
});
