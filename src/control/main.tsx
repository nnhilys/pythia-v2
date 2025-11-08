import type { ReactElement } from 'react'
import type { Control } from './type'
import { ControlMonth } from './month'
import { ControlQualitative } from './qualitative'
import { ControlQuantitative } from './quantitative'
import { ControlYear } from './year'

export function ControlMain(props: {
  years: number[]
  control: Control
  onChange: (control: Control) => void
}): ReactElement {
  const { years, control, onChange } = props
  return (
    <>
      <div className="flex gap-2">
        <ControlYear
          years={years}
          value={control.year}
          onValueChange={year => onChange({ ...control, year })}
        />
        <ControlMonth
          value={control.month}
          onValueChange={month => onChange({ ...control, month })}
        />
      </div>
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
