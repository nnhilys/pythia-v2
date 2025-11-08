import type { ReactElement } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const MONTH = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

export function ControlMonth(props: {
  value: number | undefined
  onValueChange: (value: number) => void
}): ReactElement {
  const { value, onValueChange } = props
  return (
    <Select
      value={value !== undefined ? value.toString() : ''}
      onValueChange={value => onValueChange(Number(value))}
      disabled={value === undefined}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select month" />
      </SelectTrigger>
      <SelectContent>
        {Array.from({ length: 12 }).map((_, i) => {
          return (
          // eslint-disable-next-line react/no-array-index-key
            <SelectItem key={i} value={i.toString()}>
              {MONTH[i]}
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}
