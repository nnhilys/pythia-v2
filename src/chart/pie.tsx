import type { ReactElement } from 'react'
import type { Control } from '@/control/type'
import type { CustomerData } from '@/lib/data/main'
import { useMemo } from 'react'
import { Pie, PieChart } from 'recharts'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { CHART_COLORS, checkAgeGroup } from './type'

export function ChartPie(props: {
  customerData: CustomerData
  control: Control
}): ReactElement {
  const { customerData, control } = props

  const { demographic, transactions } = customerData
  const { month = 0, year, quantitative, qualitative } = control

  const chartData = useMemo(() => {
    const countCustomers = new Map()
    demographic.forEach((customer) => {
      const customerTransactions = transactions.get(customer.id) ?? []

      const key = qualitative === 'dob'
        ? checkAgeGroup(customer.dob)
        : customer[qualitative]

      const count = countCustomers.get(key) ?? 0

      const filteredTransactions = customerTransactions.filter((transaction) => {
        const transactionYear = transaction.transactionDate.getFullYear()
        const transactionMonth = transaction.transactionDate.getMonth()
        return transactionYear === year && transactionMonth === month
      })

      if (quantitative === 'avenue') {
        const totalAvenue = filteredTransactions.reduce((acc, cur) => {
          return acc + cur.transactionAmount
        }, 0)
        countCustomers.set(key, count + totalAvenue)
        return
      }

      countCustomers.set(key, count + filteredTransactions.length)
    })

    return [...countCustomers.entries()].map(([key, value], index) => {
      return {
        qualitative: key,
        quantitative: value,
        fill: CHART_COLORS[index % CHART_COLORS.length],
      }
    })
  }, [qualitative, quantitative, month, year, demographic, transactions])

  const chartConfig = chartData.reduce((acc, cur, index) => {
    return {
      ...acc,
      [cur.qualitative]: {
        label: cur.qualitative,
        color: CHART_COLORS[index % CHART_COLORS.length],
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
        <Pie
          data={chartData}
          dataKey="quantitative"
          nameKey="qualitative"
          label
        />
        <ChartLegend
          content={<ChartLegendContent nameKey="qualitative" />}
          className="-translate-y-2 flex-wrap gap-4"
        />
      </PieChart>
    </ChartContainer>
  )
}
