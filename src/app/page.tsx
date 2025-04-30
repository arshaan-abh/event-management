"use client";

import { layTimeColumns } from "@/consts/lay-time-columns";
import { Table } from "@/components/table";
import { layTimes as initialLayTimes } from "@/consts/lay-times";
import { getCoreRowModel, RowSelectionState } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { portActivityColumns } from "@/consts/port-activity-columns";
import { usePersistentState } from "@/hooks/use-persistent-state";
import { UpdateDataProps } from "@/utils/get-select-column";

export default function Home() {
  const [layTimes, setLayTimes] = usePersistentState(
    "event-management:lay-times:data",
    initialLayTimes,
  );

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const selectedLayTime = useMemo(
    () =>
      layTimes.find(
        (layTime) => layTime.id === parseInt(Object.keys(rowSelection)[0]),
      ),
    [layTimes, rowSelection],
  );

  return (
    <div className="flex flex-col gap-4 p-4">
      <Table
        tableTitle="Lay Times"
        options={{
          columns: layTimeColumns,
          data: layTimes,
          getCoreRowModel: getCoreRowModel(),
          onRowSelectionChange: setRowSelection,
          getRowId: (row) => row.id.toString(),
          enableMultiRowSelection: false,
          state: {
            rowSelection,
          },
        }}
      />

      <Table
        tableTitle="Port Activity"
        options={{
          columns: portActivityColumns,
          data: selectedLayTime?.items ?? [],
          getCoreRowModel: getCoreRowModel(),
          enableRowSelection: false,
          meta: {
            updateData: ({ rowIndex, columnId, value }: UpdateDataProps) =>
              setLayTimes((oldLayTimes) =>
                oldLayTimes.map((oldLayTime) => {
                  if (oldLayTime.id === selectedLayTime?.id) {
                    const updatedItems = oldLayTime.items.map((item, index) =>
                      index === rowIndex
                        ? { ...item, [columnId]: value }
                        : item,
                    );
                    return {
                      ...oldLayTime,
                      items: updatedItems,
                    };
                  }
                  return oldLayTime;
                }),
              ),
          },
        }}
      />
    </div>
  );
}
