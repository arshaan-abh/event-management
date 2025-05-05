import { PortActivity } from "@/interfaces/lay-time";
import { Row, Table } from "@tanstack/react-table";
import { getCurrentRowIndex } from "./get-current-row-index";

export interface SortingStep {
  currentIndex: number;
  sortedIndex: number;
}

export const getSortingSteps = (
  portActivities: PortActivity[],
): SortingStep[] => {
  // Clone the list and sort by fromDateAndTime
  const sortedActivities = [...portActivities].sort((a, b) => {
    return (
      new Date(a.fromDateAndTime).getTime() -
      new Date(b.fromDateAndTime).getTime()
    );
  });

  // Create a map of currentIndex to sortedIndex
  const steps: SortingStep[] = portActivities
    .map((activity, currentIndex) => {
      const sortedIndex = sortedActivities.findIndex(
        (sortedActivity) => sortedActivity.id === activity.id,
      );
      return { currentIndex, sortedIndex };
    })
    .filter((step) => step.currentIndex !== step.sortedIndex);

  return steps;
};

export const shouldBeSorted = (
  row: Row<PortActivity>,
  table: Table<PortActivity>,
  sortingSteps: SortingStep[],
): boolean => {
  const { currentRowIndex } = getCurrentRowIndex({ row: row, table: table });

  const sortingStep = sortingSteps.find(
    (step) => step.currentIndex === currentRowIndex,
  );

  return sortingStep ? true : false;
};
