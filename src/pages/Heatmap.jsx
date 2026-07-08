import { useState } from 'react'
import { getDataByTab } from '../data/mockData'

const TABS = ['코스피 종목', '환율', '해외지수']

export default function Heatmap({ setPage, setSelectedStock, darkMode }) {
  const [tab, setTab] = useState('코스피 종목')
  const dm = darkMode
  const card = dm ? '#1e1e1e' : '#fff'
  const border = dm ? 'rgba(255,255,255,0.06)' : '#f0f0f0'
  const text1 = dm ? '#f0f0f0' : '#111'
  const text2 = dm ? '#999' : '#555'
  const tabActiveBg = dm ? '#f0f0f0' : '#111'
  const tabActiveColor = dm ? '#111' : '#fff'
  const tabInactiveBg = dm ? '#252525' : '#fff'
  const tabBorder = dm ? 'rgba(255,255,255,0.1)' : '#e5e7eb'

  const data = getDataByTab(tab)
  const sorted = [...data].sort((a, b) => b.score - a.score)
  const maxAbs = Math.max(...data.map(s => Math.abs(s.score)), 1)

  function goStock(s) { setSelectedStock(s); setPage('stockdetail') }

  return (
    <div style={{ padding: '32px', flex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: text1 }}>히트맵</h1>
        <div style={{ display: 'flex', gap: 6 }}>
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: '6px 16px', borderRadius: 8, fontSize: 13, cursor: 'pointer', border: '1px solid',
              background: tab === t ? tabActiveBg : tabInactiveBg,
              color: tab === t ? tabActiveColor : text2,
              borderColor: tab === t ? tabActiveBg : tabBorder,
            }}>{t}</button>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div style={{ background: card, borderRadius: 16, padding: '14px 20px', border: `1px solid ${border}`, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 12, color: '#3b82f6', display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#3b82f6', display: 'inline-block' }} /> 악재
        </span>
        <div style={{ flex: 1, height: 10, borderRadius: 999, background: 'linear-gradient(to right, #93c5fd, #fecaca, #ef4444)' }} />
        <span style={{ fontSize: 12, color: '#ef4444', display: 'flex', alignItems: 'center', gap: 4 }}>
          호재 <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444', display: 'inline-block' }} />
        </span>
      </div>

      {/* Grid */}
      <div style={{ background: card, borderRadius: 16, padding: '20px', border: `1px solid ${border}` }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
          {sorted.map(s => {
            const intensity = Math.abs(s.score) / maxAbs
            const bg = s.score > 0
              ? `rgba(239,68,68,${0.12 + intensity * 0.6})`
              : `rgba(59,130,246,${0.12 + intensity * 0.6})`
            return (
              <div key={s.id} onClick={() => goStock(s)} style={{ background: bg, borderRadius: 14, padding: '18px 16px', cursor: 'pointer', transition: 'transform 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                <div style={{ fontWeight: 700, fontSize: 14, color: dm ? '#f0f0f0' : '#111', marginBottom: 2 }}>{s.name}</div>
                <div style={{ fontSize: 11, color: dm ? '#aaa' : '#666', marginBottom: 10 }}>{s.sector}</div>
                <div style={{ fontWeight: 800, fontSize: 22, color: s.score > 0 ? '#ef4444' : '#3b82f6' }}>
                  {s.score > 0 ? `+${s.score}` : s.score}
                </div>
                <div style={{ fontSize: 11, color: dm ? '#999' : '#888', marginTop: 4 }}>뉴스 {s.news}건</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
