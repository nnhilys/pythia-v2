import type { ReactElement } from 'react'
import type { CustomerData } from '@/lib/data/main'
import { useVirtualizer } from '@tanstack/react-virtual'
import { useMemo, useRef } from 'react'
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { currencyFormatter, dateFormatter } from '@/lib/number'

export function TableTransactions(props: { customerData: CustomerData }): ReactElement {
  const { transactions } = props.customerData

  const flattenTransactions = useMemo(() => {
    return [...transactions.values()].flat()
  }, [transactions])

  const parentRef = useRef(null)

  const rowVirtualizer = useVirtualizer({
    count: flattenTransactions.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 36,
    overscan: 5,
  })

  return (
    <div className="overflow-auto flex-1 w-full" ref={parentRef}>
      <table className="w-full h-full caption-bottom text-sm table-fixed">
        <TableHeader className="sticky top-0 bg-white shadow z-10">
          <TableRow>
            <TableHead className="w-52 max-w-52">Customer ID</TableHead>
            <TableHead className="w-52 max-w-52">Date</TableHead>
            <TableHead className="w-52 max-w-52 text-center">Amount</TableHead>
            {/* Empty head to fill the rest of the table's width */}
            <TableHead className="w-full"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody
          className="relative"
          style={{ height: rowVirtualizer.getTotalSize() }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const transaction = flattenTransactions[virtualRow.index]
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
                <TableCell className="w-52 font-medium">
                  {transaction.customerId}
                </TableCell>
                <TableCell className="w-52">
                  {dateFormatter.format(transaction.transactionDate)}
                </TableCell>
                <TableCell className="w-52 text-center">
                  {currencyFormatter.format(transaction.transactionAmount)}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </table>
    </div>
  )
}
