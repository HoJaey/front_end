import { useState } from 'react'
import { getDataByTab } from '../data/mockData'

const TABS = ['코스피 종목', '환율', '해외지수']

function Row({ rank, stock, onClick, dm }) {
  return (
    <div onClick={() => onClick(stock)} style={{
      display: 'flex', alignItems: 'center', padding: '14px 20px',
      borderBottom: `1px solid ${dm ? 'rgba(255,255,255,0.06)' : '#f5f5f5'}`, cursor: 'pointer',
    }}
      onMouseEnter={e => e.currentTarget.style.background = dm ? '#252525' : '#fafafa'}
      onMouseLeave={e => e.currentTarget.style.background = ''}
    >
      <span style={{ width: 28, fontSize: 13, color: dm ? '#555' : '#bbb', flexShrink: 0 }}>{rank}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 600, fontSize: 14, color: dm ? '#f0f0f0' : '#111' }}>{stock.name}</div>
        <div style={{ fontSize: 11, color: dm ? '#666' : '#aaa', marginTop: 1 }}>{stock.sector} · 뉴스 {stock.news}건</div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: stock.score > 0 ? '#ef4444' : '#3b82f6' }}>
          {stock.score > 0 ? `+${stock.score}` : stock.score}
        </div>
        <div style={{ fontSize: 11, color: stock.change > 0 ? '#ef4444' : '#3b82f6', marginTop: 1 }}>
          {stock.change > 0 ? `+${stock.change}%` : `${stock.change}%`}
        </div>
      </div>
    </div>
  )
}

export default function Ranking({ setPage, setSelectedStock, darkMode }) {
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
  const bullRank = sorted.filter(s => s.score > 0)
  const bearRank = sorted.filter(s => s.score < 0).reverse()

  function goStock(s) { setSelectedStock(s); setPage('stockdetail') }

  return (
    <div style={{ padding: '32px', flex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: text1 }}>랭킹</h1>
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

      <div className="grid-ranking">
        <div style={{ background: card, borderRadius: 16, overflow: 'hidden', border: `1px solid ${border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '16px 20px', borderBottom: `1px solid ${border}` }}>
            <span style={{ color: '#ef4444', fontSize: 13 }}>▲</span>
            <span style={{ fontWeight: 700, color: '#ef4444', fontSize: 14 }}>호재 랭킹</span>
          </div>
          {bullRank.length === 0
            ? <div style={{ padding: '32px', textAlign: 'center', color: dm ? '#555' : '#bbb', fontSize: 13 }}>호재 항목 없음</div>
            : bullRank.map((s, i) => <Row key={s.id} rank={i + 1} stock={s} onClick={goStock} dm={dm} />)
          }
        </div>

        <div style={{ background: card, borderRadius: 16, overflow: 'hidden', border: `1px solid ${border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '16px 20px', borderBottom: `1px solid ${border}` }}>
            <span style={{ color: '#3b82f6', fontSize: 13 }}>▼</span>
            <span style={{ fontWeight: 700, color: '#3b82f6', fontSize: 14 }}>악재 랭킹</span>
          </div>
          {bearRank.length === 0
            ? <div style={{ padding: '32px', textAlign: 'center', color: dm ? '#555' : '#bbb', fontSize: 13 }}>악재 항목 없음</div>
            : bearRank.map((s, i) => <Row key={s.id} rank={i + 1} stock={s} onClick={goStock} dm={dm} />)
          }
        </div>
      </div>
    </div>
  )
}
