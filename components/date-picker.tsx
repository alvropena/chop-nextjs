"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import { useController, useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";

interface DatePickerProps {
  name: string;
}

export function DatePicker({ name }: DatePickerProps) {
  const { control } = useFormContext();
  const {
    field: { onChange, value },
  } = useController({
    name,
    control,
  });

  const [date, setDate] = React.useState<Date | undefined>(value);

  const handleDateChange = (selectedDate: Date) => {
    setDate(selectedDate);
    onChange(selectedDate);
  };
  const t = useTranslations("");
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>{t("Pick_date")}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onDayClick={handleDateChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
