import type { ReactElement } from 'react'
import type { Control } from './type'
import { ControlDateRange } from './date-range'
import { ControlQualitative } from './qualitative'
import { ControlQuantitative } from './quantitative'

export function ControlMain(props: {
  control: Control
  onChange: (control: Control) => void
}): ReactElement {
  const { control, onChange } = props
  return (
    <>
      <ControlDateRange
        value={control.dateRange}
        onValueChange={dateRange => onChange({ ...control, dateRange })}
      />
      <ControlQuantitative
        value={control.quantitative}
        onValueChange={quantitative => onChange({ ...control, quantitative })}
      />
      <ControlQualitative
        value={control.qualitative}
        onValueChange={qualitative => onChange({ ...control, qualitative })}
      />
    </>
  )
}
