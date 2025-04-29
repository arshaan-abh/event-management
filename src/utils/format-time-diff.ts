/**
 * Calculates and formats the time difference between two UTC dates
 * @param startUtc - The starting UTC date
 * @param endUtc - The ending UTC date
 * @returns A formatted string showing the difference (e.g., "01d 00:00")
 */
export const formatTimeDiff = (
  startUtc: Date | string | number,
  endUtc: Date | string | number,
): string => {
  // Convert inputs to Date objects if they aren't already
  const start = startUtc instanceof Date ? startUtc : new Date(startUtc);
  const end = endUtc instanceof Date ? endUtc : new Date(endUtc);

  // Calculate difference in milliseconds
  const diffMs = end.getTime() - start.getTime();

  // Convert to days, hours, and minutes
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  // Format the output with leading zeros
  const formattedDays = String(days).padStart(2, "0");
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");

  return `${formattedDays}d ${formattedHours}:${formattedMinutes}`;
};
