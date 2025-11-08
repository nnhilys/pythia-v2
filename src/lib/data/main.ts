import _demographic from './demographic.csv'
import _transactions from './transactions.csv'

interface RawDemographic {
  id: string
  dob: string
  gender: string
  country: string
  city: string
  job_title: string
  job_industry: string
  wealth_segment: string
}

export interface Demographic {
  id: string
  dob: Date
  gender: string
  country: string
  city: string
  jobTitle: string
  jobIndustry: string
  wealthSegment: string
}

interface RawTransaction {
  customer_id: string
  transaction_date: string
  transaction_amount: string
}

export interface Transaction {
  customerId: string
  transactionDate: Date
  transactionAmount: number
}

export interface CustomerData {
  demographic: Map<string, Demographic>
  transactions: Map<string, Transaction[]>
  totalCustomers: number
  totalTransactions: number
  totalAvenue: number
  dateRange: { from: Date, to: Date }
}

export function getReadonlyCustomerData(): CustomerData {
  let totalCustomers = 0
  let totalTransactions = 0
  let totalAvenue = 0
  let fromDate: Date = new Date()
  let toDate: Date = new Date()

  const demographic = new Map<string, Demographic>();
  (_demographic as unknown as RawDemographic[]).forEach((row) => {
    demographic.set(row.id, {
      id: row.id,
      dob: new Date(row.dob),
      gender: row.gender,
      country: row.country,
      city: row.city,
      jobTitle: row.job_title,
      jobIndustry: row.job_industry,
      wealthSegment: row.wealth_segment,
    })
    totalCustomers++
  })

  const transactions = new Map<string, Transaction[]>();
  (_transactions as unknown as RawTransaction[]).forEach((row) => {
    const key = row.customer_id
    const cur = transactions.get(key) ?? []
    const next = {
      customerId: row.customer_id,
      transactionDate: new Date(row.transaction_date),
      transactionAmount: Number(row.transaction_amount),
    }
    transactions.set(key, [...cur, next])
    totalTransactions++
    totalAvenue += next.transactionAmount
    const transactionTime = next.transactionDate.getTime()
    if (fromDate.getTime() > transactionTime)
      fromDate = next.transactionDate
    if (toDate.getTime() < transactionTime)
      toDate = next.transactionDate
  })

  return {
    demographic,
    transactions,
    totalCustomers,
    totalTransactions,
    totalAvenue,
    dateRange: { from: fromDate, to: toDate },
  }
}
