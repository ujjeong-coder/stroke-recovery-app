import { recordContext } from '../data/mockData'
import Disclaimer from '../components/Disclaimer'
import { IconGear, IconCheck, IconCalendar } from '../components/icons'

export default function RecordPage() {
  const ctx = recordContext
  const maxCount = Math.max(...ctx.bars.map((b) => b.count), 1)

  return (
    <div className="screen">
      <div className="screen-header">
        <p className="screen-header__meta">
          {ctx.dateLabel} · {ctx.dischargeDayLabel}
        </p>
        <button className="icon-btn" aria-label="설정">
          <IconGear />
        </button>
      </div>

      <h1 className="headline">{ctx.headline}</h1>

      <div className="card">
        <p className="card-label">주당 측정 횟수</p>
        <div className="bar-chart">
          {ctx.bars.map((bar) => (
            <div className="bar-chart__col" key={bar.label}>
              <span className="bar-chart__value">{bar.count}회</span>
              <div className="bar-chart__track">
                <div
                  className={`bar-chart__fill${
                    bar.isCurrent ? ' is-current' : ''
                  }`}
                  style={{ height: `${(bar.count / maxCount) * 100}%` }}
                />
              </div>
              <span
                className={`bar-chart__label${
                  bar.isCurrent ? ' is-current' : ''
                }`}
              >
                {bar.label}
              </span>
            </div>
          ))}
        </div>

        <div className="result-row result-row--divider">
          <span>처방 주기 대비</span>
          <strong>
            {ctx.weeklyDone}회 / {ctx.weeklyGoal}회
          </strong>
        </div>
      </div>

      <div className="card">
        <p className="result-highlights__title">이번 주 기록 요약</p>
        <div className="result-highlights">
          {ctx.summary.map((s) => (
            <div className="result-highlights__item" key={s}>
              <IconCheck />
              <span>{s}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card next-visit">
        <span className="next-visit__icon">
          <IconCalendar />
        </span>
        <div>
          <p className="next-visit__title">{ctx.nextVisit.dateLabel}</p>
          <p className="next-visit__desc">
            [{ctx.nextVisit.doctorLabel}] · {ctx.nextVisit.timeLabel}
          </p>
        </div>
      </div>

      <Disclaimer />
    </div>
  )
}
