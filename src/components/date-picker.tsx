"use client"
import { useTranslations } from "next-intl"
import * as React from "react"
import { ChevronDownIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps {

  defaultValue?: Date;
  onValueChange?: (value?: Date) => void,
  className?: string;
  disbaleEmptyDate?: boolean
}

const DatePicker: React.FC<DatePickerProps> = ({ onValueChange, defaultValue, className, disbaleEmptyDate = false }) => {

  const [open, setOpen] = React.useState(false)
  const t = useTranslations("statistics");
  const [date, setDate] = React.useState<Date | undefined>(defaultValue) ; 
  
  React.useEffect(() => {
    onValueChange && onValueChange(date)
  }, [date]);

  return (
    <div className="flex flex-col gap-3 ">

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-48 justify-between font-normal w-full"
          >
            {date ? date.toLocaleDateString() : t("date_picker")}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              if ((disbaleEmptyDate && date == undefined))
                return;
              setDate(date)
              setOpen(false)
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}



export {
  DatePicker
}