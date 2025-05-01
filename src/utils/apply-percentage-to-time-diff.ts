export const applyPercentageToTimeDiff = (
  timeDiff: string,
  percentage: number,
): string => {
  // Split the time diff string into days and time
  const [daysStr, timeStr] = timeDiff.split(" ");
  const days = parseInt(daysStr.replace("d", ""), 10); // Extract days and convert to integer
  const [hours, minutes] = timeStr.split(":").map((num) => parseInt(num, 10)); // Extract hours and minutes

  // Convert the entire time diff to minutes (days to minutes + hours + minutes)
  const totalMinutes = days * 24 * 60 + hours * 60 + minutes;

  // Apply the percentage to the total minutes
  const newTotalMinutes = totalMinutes * (percentage / 100);

  // Calculate the new days, hours, and minutes
  const newDays = Math.floor(newTotalMinutes / (24 * 60));
  const remainingMinutes = newTotalMinutes % (24 * 60);
  const newHours = Math.floor(remainingMinutes / 60);
  const newMinutes = Math.floor(remainingMinutes % 60);

  // Return the new formatted time diff string
  return `${String(newDays).padStart(2, "0")}d ${String(newHours).padStart(2, "0")}:${String(newMinutes).padStart(2, "0")}`;
};
