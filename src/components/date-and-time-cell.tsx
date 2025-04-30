import { DateAndTime } from "@/utils/get-date-and-time-column";
import { FC } from "react";

export const DateAndTimeCell: FC<DateAndTime> = ({ date, time, day }) => {
  return (
    <div className="flex flex-col items-start justify-center">
      <div className="text-xs">{date}</div>
      <div className="text-[0.625rem] text-gray-400">
        {day}, {time}
      </div>
    </div>
  );
};
