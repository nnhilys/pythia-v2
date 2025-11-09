import type { ReactElement } from 'react'
import type { CustomerData } from '@/lib/data/main'
import { useVirtualizer } from '@tanstack/react-virtual'
import { useMemo, useRef } from 'react'
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { currencyFormatter, dateFormatter, numberFormatter } from '@/lib/number'

export function TableDemographic(props: { customerData: CustomerData }): ReactElement {
  const { demographic, transactions } = props.customerData

  const customers = useMemo(() => {
    return [...demographic.values()]
  }, [demographic])

  const parentRef = useRef(null)

  const rowVirtualizer = useVirtualizer({
    count: customers.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 36,
    overscan: 5,
  })

  return (
    <div className="overflow-auto flex-1 w-full" ref={parentRef}>
      <table className="w-full h-full caption-bottom text-sm table-fixed">
        <TableHeader className="sticky top-0 bg-white shadow z-10">
          <TableRow>
            <TableHead className="w-24">ID</TableHead>
            <TableHead className="w-40">Date Of Birth</TableHead>
            <TableHead className="w-24">Gender</TableHead>
            <TableHead className="w-32">Country</TableHead>
            <TableHead className="w-36">City</TableHead>
            <TableHead className="w-42">Job Title</TableHead>
            <TableHead className="w-36">Job Industry</TableHead>
            <TableHead className="w-36">Wealth Segment</TableHead>
            <TableHead className="w-32 text-center">Transactions</TableHead>
            <TableHead className="w-36 text-center">Total Avenue</TableHead>
            <TableHead className="w-full"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody
          className="relative"
          style={{ height: rowVirtualizer.getTotalSize() }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const customer = customers[virtualRow.index]
            const customerTransactions = transactions.get(customer.id) ?? []
            const totalAvenue = customerTransactions.reduce((acc, cur) => {
              return acc + cur.transactionAmount
            }, 0)
            return (
              <TableRow
                key={virtualRow.index}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <TableCell className="w-24 font-medium">{customer.id}</TableCell>
                <TableCell className="w-40">{dateFormatter.format(customer.dob)}</TableCell>
                <TableCell className="w-24">{customer.gender}</TableCell>
                <TableCell className="w-32">{customer.country}</TableCell>
                <TableCell className="w-36">{customer.city}</TableCell>
                <TableCell className="w-42">{customer.jobTitle}</TableCell>
                <TableCell className="w-36">{customer.jobIndustry}</TableCell>
                <TableCell className="w-36">{customer.wealthSegment}</TableCell>
                <TableCell className="w-32 text-center">
                  {numberFormatter.format(customerTransactions.length)}
                </TableCell>
                <TableCell className="w-36 text-center">
                  {currencyFormatter.format(totalAvenue)}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </table>
    </div>
  )
}
