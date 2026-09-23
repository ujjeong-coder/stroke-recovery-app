import type {
  MeasureContext,
  MeasureRecordData,
  RecordContext,
  MedicationContext,
} from '../types'

export const measureContext: MeasureContext = {
  dischargeDayLabel: '퇴원 후 23일째',
  dateLabel: '9월 22일 월요일',
  lastMeasuredLabel: '마지막 측정 9월 20일',
  cadenceLabel: '격일 측정 처방',
  device: {
    name: '메디아나 MD100',
    connected: true,
    batteryOk: true,
  },
  week: [
    { label: '월', filled: true },
    { label: '화', filled: true },
    { label: '수', filled: false },
    { label: '목', filled: true },
    { label: '금', filled: true },
    { label: '토', filled: false },
    { label: '일', filled: false, isToday: true },
  ],
  weeklyDone: 4,
  weeklyGoal: 4,
}

export const measureRecord: MeasureRecordData = {
  completedAtLabel: '9월 22일 오후 7시 34분',
  durationLabel: '3분 12초',
  weeklyDone: 4,
  weeklyGoal: 4,
  highlights: [
    '아침 복약을 12일 연속 기록했습니다',
    '최근 7일 중 4회 측정을 기록했습니다',
  ],
}

export const recordContext: RecordContext = {
  dateLabel: '9월 22일',
  dischargeDayLabel: '퇴원 후 23일째',
  headline: '지난주와 비슷하게\n기록하고 계세요.',
  bars: [
    { label: '4주 전', count: 3 },
    { label: '3주 전', count: 4 },
    { label: '2주 전', count: 4 },
    { label: '이번 주', count: 4, isCurrent: true },
  ],
  weeklyDone: 4,
  weeklyGoal: 4,
  summary: [
    '최근 7일 중 4회 측정을 기록했습니다',
    '아침 복약을 12일 연속 기록했습니다',
    '측정 기록은 담당 의료진에게 전달됩니다',
  ],
  nextVisit: {
    dateLabel: '다음 외래 10월 6일',
    doctorLabel: '담당 교수명',
    timeLabel: '오전 10시 30분',
  },
}

export const medicationContext: MedicationContext = {
  dateLabel: '9월 22일 월요일',
  headline: '오늘 두 번 중\n한 번 남았어요.',
  subline: '12일째 빠짐없이 이어지고 있습니다',
  doses: [
    {
      id: 'am',
      timeOfDay: '아침',
      label: '[약명] 외 2종',
      timeLabel: '오전 8시 12분 복용 완료',
      status: 'done',
    },
    {
      id: 'pm',
      timeOfDay: '저녁',
      label: '[약명] 외 1종',
      timeLabel: '오후 7시 예정',
      status: 'upcoming',
    },
  ],
  guideText: '[약사 검수 문구 — 복약 시점·병용 주의·누락 시 대처가 들어갑니다]',
  week: [
    { label: '월', filled: true },
    { label: '화', filled: true },
    { label: '수', filled: true },
    { label: '목', filled: true },
    { label: '금', filled: false },
    { label: '토', filled: false },
    { label: '일', filled: false, isToday: true },
  ],
}

export const disclaimerText =
  '이 앱은 측정 기록을 보관하고 보여주는 도구입니다. 질병의 진단·예측·치료 목적으로 사용할 수 없습니다. 증상이 있으면 의료진에게 문의하세요.'
