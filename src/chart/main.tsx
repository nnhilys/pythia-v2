import type { ReactElement } from 'react'
import type { CustomerData } from '@/lib/data/main'
import { ChartColumnBig, ChartLine, ChartPie, ChartScatter, Table } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { ChartSingleBar } from './single-bar'

export function ChartMain(props: { customerData: CustomerData }): ReactElement {
  const { customerData } = props
  return (
    <Tabs defaultValue="single-bar" className="w-full">
      <TabsList>
        <TabsTrigger value="single-bar">
          <ChartColumnBig />
        </TabsTrigger>
        <Tooltip>
          <TooltipTrigger>
            <TabsTrigger value="pie" disabled>
              <ChartPie />
            </TabsTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>TBA</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>
            <TabsTrigger value="scatter" disabled>
              <ChartScatter />
            </TabsTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>TBA</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>
            <TabsTrigger value="line" disabled>
              <ChartLine />
            </TabsTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>TBA</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>
            <TabsTrigger value="table" disabled>
              <Table />
            </TabsTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>TBA</p>
          </TooltipContent>
        </Tooltip>
      </TabsList>
      <TabsContent value="single-bar">
        <ChartSingleBar customerData={customerData} />
      </TabsContent>
    </Tabs>
  )
}
