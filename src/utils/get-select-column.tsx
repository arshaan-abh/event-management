import { ColumnDef, RowData } from "@tanstack/react-table";
import { PortActivityType } from "@/interfaces/lay-time";
import { SelectCell } from "@/components/select-cell";

export interface UpdateDataProps {
  rowIndex: number;
  columnId: string;
  value: unknown;
}

export const getSelectColumn: <TData extends RowData>(
  props: Omit<ColumnDef<TData>, "accessorKey"> & { accessorKey: keyof TData },
) => ColumnDef<TData> = (columnDef) => ({
  cell: ({ row, table }) => {
    const value = row.original[columnDef.accessorKey];
    const meta = table.options.meta as {
      updateData: (props: UpdateDataProps) => void;
    };
    return (
      <SelectCell
        value={value as string} // TODO make this typesafe
        options={Object.values(PortActivityType)}
        onChange={(value) =>
          meta.updateData({
            rowIndex: row.index,
            columnId: "activityType",
            value,
          })
        }
      />
    );
  },
  ...columnDef,
});
