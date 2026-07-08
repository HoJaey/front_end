import { useState } from 'react'
import { bullTop, bearTop, stocks } from '../data/mockData'

const TABS = ['코스피 종목', '환율', '해외지수']

function Score({ v, size = 14 }) {
  return <span style={{ color: v > 0 ? '#ef4444' : '#3b82f6', fontWeight: 700, fontSize: size }}>{v > 0 ? `+${v}` : v}</span>
}

function HeatTile({ stock, onClick, darkMode }) {
  const abs = Math.abs(stock.score)
  const intensity = Math.min(abs / 80, 1)
  const bg = stock.score > 0
    ? `rgba(239,68,68,${0.12 + intensity * 0.65})`
    : `rgba(59,130,246,${0.12 + intensity * 0.65})`
  return (
    <div onClick={() => onClick(stock)} style={{ background: bg, borderRadius: 14, padding: '16px 14px', cursor: 'pointer', transition: 'opacity 0.15s' }}
      onMouseEnter={e => e.currentTarget.style.opacity = '0.85'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
      <div style={{ fontWeight: 600, fontSize: 13, color: darkMode ? '#f0f0f0' : '#111', marginBottom: 2 }}>{stock.name}</div>
      <div style={{ fontSize: 11, color: darkMode ? '#999' : '#888', marginBottom: 8 }}>{stock.sector}</div>
      <Score v={stock.score} size={18} />
    </div>
  )
}

export default function Dashboard({ setPage, setSelectedStock, darkMode }) {
  const [tab, setTab] = useState('코스피 종목')
  const dm = darkMode
  const card = dm ? '#1e1e1e' : '#fff'
  const border = dm ? 'rgba(255,255,255,0.06)' : '#f0f0f0'
  const border2 = dm ? 'rgba(255,255,255,0.06)' : '#f5f5f5'
  const text1 = dm ? '#f0f0f0' : '#111'
  const text2 = dm ? '#999' : '#555'
  const text3 = dm ? '#666' : '#888'
  const text4 = dm ? '#555' : '#aaa'
  const tabActiveBg = dm ? '#f0f0f0' : '#111'
  const tabActiveColor = dm ? '#111' : '#fff'
  const tabInactiveBg = dm ? '#252525' : '#fff'
  const tabBorder = dm ? 'rgba(255,255,255,0.1)' : '#e5e7eb'
  const hoverBg = dm ? '#252525' : '#f9f9f9'
  const btnBg = dm ? '#252525' : '#fff'
  const btnColor = dm ? '#aaa' : '#555'
  const btnBorder = dm ? 'rgba(255,255,255,0.1)' : '#e5e7eb'

  const heatStocks = [...stocks].sort((a, b) => b.score - a.score).slice(0, 8)

  function goStock(s) { setSelectedStock(s); setPage('stockdetail') }

  return (
    <div style={{ padding: '32px 32px', flex: 1 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: text1 }}>메인 대시보드</h1>
        <div style={{ display: 'flex', gap: 6 }}>
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: '6px 16px', borderRadius: 8, fontSize: 13, cursor: 'pointer', border: '1px solid',
              background: tab === t ? tabActiveBg : tabInactiveBg,
              color: tab === t ? tabActiveColor : text2,
              borderColor: tab === t ? tabActiveBg : tabBorder,
              fontWeight: tab === t ? 600 : 400,
            }}>{t}</button>
          ))}
        </div>
      </div>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 20 }}>
        {[
          { label: '오늘 호재 뉴스', value: '95건', color: '#ef4444', sub: '전일 대비 상승' },
          { label: '오늘 악재 뉴스', value: '87건', color: '#3b82f6', sub: '전일 대비 하락' },
          { label: '분석된 전체 뉴스', value: '182건', color: text1, sub: '최근 24시간' },
        ].map(c => (
          <div key={c.label} style={{ background: card, borderRadius: 16, padding: '20px 24px', border: `1px solid ${border}` }}>
            <div style={{ fontSize: 13, color: text3, marginBottom: 10 }}>{c.label}</div>
            <div style={{ fontSize: 38, fontWeight: 800, color: c.color, marginBottom: 6 }}>{c.value}</div>
            <div style={{ fontSize: 12, color: text4 }}>{c.sub}</div>
          </div>
        ))}
      </div>

      {/* Bottom row */}
      <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: 16 }}>
        {/* Top 5 */}
        <div style={{ background: card, borderRadius: 16, padding: '20px 24px', border: `1px solid ${border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <span style={{ fontWeight: 700, fontSize: 15, color: text1 }}>호재 · 악재 Top 5</span>
            <button onClick={() => setPage('ranking')} style={{ padding: '4px 12px', borderRadius: 8, fontSize: 12, border: `1px solid ${btnBorder}`, background: btnBg, cursor: 'pointer', color: btnColor }}>전체보기</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#ef4444', marginBottom: 8 }}>호재 TOP</div>
              {bullTop.slice(0, 5).map(s => (
                <div key={s.id} onClick={() => goStock(s)} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 4px', cursor: 'pointer', borderRadius: 6 }}
                  onMouseEnter={e => e.currentTarget.style.background = hoverBg} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <span style={{ fontSize: 13, color: text2 }}>{s.name}</span>
                  <Score v={s.score} />
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#3b82f6', marginBottom: 8 }}>악재 TOP</div>
              {bearTop.slice(0, 5).map(s => (
                <div key={s.id} onClick={() => goStock(s)} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 4px', cursor: 'pointer', borderRadius: 6 }}
                  onMouseEnter={e => e.currentTarget.style.background = hoverBg} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <span style={{ fontSize: 13, color: text2 }}>{s.name}</span>
                  <Score v={s.score} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Heatmap preview */}
        <div style={{ background: card, borderRadius: 16, padding: '20px 24px', border: `1px solid ${border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <span style={{ fontWeight: 700, fontSize: 15, color: text1 }}>시장 히트맵</span>
            <button onClick={() => setPage('heatmap')} style={{ padding: '4px 12px', borderRadius: 8, fontSize: 12, border: `1px solid ${btnBorder}`, background: btnBg, cursor: 'pointer', color: btnColor }}>전체보기</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
            {heatStocks.map(s => <HeatTile key={s.id} stock={s} onClick={goStock} darkMode={dm} />)}
          </div>
        </div>
      </div>
    </div>
  )
}
