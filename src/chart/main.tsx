import type { ReactElement } from 'react'
import type { Control } from '@/control/type'
import type { CustomerData } from '@/lib/data/main'
import { TabsContent } from '@/components/ui/tabs'
import { ChartBar } from './bar'
import { ChartPie } from './pie'

export function ChartMain(props: {
  customerData: CustomerData
  control: Control
}): ReactElement {
  const { customerData, control } = props
  return (
    <>
      <TabsContent value="bar">
        <ChartBar customerData={customerData} control={control} />
      </TabsContent>
      <TabsContent value="pie">
        <ChartPie customerData={customerData} control={control} />
      </TabsContent>
    </>
  )
}
