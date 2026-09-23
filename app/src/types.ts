export interface DeviceStatus {
  name: string
  connected: boolean
  batteryOk: boolean
}

export interface DayMark {
  label: string
  filled: boolean
  isToday?: boolean
}

export interface MeasureContext {
  dischargeDayLabel: string
  dateLabel: string
  lastMeasuredLabel: string
  cadenceLabel: string
  device: DeviceStatus
  week: DayMark[]
  weeklyDone: number
  weeklyGoal: number
}

export interface MeasureRecordData {
  completedAtLabel: string
  durationLabel: string
  weeklyDone: number
  weeklyGoal: number
  highlights: string[]
}

export interface WeekBar {
  label: string
  count: number
  isCurrent?: boolean
}

export interface RecordContext {
  dateLabel: string
  dischargeDayLabel: string
  headline: string
  bars: WeekBar[]
  weeklyDone: number
  weeklyGoal: number
  summary: string[]
  nextVisit: {
    dateLabel: string
    doctorLabel: string
    timeLabel: string
  }
}

export type MedicationStatus = 'done' | 'upcoming'

export interface MedicationDose {
  id: string
  timeOfDay: string
  label: string
  timeLabel: string
  status: MedicationStatus
}

export interface MedicationContext {
  dateLabel: string
  headline: string
  subline: string
  doses: MedicationDose[]
  guideText: string
  week: DayMark[]
}
