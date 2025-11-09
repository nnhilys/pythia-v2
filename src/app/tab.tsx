import type { ReactElement } from 'react'
import { ChartColumnBig, ChartPie, Table, User } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

export type TabOption = 'bar' | 'pie' | 'scatter' | 'line' | 'table-transactions' | 'table-demographic'

export function AppTab(props: {
  children: ReactElement
  value: TabOption
  onValueChange: (value: TabOption) => void
}): ReactElement {
  const { children, value, onValueChange } = props

  return (
    <Tabs
      className="w-full flex-1 min-h-0"
      value={value}
      onValueChange={value => onValueChange(value as TabOption)}
    >
      <TabsList>
        <TabsTrigger value="bar">
          <ChartColumnBig />
        </TabsTrigger>
        <TabsTrigger value="pie">
          <ChartPie />
        </TabsTrigger>
        {/* <TabsTrigger value="scatter" disabled>
          <ChartScatter />
        </TabsTrigger> */}
        {/* <TabsTrigger value="line" disabled>
          <ChartLine />
        </TabsTrigger> */}
        <TabsTrigger value="table-demographic">
          <User />
        </TabsTrigger>
        <TabsTrigger value="table-transactions">
          <Table />
        </TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  )
}
