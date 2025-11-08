import type { Demographic } from '@/lib/data/main'

export type Qualitative = keyof Demographic

export type Quantitative = 'transactions' | 'avenue'

export interface Control {
  qualitative: Qualitative
  quantitative: Quantitative
  year: number
  month: number | undefined
}
