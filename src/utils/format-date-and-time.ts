import { DateAndTime } from "./get-date-and-time-column";

/**
 * Formats a UTC string into an object with formatted date and time
 * @param utcString - The UTC date string to format
 * @returns An object with formatted date and time properties
 */
export const formatDateAndTime = (utcString: string): DateAndTime => {
  // Create Date object from input string
  const date = new Date(utcString);

  // Format date as "YYYY/MM/DD"
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const formattedDate = `${year}/${month}/${day}`;

  // Get day of week abbreviation
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayOfWeek = daysOfWeek[date.getDay()];

  // Format time as "DDD, HH:MM"
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const formattedTime = `${hours}:${minutes}`;

  return {
    date: formattedDate,
    time: formattedTime,
    day: dayOfWeek,
  };
};
