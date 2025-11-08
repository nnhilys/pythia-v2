import type { ReactElement } from 'react'
import type { ChartData } from './type'
import type { Control } from '@/control/type'
import type { CustomerData } from '@/lib/data/main'
import { useMemo } from 'react'
import { TabsContent } from '@/components/ui/tabs'
import { ChartBar } from './bar'
import { ChartPie } from './pie'
import { checkAgeGroup } from './type'

export function ChartMain(props: {
  customerData: CustomerData
  control: Control
}): ReactElement {
  const { customerData, control } = props

  const { demographic, transactions } = customerData
  const { dateRange, quantitative, qualitative } = control

  const chartData: ChartData = useMemo(() => {
    const countCustomers = new Map()
    demographic.forEach((customer) => {
      // Get qualitative value for xAxis
      const key = qualitative === 'dob'
        ? checkAgeGroup(customer.dob)
        : customer[qualitative]

      // Calculate quantitative values from yAxis
      const count = countCustomers.get(key) ?? 0

      if (quantitative === 'customers') {
        countCustomers.set(key, count + 1)
        return
      }

      const customerTransactions = transactions.get(customer.id) ?? []
      const filteredTransactions = customerTransactions.filter((transaction) => {
        const transactionTime = transaction.transactionDate.getTime()
        const isInvalidTime = false
          || (dateRange?.from && transactionTime <= dateRange.from.getTime())
          || (dateRange?.to && transactionTime >= dateRange.to.getTime())
        return !isInvalidTime
      })

      if (quantitative === 'transactions') {
        countCustomers.set(key, count + filteredTransactions.length)
        return
      }

      const totalCustomerAvenue = filteredTransactions.reduce((acc, cur) => {
        return acc + cur.transactionAmount
      }, 0)
      countCustomers.set(key, count + totalCustomerAvenue)
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
    <>
      <TabsContent value="bar">
        <ChartBar data={chartData} quantitative={quantitative} />
      </TabsContent>
      <TabsContent value="pie">
        <ChartPie data={chartData} />
      </TabsContent>
    </>
  )
}
