import type { ReactElement } from 'react'
import type { ChartData } from './type'
import type { ChartConfig } from '@/components/ui/chart'
import type { Quantitative } from '@/control/type'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { CHART_COLORS, getChartLabel } from './type'

export function ChartBar(props: {
  data: ChartData
  quantitative: Quantitative
}): ReactElement {
  const { data, quantitative } = props

  const chartConfig: ChartConfig = {
    quantitative: {
      label: getChartLabel(quantitative),
    },
  }

  return (
    <ChartContainer className="min-h-[200px]" config={chartConfig}>
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid />
        <XAxis
          dataKey="qualitative"
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          dataKey="quantitative"
          tickLine={false}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent hideIndicator />} />
        <Bar
          dataKey="quantitative"
          fill={CHART_COLORS[0]}
          radius={4}
        />
      </BarChart>
    </ChartContainer>
  )
}
