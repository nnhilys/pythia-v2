import type { ReactElement } from 'react'
import type { CustomerData } from '@/lib/data/main'
import { ChartColumnBig, ChartLine, ChartPie, ChartScatter } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ChartSingleBar } from './single-bar'

export function ChartMain(props: { customerData: CustomerData }): ReactElement {
  const { customerData } = props
  return (
    <Tabs defaultValue="single-bar" className="w-full">
      <TabsList>
        <TabsTrigger value="single-bar">
          <ChartColumnBig />
        </TabsTrigger>
        <TabsTrigger value="pie">
          <ChartPie />
        </TabsTrigger>
        <TabsTrigger value="scatter">
          <ChartScatter />
        </TabsTrigger>
        <TabsTrigger value="line">
          <ChartLine />
        </TabsTrigger>
      </TabsList>
      <TabsContent value="single-bar">
        <ChartSingleBar customerData={customerData} />
      </TabsContent>
    </Tabs>
  )
}
