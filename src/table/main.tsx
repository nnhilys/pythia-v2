import type { ReactElement } from 'react'
import type { CustomerData } from '@/lib/data/main'
import { TabsContent } from '@radix-ui/react-tabs'
import { TableDemographic } from './demographic'
import { TableTransactions } from './transactions'

export function TableMain(props: { customerData: CustomerData }): ReactElement {
  const { customerData } = props
  return (
    <>
      <TabsContent value="table-demographic">
        <TableDemographic customerData={customerData} />
      </TabsContent>
      <TabsContent value="table-transactions">
        <TableTransactions customerData={customerData} />
      </TabsContent>
    </>
  )
}
