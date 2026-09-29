import { useState } from 'react'
import { fastContext, fastDisclaimerText } from '../data/mockData'
import Disclaimer from '../components/Disclaimer'
import { IconCheck } from '../components/icons'
import type { FastLogEntry, FastSymptomKey } from '../types'

function formatNowLabel() {
  const now = new Date()
  const hours24 = now.getHours()
  const period = hours24 < 12 ? '오전' : '오후'
  const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12
  const minutes = now.getMinutes().toString().padStart(2, '0')
  return `9월 22일 ${period} ${hours12}:${minutes}`
}

export default function FastPage() {
  const ctx = fastContext
  const [checked, setChecked] = useState<Record<FastSymptomKey, boolean>>({
    face: false,
    arm: false,
    speech: false,
  })
  const [logs, setLogs] = useState<FastLogEntry[]>(ctx.logs)
  const [savedNote, setSavedNote] = useState<string | null>(null)

  const anyChecked = Object.values(checked).some(Boolean)

  function toggle(key: FastSymptomKey) {
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  function handleSave() {
    const timeLabel = formatNowLabel()
    setLogs((prev) => [{ id: `${Date.now()}`, timeLabel, flagged: anyChecked }, ...prev])
    setSavedNote(`${timeLabel} 기록이 저장되었습니다`)
    setChecked({ face: false, arm: false, speech: false })
  }

  return (
    <div className="screen">
      <div className="screen-header">
        <p className="screen-header__meta">뇌졸중 FAST 자가 체크</p>
      </div>

      <h1 className="headline">{ctx.headline}</h1>

      <div className="card">
        {ctx.items.map((item) => (
          <div
            className="fast-item"
            key={item.key}
            onClick={() => toggle(item.key)}
          >
            <span className="fast-item__badge">{item.letter}</span>
            <div className="fast-item__body">
              <p className="fast-item__title">{item.title}</p>
              <p className="fast-item__desc">{item.question}</p>
            </div>
            <span
              className={`fast-item__checkbox${
                checked[item.key] ? ' is-checked' : ''
              }`}
            >
              <IconCheck />
            </span>
          </div>
        ))}

        <div className="fast-item">
          <span className="fast-item__badge">T</span>
          <div className="fast-item__body">
            <p className="fast-item__title">시간</p>
            <p className="fast-item__desc">{ctx.timeNote}</p>
          </div>
        </div>

        {anyChecked && (
          <div className="fast-alert">
            <p className="fast-alert__text">{ctx.emergencyText}</p>
            <a className="fast-alert__call" href={`tel:${ctx.emergencyNumber}`}>
              {ctx.emergencyNumber} 전화
            </a>
          </div>
        )}

        <button
          className="btn btn-primary"
          style={{ marginTop: 16 }}
          onClick={handleSave}
        >
          확인하고 저장
        </button>

        {savedNote && <p className="fast-saved-note">{savedNote}</p>}
      </div>

      <div className="card">
        <div className="fast-log__header">
          <p className="card-label" style={{ margin: 0 }}>
            체크 기록
          </p>
          <p className="card-label" style={{ margin: 0 }}>
            총 {logs.length}건
          </p>
        </div>
        <div className="fast-log-list">
          {logs.map((log) => (
            <div className="fast-log-item" key={log.id}>
              <span className="fast-log-item__time">{log.timeLabel}</span>
              <span
                className={`fast-log-item__result${
                  log.flagged ? ' is-flagged' : ''
                }`}
              >
                {log.flagged ? '해당 항목 있음' : '해당 항목 없음'}
              </span>
            </div>
          ))}
        </div>
      </div>

      <Disclaimer text={fastDisclaimerText} />
    </div>
  )
}
