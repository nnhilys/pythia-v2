import { ChartMain } from '@/chart/main'
import { getReadonlyCustomerData } from '@/lib/data/main'
import { AppSummary } from './summary'

export function AppMain() {
  const customerData = getReadonlyCustomerData()
  return (
    <div className="w-screen h-screen flex flex-col gap-8 p-8">
      <AppSummary customerData={customerData} />
      <ChartMain customerData={customerData} />
    </div>
  )
}
