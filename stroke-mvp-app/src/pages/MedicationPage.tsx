import { useState } from 'react'
import { medicationContext } from '../data/mockData'
import WeekTrack from '../components/WeekTrack'
import { IconGear, IconCheck, IconClock } from '../components/icons'
import type { MedicationStatus } from '../types'

export default function MedicationPage() {
  const ctx = medicationContext
  const [statuses, setStatuses] = useState<Record<string, MedicationStatus>>(
    () =>
      Object.fromEntries(ctx.doses.map((d) => [d.id, d.status])) as Record<
        string,
        MedicationStatus
      >,
  )

  const remaining = Object.values(statuses).filter((s) => s !== 'done').length

  return (
    <div className="screen">
      <div className="screen-header">
        <p className="screen-header__meta">{ctx.dateLabel}</p>
        <button className="icon-btn" aria-label="설정">
          <IconGear />
        </button>
      </div>

      <h1 className="headline">
        {remaining === 0
          ? '오늘 복약을\n모두 마쳤어요.'
          : `오늘 ${ctx.doses.length}번 중\n${remaining}번 남았어요.`}
      </h1>
      <p className="subline">{ctx.subline}</p>

      <div className="card dose-list">
        {ctx.doses.map((dose) => {
          const status = statuses[dose.id]
          const isDone = status === 'done'
          return (
            <div className="dose-item" key={dose.id}>
              <div className="dose-item__row">
                <span
                  className={`dose-item__badge${isDone ? ' is-done' : ''}`}
                >
                  {isDone ? <IconCheck /> : <IconClock />}
                </span>
                <div>
                  <p className="dose-item__title">
                    {dose.timeOfDay} · {dose.label}
                  </p>
                  <p className="dose-item__time">
                    {isDone
                      ? dose.timeLabel.replace('예정', '복용 완료')
                      : dose.timeLabel}
                  </p>
                </div>
              </div>
              {!isDone && (
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    setStatuses((prev) => ({ ...prev, [dose.id]: 'done' }))
                  }
                >
                  복용했어요
                </button>
              )}
            </div>
          )
        })}
      </div>

      <div className="card guide-card">
        <p className="card-label">복약 안내</p>
        <p className="guide-card__text">{ctx.guideText}</p>
        <button className="btn btn-secondary">전체 복약지도 보기</button>
      </div>

      <div className="spacer" />

      <div className="week-summary">
        <p className="subline">이번 주 복약 기록</p>
        <WeekTrack days={ctx.week} />
      </div>
    </div>
  )
}
