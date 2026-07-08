import { useState } from 'react'
import Toggle from '../components/Toggle'

export default function Settings({ darkMode, setDarkMode }) {
  const [alertPush, setAlertPush] = useState(true)
  const [weeklyEmail, setWeeklyEmail] = useState(false)

  const dm = darkMode
  const card = dm ? '#1e1e1e' : '#fff'
  const border = dm ? 'rgba(255,255,255,0.06)' : '#f0f0f0'
  const border2 = dm ? 'rgba(255,255,255,0.06)' : '#f5f5f5'
  const text1 = dm ? '#f0f0f0' : '#111'
  const text2 = dm ? '#aaa' : '#333'

  const rows = [
    { label: '다크 모드', value: darkMode, onChange: setDarkMode },
    { label: '호재/악재 알림 푸시', value: alertPush, onChange: setAlertPush },
    { label: '주간 리포트 이메일', value: weeklyEmail, onChange: setWeeklyEmail },
  ]

  return (
    <div style={{ padding: '32px', flex: 1 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24, color: text1 }}>설정</h1>
      <div style={{ background: card, borderRadius: 16, border: `1px solid ${border}`, overflow: 'hidden' }}>
        {rows.map((r, i) => (
          <div key={r.label} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '18px 24px', borderBottom: i < rows.length - 1 ? `1px solid ${border2}` : 'none',
          }}>
            <span style={{ fontSize: 14, color: text2 }}>{r.label}</span>
            <Toggle checked={r.value} onChange={r.onChange} />
          </div>
        ))}
      </div>
    </div>
  )
}
