import { useState } from 'react'
import { stocks } from '../data/mockData'
import Toggle from '../components/Toggle'

export default function Watchlist({ setPage, setSelectedStock, darkMode }) {
  const [list, setList] = useState([
    { ...stocks[0], alert: true },
    { ...stocks[1], alert: true },
  ])
  const [query, setQuery] = useState('')
  const results = query.trim() ? stocks.filter(s => !list.find(w => w.id === s.id) && (s.name.includes(query) || s.ticker.includes(query))) : []

  const dm = darkMode
  const card = dm ? '#1e1e1e' : '#fff'
  const border = dm ? 'rgba(255,255,255,0.06)' : '#f0f0f0'
  const border2 = dm ? 'rgba(255,255,255,0.06)' : '#f5f5f5'
  const text1 = dm ? '#f0f0f0' : '#111'
  const text2 = dm ? '#999' : '#aaa'
  const text3 = dm ? '#888' : '#888'
  const inputBorder = dm ? 'rgba(255,255,255,0.1)' : '#e5e7eb'

  function add(s) { setList(p => [...p, { ...s, alert: false }]); setQuery('') }
  function remove(id) { setList(p => p.filter(s => s.id !== id)) }
  function toggleAlert(id) { setList(p => p.map(s => s.id === id ? { ...s, alert: !s.alert } : s)) }
  function goStock(s) { setSelectedStock(s); setPage('stockdetail') }

  return (
    <div style={{ padding: '32px', flex: 1 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24, color: text1 }}>관심종목 관리</h1>

      {/* Search add */}
      <div style={{ position: 'relative', marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 10, background: card, border: `1px solid ${inputBorder}`, borderRadius: 14, overflow: 'hidden' }}>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="종목명으로 검색해서 추가"
            style={{ flex: 1, border: 'none', outline: 'none', fontSize: 14, color: text1, padding: '14px 18px', background: 'transparent' }}
          />
          <button style={{ background: '#10b981', color: '#fff', border: 'none', padding: '0 28px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>추가</button>
        </div>
        {results.length > 0 && (
          <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: card, border: `1px solid ${inputBorder}`, borderRadius: 12, marginTop: 4, boxShadow: '0 4px 16px rgba(0,0,0,0.2)', zIndex: 10 }}>
            {results.map(s => (
              <div key={s.id} onClick={() => add(s)} style={{ padding: '10px 16px', cursor: 'pointer', fontSize: 14 }}
                onMouseEnter={e => e.currentTarget.style.background = dm ? '#252525' : '#f9f9f9'}
                onMouseLeave={e => e.currentTarget.style.background = ''}>
                <span style={{ fontWeight: 600, color: text1 }}>{s.name}</span>
                <span style={{ color: text2, marginLeft: 8, fontSize: 12 }}>{s.sector}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* List */}
      <div style={{ background: card, borderRadius: 16, border: `1px solid ${border}`, overflow: 'hidden' }}>
        {list.length === 0 && (
          <div style={{ padding: '48px', textAlign: 'center', color: text2, fontSize: 14 }}>관심종목을 추가해보세요</div>
        )}
        {list.map((s, i) => (
          <div key={s.id} style={{
            display: 'flex', alignItems: 'center', padding: '18px 20px',
            borderBottom: i < list.length - 1 ? `1px solid ${border2}` : 'none',
          }}>
            <div style={{ flex: 1, cursor: 'pointer' }} onClick={() => goStock(s)}>
              <div style={{ fontWeight: 600, fontSize: 15, color: text1 }}>{s.name}</div>
              <div style={{ fontSize: 12, color: text2, marginTop: 2 }}>{s.ticker} · {s.sector}</div>
            </div>
            <span style={{ fontWeight: 700, fontSize: 16, color: s.score > 0 ? '#ef4444' : '#3b82f6', marginRight: 20 }}>
              {s.score > 0 ? `+${s.score}` : s.score}
            </span>
            <span style={{ fontSize: 13, color: text3, marginRight: 10 }}>알림</span>
            <Toggle checked={s.alert} onChange={() => toggleAlert(s.id)} />
            <button onClick={() => remove(s.id)} style={{ marginLeft: 16, fontSize: 13, color: text2, background: 'none', border: 'none', cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.color = '#ef4444'}
              onMouseLeave={e => e.currentTarget.style.color = text2}>삭제</button>
          </div>
        ))}
      </div>
    </div>
  )
}
