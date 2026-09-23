import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { measureContext, measureRecord } from '../data/mockData'
import WeekTrack from '../components/WeekTrack'
import Disclaimer from '../components/Disclaimer'
import { IconGear, IconWifi, IconCheck } from '../components/icons'

type Stage = 'idle' | 'running' | 'result'

const DURATION_SEC = 15

function formatTime(sec: number) {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function MeasurePage() {
  const [stage, setStage] = useState<Stage>('idle')
  const [remaining, setRemaining] = useState(DURATION_SEC)
  const intervalRef = useRef<number | null>(null)

  useEffect(() => {
    if (stage !== 'running') return
    intervalRef.current = window.setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          window.clearInterval(intervalRef.current!)
          setStage('result')
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current)
    }
  }, [stage])

  function startMeasuring() {
    setRemaining(DURATION_SEC)
    setStage('running')
  }

  function stopMeasuring() {
    if (intervalRef.current) window.clearInterval(intervalRef.current)
    setStage('idle')
  }

  if (stage === 'running') {
    return <MeasureRunning remaining={remaining} onStop={stopMeasuring} />
  }

  if (stage === 'result') {
    return <MeasureRecordScreen onHome={() => setStage('idle')} />
  }

  return <MeasureIdle onStart={startMeasuring} />
}

function MeasureIdle({ onStart }: { onStart: () => void }) {
  const ctx = measureContext
  return (
    <div className="screen">
      <div className="screen-header">
        <div>
          <p className="screen-header__meta">
            {ctx.dischargeDayLabel} · {ctx.dateLabel}
          </p>
        </div>
        <button className="icon-btn" aria-label="설정">
          <IconGear />
        </button>
      </div>

      <h1 className="headline">오늘 측정할{'\n'}시간이에요.</h1>
      <p className="subline">
        {ctx.lastMeasuredLabel} · {ctx.cadenceLabel}
      </p>

      <div className="card device-card">
        <div className="device-card__row">
          <div className="device-card__info">
            <span className="device-card__icon">
              <IconWifi />
            </span>
            <div>
              <p className="device-card__name">{ctx.device.name}</p>
              <p className="device-card__status">
                {ctx.device.connected ? '연결됨' : '연결 안 됨'} · 배터리
                {ctx.device.batteryOk ? ' 충분' : ' 부족'}
              </p>
            </div>
          </div>
          <button className="link-btn">다시 연결</button>
        </div>

        <ol className="steps">
          <li>의자에 등을 기대고 편하게 앉으세요</li>
          <li>기기를 가슴에 부착해 주세요</li>
          <li>3분 동안 말하지 않고 기다리세요</li>
        </ol>

        <button className="btn btn-primary" onClick={onStart}>
          측정 시작하기
        </button>
      </div>

      <div className="spacer" />

      <div className="week-summary">
        <p className="subline">
          이번 주 {ctx.week.length}일 중 {ctx.weeklyDone}일 측정 유지 중
        </p>
        <WeekTrack days={ctx.week} />
      </div>
    </div>
  )
}

function MeasureRunning({
  remaining,
  onStop,
}: {
  remaining: number
  onStop: () => void
}) {
  const progress = 1 - remaining / DURATION_SEC
  const radius = 80
  const circumference = 2 * Math.PI * radius

  return (
    <div className="screen screen--dark">
      <p className="running-label">측정 중입니다</p>

      <div className="timer-ring">
        <svg viewBox="0 0 200 200">
          <circle
            className="timer-ring__track"
            cx="100"
            cy="100"
            r={radius}
          />
          <circle
            className="timer-ring__fill"
            cx="100"
            cy="100"
            r={radius}
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress)}
          />
        </svg>
        <div className="timer-ring__center">
          <span className="timer-ring__time">{formatTime(remaining)}</span>
          <span className="timer-ring__caption">남은 시간</span>
        </div>
      </div>

      <div className="running-copy">
        <h1 className="headline headline--on-dark">그대로 계셔도 됩니다.</h1>
        <p className="subline subline--on-dark">
          말씀하거나 움직이시면{'\n'}다시 측정해야 할 수 있어요.
        </p>
      </div>

      <div className="spacer" />

      <div className="running-actions">
        <button className="btn btn-secondary" disabled={remaining > 0}>
          측정 기록 보기
        </button>
        <button className="btn btn-ghost btn-ghost--on-dark" onClick={onStop}>
          측정 중단
        </button>
      </div>
    </div>
  )
}

function MeasureRecordScreen({ onHome }: { onHome: () => void }) {
  const r = measureRecord
  const navigate = useNavigate()
  return (
    <div className="screen">
      <div className="screen-header">
        <p className="screen-header__meta">
          {r.completedAtLabel} · {r.durationLabel}
        </p>
        <button className="icon-btn" aria-label="설정">
          <IconGear />
        </button>
      </div>

      <h1 className="headline">측정이{'\n'}완료되었어요.</h1>

      <div className="card">
        <div className="result-check">
          <span className="result-check__icon">
            <IconCheck />
          </span>
          <div>
            <p className="result-check__title">기록이 저장되었습니다</p>
            <p className="result-check__desc">담당 의료진에게 전달됩니다</p>
          </div>
        </div>

        <div className="result-row">
          <span>이번 주 측정</span>
          <strong>
            {r.weeklyDone}회 / {r.weeklyGoal}회
          </strong>
        </div>

        <div className="result-highlights">
          <p className="result-highlights__title">함께 본 기록</p>
          {r.highlights.map((h) => (
            <div className="result-highlights__item" key={h}>
              <IconCheck />
              <span>{h}</span>
            </div>
          ))}
        </div>
      </div>

      <Disclaimer />

      <div className="spacer" />

      <div className="running-actions">
        <button className="btn btn-primary" onClick={() => navigate('/record')}>
          기록 보기
        </button>
        <button className="btn btn-ghost" onClick={onHome}>
          홈으로
        </button>
      </div>
    </div>
  )
}
