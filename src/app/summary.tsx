import type { ReactElement } from 'react'
import type { Demographic, Transaction } from '@/lib/data/main'
import { Card } from '@/components/ui/card'

export function AppSummary(props: {
  demographic: Demographic[]
  transactions: Transaction[]
}): ReactElement {
  const { demographic, transactions } = props

  const numberFormatter = new Intl.NumberFormat('en-EN', { maximumFractionDigits: 2 })
  const currencyFormatter = new Intl.NumberFormat('en-EN', { style: 'currency', currency: 'USD' })

  const totalCustomers = demographic.length
  const totalTransactions = transactions.length
  const totalAvenue = transactions.reduce((acc, cur) => acc + cur.transactionAmount, 0)
  const transactionsPerCustomer = totalTransactions / totalCustomers
  const avenuePerCustomer = totalAvenue / totalCustomers

  const summary = [
    {
      id: 'total_customers',
      label: 'Total Customers',
      value: numberFormatter.format(totalCustomers),
    },
    {
      id: 'total_transactions',
      label: 'Total Transactions',
      value: numberFormatter.format(totalTransactions),
    },
    {
      id: 'total_avenue',
      label: 'Total Avenue',
      value: currencyFormatter.format(totalAvenue),
    },
    {
      id: 'transactions_per_customer',
      label: 'Transactions per Customer',
      value: numberFormatter.format(transactionsPerCustomer),
    },
    {
      id: 'avenue_per_customer',
      label: 'Avenue per Customer',
      value: currencyFormatter.format(avenuePerCustomer),
    },
  ]

  return (
    <div className="w-full flex flex-wrap justify-center gap-4">
      {summary.map(({ id, label, value }) => {
        return (
          <Card
            key={id}
            className="p-4 gap-2 flex flex-col items-center justify-between"
          >
            <div className="text-sm text-gray-500">{label}</div>
            <div className="text-xl font-semibold">
              {value}
            </div>
          </Card>
        )
      })}
    </div>
  )
}
