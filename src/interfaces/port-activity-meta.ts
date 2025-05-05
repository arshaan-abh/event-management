import { SortingStep } from "@/utils/sort-port-activity";

export interface PortActivityMeta {
  sortingSteps: SortingStep[];
  swapData: (props: { rowIndex1: number; rowIndex2: number }) => void;
  updateData: (props: {
    rowIndex: number;
    columnId: string;
    value: unknown;
  }) => void;
  copyData: (props: { rowIndex: number }) => void;
  deleteData: (props: { rowIndex: number }) => void;
}
