import type { ReactElement } from 'react'
import type { CustomerData } from '@/lib/data/main'
import { Card } from '@/components/ui/card'
import { currencyFormatter, numberFormatter } from '@/lib/number'

export function AppSummary(props: { customerData: CustomerData }): ReactElement {
  const { totalCustomers, totalTransactions, totalAvenue } = props.customerData

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
