import { useState } from 'react'
import { stocks } from '../data/mockData'

export default function Search({ setPage, setSelectedStock, darkMode }) {
  const [query, setQuery] = useState('')
  const filtered = query.trim()
    ? stocks.filter(s => s.name.includes(query) || s.ticker.includes(query) || s.sector.includes(query))
    : stocks

  const dm = darkMode
  const card = dm ? '#1e1e1e' : '#fff'
  const border = dm ? 'rgba(255,255,255,0.06)' : '#f0f0f0'
  const border2 = dm ? 'rgba(255,255,255,0.06)' : '#f5f5f5'
  const text1 = dm ? '#f0f0f0' : '#111'
  const text3 = dm ? '#666' : '#aaa'

  function goStock(s) { setSelectedStock(s); setPage('stockdetail') }

  return (
    <div style={{ padding: '32px', flex: 1 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24, color: text1 }}>검색</h1>

      <div style={{ background: card, borderRadius: 16, border: `1px solid ${border}`, overflow: 'hidden' }}>
        {/* Search input */}
        <div style={{ padding: '16px 20px', borderBottom: `1px solid ${border}` }}>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="종목명, 키워드로 검색 (예: 반도체, 삼성)"
            style={{ width: '100%', border: 'none', outline: 'none', fontSize: 14, color: text1, background: 'transparent' }}
          />
        </div>

        {/* Results */}
        {filtered.map((s, i) => (
          <div key={s.id} onClick={() => goStock(s)} style={{
            display: 'flex', alignItems: 'center', padding: '16px 20px',
            borderBottom: i < filtered.length - 1 ? `1px solid ${border2}` : 'none',
            cursor: 'pointer',
          }}
            onMouseEnter={e => e.currentTarget.style.background = dm ? '#252525' : '#fafafa'}
            onMouseLeave={e => e.currentTarget.style.background = ''}
          >
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 15, color: text1 }}>{s.name}</div>
              <div style={{ fontSize: 12, color: text3, marginTop: 2 }}>{s.sector} · {s.ticker}</div>
            </div>
            <span style={{ fontWeight: 700, fontSize: 16, color: s.score > 0 ? '#ef4444' : '#3b82f6' }}>
              {s.score > 0 ? `+${s.score}` : s.score}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
