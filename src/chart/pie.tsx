import type { ReactElement } from 'react'
import type { ChartData } from './type'
import type {
  ChartConfig,
} from '@/components/ui/chart'
import { Pie, PieChart } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

const colors = [
  '#4E79A7',
  '#F28E2B',
  '#E15759',
  '#76B7B2',
  '#59A14F',
  '#EDC948',
  '#B07AA1',
  '#FF9DA7',
  '#9C755F',
  '#BAB0AC',
]

export function ChartPie(props: { data: ChartData }): ReactElement {
  const { data } = props

  const chartData = data.map((cur, index) => {
    return { ...cur, fill: colors[index % 10] }
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
      </PieChart>
    </ChartContainer>
  )
}
