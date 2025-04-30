import { DateAndTime } from "@/utils/get-date-and-time-column";
import { FC } from "react";

export const DateAndTimeCell: FC<DateAndTime> = ({ date, time }) => {
  return (
    <div className="translate-y-px">
      <div className="text-xs">{date}</div>
      <div className="text-[0.625rem] text-gray-400">{time}</div>
    </div>
  );
};
