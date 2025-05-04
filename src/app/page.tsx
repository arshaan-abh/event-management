"use client";

import { layTimeColumns } from "@/consts/lay-time-columns";
import { Table } from "@/components/table";
import { layTimes as initialLayTimes } from "@/consts/lay-times";
import {
  getCoreRowModel,
  getSortedRowModel,
  RowSelectionState,
  SortingState,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { portActivityColumns } from "@/consts/port-activity-columns";
import { usePersistentState } from "@/hooks/use-persistent-state";
import { UpdateDataProps } from "@/utils/get-select-column";
import { LayTime, PortActivity, PortActivityType } from "@/interfaces/lay-time";
import { formatDateAndTime } from "@/utils/format-date-and-time";

const addEmptyPortActivityItem = (
  oldLayTimes: LayTime[],
  selectedLayTime: LayTime | undefined,
) =>
  oldLayTimes.map((oldLayTime) => {
    if (oldLayTime.id === selectedLayTime?.id) {
      const addedAt = formatDateAndTime(new Date().toISOString());
      const updatedItems: PortActivity[] = [
        ...oldLayTime.items,
        {
          id: oldLayTime.items.length,
          activityType: PortActivityType.Unknown,
          fromDateAndTime:
            oldLayTime.items[oldLayTime.items.length - 1].fromDateAndTime,
          percentage: 0,
          remarks: `Added at ${addedAt.date}, ${addedAt.time}`,
        },
      ];
      return {
        ...oldLayTime,
        items: updatedItems,
      };
    }
    return oldLayTime;
  });

export default function Home() {
  const [layTimes, setLayTimes] = usePersistentState(
    "event-management:lay-times:data",
    initialLayTimes,
  );

  const [layTimesRowSelection, layTimesSetRowSelection] =
    useState<RowSelectionState>({});

  const selectedLayTime = useMemo(
    () =>
      layTimes.find(
        (layTime) =>
          layTime.id === parseInt(Object.keys(layTimesRowSelection)[0]),
      ),
    [layTimes, layTimesRowSelection],
  );

  const [portActivitySorting, portActivitySetSorting] = useState<SortingState>([
    { id: "fromDateAndTime", desc: true },
  ]);

  useEffect(() => {
    portActivitySetSorting([{ id: "fromDateAndTime", desc: true }]);
  }, [layTimes, portActivitySetSorting]);

  return (
    <div className="flex flex-col gap-4 p-4">
      <Table
        tableTitle="Lay Times"
        options={{
          columns: layTimeColumns,
          data: layTimes,
          getCoreRowModel: getCoreRowModel(),
          onRowSelectionChange: layTimesSetRowSelection,
          getRowId: (row) => row.id.toString(),
          enableMultiRowSelection: false,
          state: {
            rowSelection: layTimesRowSelection,
          },
        }}
      />

      <Table
        tableTitle="Port Activity"
        onAddNewRow={() =>
          setLayTimes((oldLayTimes) =>
            addEmptyPortActivityItem(oldLayTimes, selectedLayTime),
          )
        }
        options={{
          columns: portActivityColumns,
          data: selectedLayTime?.items ?? [],
          getCoreRowModel: getCoreRowModel(),
          getSortedRowModel: getSortedRowModel(),
          onSortingChange: portActivitySetSorting,
          state: {
            sorting: portActivitySorting,
          },
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
