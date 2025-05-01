"use client";

import { Button } from "@/components/shadcn/button";
import { Calendar } from "@/components/shadcn/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn/popover";
import { ScrollArea, ScrollBar } from "@/components/shadcn/scroll-area";
import { DateAndTime } from "@/utils/get-date-and-time-column";
import { formatDateAndTime } from "@/utils/format-date-and-time";
import { FC, useCallback, useState } from "react";

interface DateAndTimePickerProps {
  value: string;
  onChange: (props: string) => void;
  field: FC<DateAndTime>;
}

export const DateAndTimePicker: FC<DateAndTimePickerProps> = ({
  value,
  onChange,
  field: Field,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDateChange = useCallback(
    (newDate: Date | undefined) => {
      if (!newDate) return;
      const date = new Date(value);
      date.setFullYear(newDate.getFullYear());
      date.setMonth(newDate.getMonth());
      date.setDate(newDate.getDate());
      onChange(date.toISOString());
    },
    [value, onChange],
  );

  const handleTimeChange = useCallback(
    (type: "hour" | "minute" | "second", newTime: number) => {
      const date = new Date(value);
      if (type === "hour") date.setHours(newTime);
      else if (type === "minute") date.setMinutes(newTime);
      else if (type === "second") date.setSeconds(newTime);
      onChange(date.toISOString());
    },
    [value, onChange],
  );

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger className="size-full cursor-pointer outline-none">
        <Field {...formatDateAndTime(value)} />
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-0">
        <div className="sm:flex">
          <Calendar
            mode="single"
            selected={new Date(value)}
            onSelect={handleDateChange}
            initialFocus
          />
          <div className="flex flex-col divide-y sm:h-[300px] sm:flex-row sm:divide-x sm:divide-y-0">
            <ScrollArea className="w-64 sm:w-auto">
              <div className="flex p-2 sm:flex-col">
                {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                  <Button
                    key={hour}
                    size="icon"
                    variant={
                      new Date(value).getHours() === hour ? "default" : "ghost"
                    }
                    className="aspect-square shrink-0 sm:w-full"
                    onClick={() => handleTimeChange("hour", hour)}
                  >
                    {hour.toString().padStart(2, "0")}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="sm:hidden" />
            </ScrollArea>
            <ScrollArea className="w-64 sm:w-auto">
              <div className="flex p-2 sm:flex-col">
                {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
                  <Button
                    key={minute}
                    size="icon"
                    variant={
                      new Date(value).getMinutes() === minute
                        ? "default"
                        : "ghost"
                    }
                    className="aspect-square shrink-0 sm:w-full"
                    onClick={() => handleTimeChange("minute", minute)}
                  >
                    {minute.toString().padStart(2, "0")}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="sm:hidden" />
            </ScrollArea>
            <ScrollArea className="w-64 sm:w-auto">
              <div className="flex p-2 sm:flex-col">
                {Array.from({ length: 60 }, (_, i) => i).map((second) => (
                  <Button
                    key={second}
                    size="icon"
                    variant={
                      new Date(value).getSeconds() === second
                        ? "default"
                        : "ghost"
                    }
                    className="aspect-square shrink-0 sm:w-full"
                    onClick={() => handleTimeChange("second", second)}
                  >
                    {second.toString().padStart(2, "0")}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="sm:hidden" />
            </ScrollArea>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
