import type { ReactElement } from 'react'
import type { DateRange } from 'react-day-picker'
import type { Qualitative } from '@/control/qualitative'
import type { Quantitative } from '@/control/quantitative'
import type { CustomerData } from '@/lib/data/main'
import { useMemo, useState } from 'react'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { Card } from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { ControlDateRange } from '@/control/date-range'
import { ControlQualitative } from '@/control/qualitative'
import { ControlQuantitative } from '@/control/quantitative'

export function ChartSingleBar(props: { customerData: CustomerData }): ReactElement {
  const { demographic, transactions } = props.customerData

  const [qualitative, setQualitative] = useState<Qualitative>('dob')
  const [quantitative, setQuantitative] = useState<Quantitative>('transactions')
  const [dateRange, setDateRange] = useState<DateRange>()

  const chartData = useMemo(() => {
    const countCustomers = new Map()
    demographic.forEach((customer) => {
      // Get qualitative value for xAxis
      const key = qualitative === 'dob'
        ? checkAgeGroup(customer.dob)
        : customer[qualitative]

      // Calculate quantitative values from yAxis
      const customerTransactions = transactions.get(customer.id) ?? []
      const filteredTransactions = customerTransactions.filter((transaction) => {
        const transactionTime = transaction.transactionDate.getTime()
        const isInvalidTime = false
          || (dateRange?.from && transactionTime <= dateRange.from.getTime())
          || (dateRange?.to && transactionTime >= dateRange.to.getTime())
        return !isInvalidTime
      })

      const count = countCustomers.get(key) ?? 0

      if (quantitative === 'transactions') {
        countCustomers.set(key, count + filteredTransactions.length)
        return
      }

      if (quantitative === 'avenue') {
        const totalCustomerAvenue = filteredTransactions.reduce((acc, cur) => {
          return acc + cur.transactionAmount
        }, 0)
        countCustomers.set(key, count + totalCustomerAvenue)
        return
      }

      countCustomers.set(key, count + 1)
    })

    const data = [...countCustomers.entries()].map(([key, value]) => {
      return {
        qualitative: key,
        quantitative: quantitative === 'avenue'
          ? Math.round(value / 1000)
          : value,
      }
    })

    return data
  }, [qualitative, quantitative, dateRange, demographic, transactions])

  return (
    <Card className="flex flex-row p-4">
      <ChartContainer
        className="min-h-[200px] w-3/4"
        config={{
          quantitative: {
            label: getChartLabel(quantitative),
          },
        }}
      >
        <BarChart accessibilityLayer data={chartData}>
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
            fill="var(--chart-1)"
            radius={4}
          />
        </BarChart>
      </ChartContainer>
      <div className="w-1/4 flex flex-col gap-4">
        <ControlDateRange
          value={dateRange}
          onValueChange={setDateRange}
        />
        <ControlQuantitative
          value={quantitative}
          onValueChange={setQuantitative}
        />
        <ControlQualitative
          value={qualitative}
          onValueChange={setQualitative}
        />
      </div>
    </Card>
  )
}

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

function getChartLabel(key: Quantitative): string {
  switch (key) {
    // Quantitative labels
    case 'transactions':
      return 'Transactions'
    case 'avenue':
      return 'Avenue'
    case 'customers':
      return 'Customers'
    default:
      return ''
  }
}
