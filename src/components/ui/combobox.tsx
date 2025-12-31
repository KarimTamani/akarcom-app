"use client"

import * as React from "react"
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import LongText from "../long-text"
import { Spinner } from "./spinner"



interface ComboboxProps {
  items: any[]
  label?: string;
  placeholder?: string;
  selectedItem?: string;
  onSelectionChange?: (id: string) => void;
  onQueryChange?: (query: string) => void;
  className?: string;
  isDisabled?: boolean;
  isLoading?: boolean;

  onBlur?: any
}


export const Combobox = (props: ComboboxProps) => {

  const { items, label = "label", placeholder, onSelectionChange, selectedItem, className, isDisabled, onQueryChange, isLoading, onBlur } = props;
  const [query, setQuery] = React.useState<string>("");
  const ref = React.useRef<HTMLDivElement>(null);
  const [width, setWidth] = React.useState<number | undefined>(undefined);

  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState<string | undefined>("")



  React.useEffect(() => {
    setValue(selectedItem);
  }, [selectedItem]);




  React.useEffect(() => {
    if (open)
      setQuery("");
  }, [open])


  React.useEffect(() => {
    if (!ref.current) {
      return;
    }

    const resizeObserver = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width + 28);
    });

    resizeObserver.observe(ref.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, []);


  React.useEffect(() => {
    onQueryChange && onQueryChange(query);
  }, [query])


  return (

    <Popover open={open} onOpenChange={setOpen} >
      <PopoverTrigger asChild disabled={isDisabled} ref={ref as any} >

        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("justify-between w-full truncate whitespace-nowrap", className)}
          onBlur={onBlur}
        >
          {value
            ? <LongText>{value}</LongText>
            : (placeholder ? placeholder : "Select items...")}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="!p-0 !m-0 " style={{
        width
      }} >
        <Command

          filter={onQueryChange ? (value, search) => {
            return 1
          } : undefined}
        >
          <CommandInput placeholder={placeholder ? placeholder : "Select items..."}
            onValueChange={setQuery}
          />
          <CommandList>
            {isLoading ? <div className="w-full flex items-center justify-center py-4">
              <Spinner className="stroke-primary w-6 h-6" />
            </div>
              : <>
                <CommandEmpty></CommandEmpty>
                <CommandGroup>
                  {items.map((item) => (
                    <CommandItem
                      key={item.id}
                      value={item.id}
                      onSelect={(currentValue) => {
                        setValue(currentValue);
                        onSelectionChange && onSelectionChange(currentValue as string);

                        setOpen(false)
                      }}
                    >
                      <CheckIcon
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === item.id ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {item[label]}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            }
          </CommandList>
        </Command>
      </PopoverContent>

    </Popover>

  )
}