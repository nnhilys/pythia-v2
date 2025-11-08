import type { ReactElement } from 'react'
import type { ChartData } from './type'
import type {
  ChartConfig,
} from '@/components/ui/chart'
import { Pie, PieChart } from 'recharts'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { CHART_COLORS } from './type'

export function ChartPie(props: { data: ChartData }): ReactElement {
  const { data } = props

  const chartData = data.map((cur, index) => {
    return { ...cur, fill: CHART_COLORS[index % CHART_COLORS.length] }
  })

  const chartConfig: ChartConfig = data.reduce((acc, cur) => {
    return {
      ...acc,
      [cur.qualitative]: {
        label: cur.qualitative,
      },
    }
  }, {})

  return (
    <ChartContainer
      config={chartConfig}
      className="h-full"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie data={chartData} dataKey="quantitative" nameKey="qualitative" />
        <ChartLegend
          content={<ChartLegendContent nameKey="qualitative" />}
          className="-translate-y-2 flex-wrap gap-4"
        />
      </PieChart>
    </ChartContainer>
  )
}
