"use client";

import { CountryCell } from "@/components/country-cell";
import { Table } from "@/components/table";
import { layTimes } from "@/consts/lay-times";
import { getCoreRowModel } from "@tanstack/react-table";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <Table
        tableTitle="Lay Times"
        options={{
          columns: [
            {
              header: "Port Name",
              cell: ({ row }) => <CountryCell {...row.original.portName} />,
            },
          ],
          data: layTimes,
          getCoreRowModel: getCoreRowModel(),
        }}
      />
    </div>
  );
}
