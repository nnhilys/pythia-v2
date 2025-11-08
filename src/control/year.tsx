import type { ReactElement } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function ControlYear(props: {
  years: number[]
  value: number
  onValueChange: (value: number) => void
}): ReactElement {
  const { years, value, onValueChange } = props
  return (
    <Select
      value={value.toString()}
      onValueChange={value => onValueChange(Number(value))}
    >
      <SelectTrigger className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="0">
          All
        </SelectItem>
        {years.map((year) => {
          return (
            <SelectItem key={year} value={year.toString()}>
              {year}
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}
