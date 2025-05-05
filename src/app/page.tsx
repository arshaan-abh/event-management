"use client";

import { layTimeColumns } from "@/consts/lay-time-columns";
import { Table } from "@/components/table";
import { layTimes as initialLayTimes } from "@/consts/lay-times";
import { getCoreRowModel, RowSelectionState } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { portActivityColumns } from "@/consts/port-activity-columns";
import { usePersistentState } from "@/hooks/use-persistent-state";
import { UpdateDataProps } from "@/utils/get-select-column";
import { LayTime, PortActivity, PortActivityType } from "@/interfaces/lay-time";
import { formatDateAndTime } from "@/utils/format-date-and-time";
import { CopyDataProps, DeleteDataProps } from "@/components/actions-cell";

const updateSelectedLayTimesItems = (
  oldLayTimes: LayTime[],
  selectedLayTimesId: number | undefined,
  generateItems: (oldLayTimesItems: PortActivity[]) => PortActivity[],
) =>
  oldLayTimes.map((oldLayTime) => {
    if (oldLayTime.id === selectedLayTimesId) {
      return {
        ...oldLayTime,
        items: generateItems(oldLayTime.items),
      };
    }
    return oldLayTime;
  });

const addEmptyPortActivityItem = (
  oldLayTimes: LayTime[],
  selectedLayTime: LayTime | undefined,
) =>
  updateSelectedLayTimesItems(
    oldLayTimes,
    selectedLayTime?.id,
    (oldLayTimesItems) => {
      const addedAt = formatDateAndTime(new Date().toISOString());
      return [
        ...oldLayTimesItems,
        {
          id: oldLayTimesItems.length,
          activityType: PortActivityType.Unknown,
          fromDateAndTime:
            oldLayTimesItems[oldLayTimesItems.length - 1].fromDateAndTime,
          percentage: 0,
          remarks: `Added at ${addedAt.date}, ${addedAt.time}`,
        },
      ];
    },
  );

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
          enableRowSelection: false,
          meta: {
            updateData: ({ rowIndex, columnId, value }: UpdateDataProps) =>
              setLayTimes((oldLayTimes) =>
                updateSelectedLayTimesItems(
                  oldLayTimes,
                  selectedLayTime?.id,
                  (oldLayTimesItems) =>
                    oldLayTimesItems.map((item, index) =>
                      index === rowIndex
                        ? { ...item, [columnId]: value }
                        : item,
                    ),
                ),
              ),
            copyData: ({ rowIndex }: CopyDataProps) =>
              setLayTimes((oldLayTimes) =>
                updateSelectedLayTimesItems(
                  oldLayTimes,
                  selectedLayTime?.id,
                  (oldLayTimesItems) => {
                    const itemToCopy = oldLayTimesItems[rowIndex];

                    const copiedItem = {
                      ...itemToCopy,
                      remarks: `${itemToCopy.remarks} (Copied)`,
                    };

                    return [
                      ...oldLayTimesItems.slice(0, rowIndex + 1),
                      copiedItem,
                      ...oldLayTimesItems.slice(rowIndex + 1),
                    ].map((item, index) => ({
                      ...item,
                      id: index,
                    }));
                  },
                ),
              ),
            deleteData: ({ rowIndex }: DeleteDataProps) =>
              setLayTimes((oldLayTimes) =>
                updateSelectedLayTimesItems(
                  oldLayTimes,
                  selectedLayTime?.id,
                  (oldLayTimesItems) =>
                    oldLayTimesItems.filter((_, index) => index !== rowIndex),
                ),
              ),
          },
        }}
      />
    </div>
  );
}
