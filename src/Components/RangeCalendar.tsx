import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
import { ptBR } from "date-fns/locale"
import { Button } from "../../@/components/ui/button";
import { Calendar } from "../../@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../@/components/ui/popover";
import { cn } from "../../@/lib/utils"
import { SetStateAction } from "react";
interface DatePickerProps {
  className?: React.HtmlHTMLAttributes<HTMLDivElement>;
  setDateRange : React.Dispatch<SetStateAction<DateRange|undefined>>;
  date : DateRange|undefined;
}
/**
 * @Summary Abstracao para calendario com a possibilidade de ter a data de inicio e de fim controladadas
 * @param param0 
 * @returns 
 */
export function DatePickerWithRange({className, date, setDateRange} : DatePickerProps) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "dd LLL, y", { locale : ptBR})} -{" "}
                  {format(date.to, "dd LLL, y", { locale : ptBR })}
                </>
              ) : (
                format(date.from, "dd LLL, y", { locale : ptBR })
              )
            ) : (
              <span>Selecione uma data</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            fromYear={21}
            locale={ptBR}
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDateRange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
    
  )
}
