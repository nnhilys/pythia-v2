import type { ReactElement } from 'react'
import type { CustomerData } from '@/lib/data/main'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { currencyFormatter, dateFormatter } from '@/lib/number'

export function TableTransactions(props: { customerData: CustomerData }): ReactElement {
  const { transactions } = props.customerData
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Customer ID</TableHead>
          <TableHead className="w-[200px]">Date</TableHead>
          <TableHead>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...transactions.values()].slice(0, 3).flatMap((customerTransactions) => {
          return customerTransactions.map((transaction) => {
            return (
              <TableRow key={Object.values(transaction).join('/')}>
                <TableCell className="font-medium">
                  {transaction.customerId}
                </TableCell>
                <TableCell>
                  {dateFormatter.format(transaction.transactionDate)}
                </TableCell>
                <TableCell>
                  {currencyFormatter.format(transaction.transactionAmount)}
                </TableCell>
              </TableRow>
            )
          })
        })}
      </TableBody>
    </Table>
  )
}
