import type { ReactElement } from 'react'
import type { ChartConfig } from '@/components/ui/chart'
import type { Control } from '@/control/type'
import type { CustomerData } from '@/lib/data/main'
import { useMemo } from 'react'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { dateFormatter } from '@/lib/number'
import { CHART_COLORS, checkAgeGroup } from './type'

export function ChartBar(props: {
  customerData: CustomerData
  control: Control
}): ReactElement {
  const { customerData, control } = props

  const { demographic, transactions } = customerData
  const { year, quantitative, qualitative } = control

  const chartData = useMemo(() => {
    const countCustomers = new Map()
    transactions.forEach((customerTransactions) => {
      const customer = demographic.get(customerTransactions[0].customerId)
      if (!customer)
        return

      customerTransactions.forEach((transaction) => {
        const transactionYear = transaction.transactionDate.getFullYear()
        if (transactionYear !== year) {
          return
        }

        // Get month value for xAxis
        const key = transaction.transactionDate.getMonth()

        // Calculate quantitative values from yAxis

        const value: Record<string, string> = countCustomers.get(key)
          ?? { month: dateFormatter.format(transaction.transactionDate) }
        const customerQualitative = qualitative === 'dob'
          ? checkAgeGroup(customer.dob)
          : customer[qualitative]
        const count = value[customerQualitative] ?? 0

        if (quantitative === 'avenue') {
          countCustomers.set(key, {
            ...value,
            [customerQualitative]: Number(count) + transaction.transactionAmount,
          })
          return
        }

        countCustomers.set(key, { ...value, [customerQualitative]: count + 1 })
      })
    })

    return [...countCustomers.entries()].sort(([a], [b]) => a - b).map(([_, value]) => value)
  }, [qualitative, quantitative, year, demographic, transactions])

  const categories = Object.keys(chartData[0]).filter(key => key !== 'month')

  const chartConfig: ChartConfig = categories.reduce((acc, category) => {
    return {
      ...acc,
      [category]: {
        label: category,
      },
    }
  }, {})

  return (
    <ChartContainer className="min-h-[200px]" config={chartConfig}>
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        {categories.map((qualitative, index) => {
          return (
            <Bar
              key={qualitative}
              dataKey={qualitative}
              fill={CHART_COLORS[index % CHART_COLORS.length]}
              radius={4}
            />
          )
        })}
      </BarChart>
    </ChartContainer>
  )
}
