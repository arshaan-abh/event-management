"use client";

import { layTimeColumns } from "@/consts/lay-time-columns";
import { Table } from "@/components/table";
import { layTimes } from "@/consts/lay-times";
import { getCoreRowModel, RowSelectionState } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { portActivityColumns } from "@/consts/port-activity-columns";

export default function Home() {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const selectedLayTime = useMemo(
    () =>
      layTimes.find(
        (_, index) => index === parseInt(Object.keys(rowSelection)[0]),
      ),
    [rowSelection],
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
        }}
      />
    </div>
  );
}
