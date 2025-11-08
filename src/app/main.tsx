import { getReadonlyCustomerData } from '@/lib/data/main'
import { AppSummary } from './summary'

export function AppMain() {
  const { demographic, transactions } = getReadonlyCustomerData()

  return (
    <div className="w-screen h-screen flex flex-col gap-8 p-8">
      <AppSummary demographic={demographic} transactions={transactions} />
    </div>
  )
}
