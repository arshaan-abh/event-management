import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import {
  useReactTable,
  RowData,
  TableOptions,
  flexRender,
} from "@tanstack/react-table";

interface TableProps<TData extends RowData> extends ComponentProps<"div"> {
  tableTitle: string;
  options: TableOptions<TData>;
}

export const Table = <TData extends RowData>({
  tableTitle,
  options,

  className,
  ...otherProps
}: TableProps<TData>) => {
  const table = useReactTable<TData>(options);

  return (
    <div
      className={cn("rounded-lg bg-white p-4 shadow", className)}
      {...otherProps}
    >
      <div className="mb-4 flex items-center gap-2">
        <div className="h-4 w-1 rounded-full bg-blue-400" />
        <h3 className="font-semibold">{tableTitle}</h3>
      </div>

      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
