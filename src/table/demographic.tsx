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
import { currencyFormatter, dateFormatter, numberFormatter } from '@/lib/number'

export function TableDemographic(props: { customerData: CustomerData }): ReactElement {
  const { demographic, transactions } = props.customerData
  return (
    <Table className="h-full overflow-auto">
      <TableHeader className="sticky top-0 bg-white shadow">
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Date Of Birth</TableHead>
          <TableHead>Gender</TableHead>
          <TableHead>Country</TableHead>
          <TableHead>City</TableHead>
          <TableHead>Job Title</TableHead>
          <TableHead>Job Industry</TableHead>
          <TableHead>Wealth Segment</TableHead>
          <TableHead className="text-center">Number of Transactions</TableHead>
          <TableHead className="text-right">Total Avenue</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...demographic.values()].map((customer) => {
          const customerTransactions = transactions.get(customer.id) ?? []
          const totalAvenue = customerTransactions.reduce((acc, cur) => {
            return acc + cur.transactionAmount
          }, 0)
          return (
            <TableRow key={customer.id}>
              <TableCell className="font-medium">{customer.id}</TableCell>
              <TableCell>{dateFormatter.format(customer.dob)}</TableCell>
              <TableCell>{customer.gender}</TableCell>
              <TableCell>{customer.country}</TableCell>
              <TableCell>{customer.city}</TableCell>
              <TableCell>{customer.jobTitle}</TableCell>
              <TableCell>{customer.jobIndustry}</TableCell>
              <TableCell>{customer.wealthSegment}</TableCell>
              <TableCell className="text-center">
                {numberFormatter.format(customerTransactions.length)}
              </TableCell>
              <TableCell className="text-right">
                {currencyFormatter.format(totalAvenue)}
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
