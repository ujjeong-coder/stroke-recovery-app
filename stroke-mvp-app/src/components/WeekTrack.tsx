import type { DayMark } from '../types'

export default function WeekTrack({ days }: { days: DayMark[] }) {
  return (
    <div className="week-track">
      {days.map((day) => (
        <div className="week-track__day" key={day.label}>
          <span
            className={`week-track__bar${day.filled ? ' is-filled' : ''}`}
          />
          <span
            className={`week-track__label${day.isToday ? ' is-today' : ''}`}
          >
            {day.label}
          </span>
        </div>
      ))}
    </div>
  )
}
