import type { ReactElement } from 'react'
import type { CustomerData } from '@/lib/data/main'
import { ChartColumnBig, ChartLine, ChartPie, ChartScatter, Table } from 'lucide-react'
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
        <TabsTrigger value="pie" disabled>
          <ChartPie />
        </TabsTrigger>
        <TabsTrigger value="scatter" disabled>
          <ChartScatter />
        </TabsTrigger>
        <TabsTrigger value="line" disabled>
          <ChartLine />
        </TabsTrigger>
        <TabsTrigger value="table" disabled>
          <Table />
        </TabsTrigger>
      </TabsList>
      <TabsContent value="single-bar">
        <ChartSingleBar customerData={customerData} />
      </TabsContent>
    </Tabs>
  )
}
