import type { ReactElement } from 'react'
import type { DateRange } from 'react-day-picker'
import { ChevronDownIcon } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

export function ControlDateRange(props: {
  value: DateRange | undefined
  onValueChange: (value: DateRange | undefined) => void
}): ReactElement {
  const { value, onValueChange } = props

  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          id="date"
          className={cn(
            'w-full justify-between font-normal',
            value === undefined && 'text-muted-foreground hover:text-muted-foreground',
          )}
        >
          {displayDateRange(value)}
          <ChevronDownIcon className="size-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="range"
          selected={value}
          captionLayout="dropdown"
          onSelect={onValueChange}
        />
      </PopoverContent>
    </Popover>
  )
}

function displayDateRange(range: DateRange | undefined): string {
  const display: string[] = []
  if (range?.from)
    display.push(range.from.toLocaleDateString())
  if (range?.to)
    display.push(range.to.toLocaleDateString())
  return display.length > 0 ? display.join(' - ') : 'Select date'
}
