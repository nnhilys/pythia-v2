import type { DateRange } from 'react-day-picker'
import type { Demographic } from '@/lib/data/main'

export type Qualitative = keyof Demographic

export type Quantitative = 'transactions' | 'avenue' | 'customers'

export interface Control {
  dateRange: DateRange | undefined
  qualitative: Qualitative
  quantitative: Quantitative
}

export const DEFAULT_CONTROL: Control = {
  dateRange: undefined,
  qualitative: 'dob',
  quantitative: 'transactions',
}
