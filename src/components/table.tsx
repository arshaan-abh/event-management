import { cn } from "@/utils/cn";
import { ComponentProps } from "react";
import {
  useReactTable,
  RowData,
  TableOptions,
  flexRender,
} from "@tanstack/react-table";
import { Inbox } from "lucide-react";

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

      <div className="overflow-x-auto text-sm">
        <table className="min-w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => {
                  const isLast = index === headerGroup.headers.length - 1;
                  return (
                    <th
                      key={header.id}
                      className={cn(
                        "relative truncate border-b-2 border-gray-200 bg-zinc-100 px-4 py-2 text-start",
                        index === 0 && "rounded-tl-lg",
                        isLast && "rounded-tr-lg",
                      )}
                    >
                      {!isLast && (
                        <div className="absolute inset-y-0 right-0 my-auto h-6 w-[2px] rounded-full bg-gray-200" />
                      )}

                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                onClick={row.getToggleSelectedHandler()}
                className={cn(
                  row.getIsSelected() && "bg-indigo-50",
                  row.getCanSelect() && "cursor-pointer",
                )}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="h-[2.375rem] truncate border-b-2 border-zinc-100 px-4"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}

            {table.getRowModel().rows.length === 0 && (
              <tr>
                <td colSpan={table.getAllColumns().length}>
                  <div className="pointer-events-none absolute inset-x-0 flex h-36 flex-col items-center justify-center">
                    <Inbox
                      className="text-zinc-300"
                      size={64}
                      strokeWidth={1}
                    />
                    <div className="text-neutral-400">No data</div>
                  </div>
                  <div className="h-36" />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
