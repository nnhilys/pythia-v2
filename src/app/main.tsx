import type { TabOption } from './tab'
import type { Control } from '@/control/type'
import { useMemo, useState } from 'react'
import { ChartMain } from '@/chart/main'
import { Card } from '@/components/ui/card'
import { ControlMain } from '@/control/main'
import { getCustomerData } from '@/lib/data/main'
import { TableMain } from '@/table/main'
import { AppSummary } from './summary'
import { AppTab } from './tab'

export function AppMain() {
  const customerData = useMemo(() => getCustomerData(), [])

  const [tab, setTab] = useState<TabOption>('bar')
  const [control, setControl] = useState<Control>({
    qualitative: 'dob',
    quantitative: 'transactions',
    year: customerData.years[0],
    month: undefined,
  })

  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col gap-8 p-8">
      <AppSummary customerData={customerData} />
      <AppTab
        value={tab}
        onValueChange={(value) => {
          setTab(value)
          if (value === 'bar')
            setControl({ ...control, month: undefined })
          if (value === 'pie')
            setControl({ ...control, month: 0 })
        }}
      >
        {tab.startsWith('table')
          ? (
              <Card className="w-full p-4 flex-1 overflow-auto">
                <TableMain customerData={customerData} />
              </Card>
            )
          : (
              <Card className="flex flex-row w-full p-4">
                <div className="w-3/4">
                  <ChartMain customerData={customerData} control={control} />
                </div>
                <div className="w-1/4 flex flex-col gap-4">
                  <ControlMain
                    years={customerData.years}
                    control={control}
                    onChange={setControl}
                  />
                </div>
              </Card>
            )}
      </AppTab>
    </div>
  )
}
