"use client";

import { layTimeColumns } from "@/consts/lay-time-columns";
import { Table } from "@/components/table";
import { layTimes } from "@/consts/lay-times";
import { getCoreRowModel, RowSelectionState } from "@tanstack/react-table";
import { useState } from "react";

export default function Home() {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  return (
    <div className="flex flex-col gap-4 p-4">
      <Table
        tableTitle="Lay Times"
        options={{
          columns: layTimeColumns,
          data: layTimes,
          getCoreRowModel: getCoreRowModel(),
          onRowSelectionChange: setRowSelection,
          getRowId: (row) => row.portName.name,
          enableMultiRowSelection: false,
          state: {
            rowSelection,
          },
        }}
      />

      {Object.keys(rowSelection)[0]}
    </div>
  );
}
