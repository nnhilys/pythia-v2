import type { ReactElement } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export type Quantitative = 'transactions' | 'avenue' | 'customers'

export function ControlQuantitative(props: {
  value: Quantitative
  onValueChange: (value: Quantitative) => void
}): ReactElement {
  const { value, onValueChange } = props
  return (
    <Select
      value={value}
      onValueChange={value => onValueChange(value as Quantitative)}
    >
      <SelectTrigger className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="transactions">
          Number of Transactions
        </SelectItem>
        <SelectItem value="avenue">
          Total avenue (K)
        </SelectItem>
        <SelectItem value="customers">
          Number of customers
        </SelectItem>
      </SelectContent>
    </Select>
  )
}
