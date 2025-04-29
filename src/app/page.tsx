"use client";

import { layTimeColumns } from "@/consts/lay-time-columns";
import { Table } from "@/components/table";
import { layTimes } from "@/consts/lay-times";
import { getCoreRowModel } from "@tanstack/react-table";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <Table
        tableTitle="Lay Times"
        options={{
          columns: layTimeColumns,
          data: layTimes,
          getCoreRowModel: getCoreRowModel(),
        }}
      />
    </div>
  );
}
