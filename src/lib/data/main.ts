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

export function getReadonlyCustomerData() {
  const demographic: Demographic[] = (_demographic as unknown as RawDemographic[]).map((row) => {
    return {
      id: row.id,
      dob: new Date(row.dob),
      gender: row.gender,
      country: row.country,
      city: row.city,
      jobTitle: row.job_title,
      jobIndustry: row.job_industry,
      wealthSegment: row.wealth_segment,
    }
  })

  const transactions: Transaction[] = (_transactions as unknown as RawTransaction[]).map((row) => {
    return {
      customerId: row.customer_id,
      transactionDate: new Date(row.transaction_date),
      transactionAmount: Number(row.transaction_amount),
    }
  })

  return { demographic, transactions } as const
}
