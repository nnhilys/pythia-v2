import type { Quantitative } from '@/control/type'

export type ChartData = { qualitative: string, quantitative: number }[]

type AgeGroup = 'Child' | 'Young Adult' | 'Adult' | 'Middle Age' | 'Elder'

export function checkAgeGroup(dob: Date): AgeGroup {
  const age = new Date().getFullYear() - dob.getFullYear()
  if (age < 18)
    return 'Child'
  if (age < 26)
    return 'Young Adult'
  if (age < 46)
    return 'Adult'
  if (age < 66)
    return 'Middle Age'
  return 'Elder'
}

export function getChartLabel(key: Quantitative): string {
  switch (key) {
    // Quantitative labels
    case 'transactions':
      return 'Transactions'
    case 'avenue':
      return 'Avenue'
    case 'customers':
      return 'Customers'
    default:
      return ''
  }
}
