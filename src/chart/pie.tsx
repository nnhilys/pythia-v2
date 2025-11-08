import type { ReactElement } from 'react'
import type { Control } from '@/control/type'
import type { CustomerData } from '@/lib/data/main'
import { useMemo } from 'react'
import { Pie, PieChart } from 'recharts'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart'
import { currencyFormatter, numberFormatter } from '@/lib/number'
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

      const filteredTransactions = month === 0
        ? customerTransactions
        : customerTransactions.filter((transaction) => {
            const transactionYear = transaction.transactionDate.getFullYear()
            const transactionMonth = transaction.transactionDate.getMonth()
            return transactionYear === year && transactionMonth + 1 === month
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
        <Pie
          data={chartData}
          dataKey="quantitative"
          nameKey="qualitative"
          labelLine={false}
          label={({ payload, ...props }) => {
            return (
              <text
                cx={props.cx}
                cy={props.cy}
                x={props.x}
                y={props.y}
                textAnchor={props.textAnchor}
                dominantBaseline={props.dominantBaseline}
                fill="hsla(var(--foreground))"
              >
                {quantitative === 'avenue'
                  ? currencyFormatter.format(payload.quantitative)
                  : numberFormatter.format(payload.quantitative)}
              </text>
            )
          }}
        />
        <ChartLegend
          content={<ChartLegendContent nameKey="qualitative" />}
          className="-translate-y-2 flex-wrap gap-4"
        />
      </PieChart>
    </ChartContainer>
  )
}
