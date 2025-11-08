import type { ReactElement } from 'react'
import type { ChartConfig } from '@/components/ui/chart'
import type { CustomerData } from '@/lib/data/main'
import { useState } from 'react'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { Card } from '@/components/ui/card'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type AgeGroup = 'Child' | 'Young Adult' | 'Adult' | 'Middle Age' | 'Elder'
function checkAgeGroup(dob: Date): AgeGroup {
  const age = new Date().getFullYear() - dob.getFullYear()
  if (age < 18)
    return 'Child'
  if (age < 26)
    return 'Young Adult'
  if (age < 46)
    return 'Adult'
  if (age < 66)
    return 'Middle Age'
  return 'Elder'
}

interface Count { transactions: number, avenue: number, customers: number }
const defaultCount: Count = { transactions: 0, avenue: 0, customers: 0 }

export function ChartSingleBar(props: { customerData: CustomerData }): ReactElement {
  const { demographic, transactions } = props.customerData

  const [chartType, setChartType] = useState('transactions')

  const countCustomersByAge = new Map<AgeGroup, Count>()
  demographic.forEach((customer) => {
    const ageGroup = checkAgeGroup(customer.dob)

    const customerTransactions = transactions.get(customer.id) ?? []
    const totalCustomerTransactions = customerTransactions.length
    const totalCustomerAvenue = customerTransactions.reduce((acc, cur) => {
      return acc + cur.transactionAmount
    }, 0)

    const count = countCustomersByAge.get(ageGroup) ?? defaultCount

    countCustomersByAge.set(ageGroup, {
      transactions: count.transactions + totalCustomerTransactions,
      avenue: count.avenue + totalCustomerAvenue,
      customers: count.customers + 1,
    })
  })

  const chartData = [...countCustomersByAge.entries()].map(([key, value]) => {
    return {
      ageGroup: key,
      transactions: value.transactions,
      avenue: Math.round(value.avenue / 1000),
      customers: value.customers,
    }
  })

  const chartConfig: ChartConfig = {
    transactions: {
      label: 'Number of Transactions',
      color: 'var(--chart-1)',
    },
    avenue: {
      label: 'Total avenue (K)',
      color: 'var(--chart-2)',
    },
    customers: {
      label: 'Number of customers',
      color: 'var(--chart-3)',
    },
  }

  return (
    <Card className="flex flex-row p-4">
      <ChartContainer config={chartConfig} className="min-h-[200px] w-3/4">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid />
          <XAxis
            dataKey="ageGroup"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <YAxis
            dataKey={chartType}
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          {chartType === 'transactions' && (
            <Bar
              dataKey="transactions"
              fill="var(--color-transactions)"
              radius={4}
            />
          )}
          {chartType === 'avenue' && (
            <Bar
              dataKey="avenue"
              fill="var(--color-avenue)"
              radius={4}
            />
          )}
          {chartType === 'customers' && (
            <Bar
              dataKey="customers"
              fill="var(--color-customers)"
              radius={4}
            />
          )}
          <ChartLegend content={<ChartLegendContent />} />
        </BarChart>
      </ChartContainer>
      <div className="w-1/4">
        <Select value={chartType} onValueChange={value => setChartType(value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="transactions">
              Number of Transactions
            </SelectItem>
            <SelectItem value="avenue">
              Total avenue (K)
            </SelectItem>
            <SelectItem value="customers">
              Number of customers
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </Card>
  )
}
