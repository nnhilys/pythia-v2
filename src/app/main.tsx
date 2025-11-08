import type { TabOption } from './tab'
import type { Control } from '@/control/type'
import { useMemo, useState } from 'react'
import { ChartMain } from '@/chart/main'
import { Card } from '@/components/ui/card'
import { ControlMain } from '@/control/main'
import { DEFAULT_CONTROL } from '@/control/type'
import { getCustomerData } from '@/lib/data/main'
import { AppSummary } from './summary'
import { AppTab } from './tab'

export function AppMain() {
  const customerData = useMemo(() => getCustomerData(), [])

  const [tab, setTab] = useState<TabOption>('bar')
  const [control, setControl] = useState<Control>(DEFAULT_CONTROL)

  return (
    <div className="w-screen h-screen flex flex-col gap-8 p-8">
      <AppSummary customerData={customerData} />
      <AppTab value={tab} onValueChange={setTab}>
        <Card className="flex flex-row w-full h-full p-4">
          <div className="w-3/4">
            <ChartMain customerData={customerData} control={control} />
          </div>
          <div className="w-1/4 flex flex-col gap-4">
            <ControlMain control={control} onChange={setControl} />
          </div>
        </Card>
      </AppTab>
    </div>
  )
}
