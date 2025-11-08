import type { ReactElement } from 'react'
import type { Demographic } from '@/lib/data/main'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export type Qualitative = keyof Demographic

export function ControlQualitative(props: {
  value: Qualitative
  onValueChange: (value: Qualitative) => void
}): ReactElement {
  const { value, onValueChange } = props
  return (
    <Select
      value={value}
      onValueChange={value => onValueChange(value as Qualitative)}
    >
      <SelectTrigger className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="dob">
          Age
        </SelectItem>
        <SelectItem value="gender">
          Gender
        </SelectItem>
        <SelectItem value="country">
          Country
        </SelectItem>
        <SelectItem value="city">
          City
        </SelectItem>
        <SelectItem value="jobTitle">
          Job title
        </SelectItem>
        <SelectItem value="jobIndustry">
          Job industry
        </SelectItem>
        <SelectItem value="wealthSegment">
          Wealth segment
        </SelectItem>
      </SelectContent>
    </Select>
  )
}
