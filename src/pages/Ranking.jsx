import { stocks } from '../data/mockData'

const sorted = [...stocks].sort((a, b) => b.score - a.score)
const bullRank = sorted.filter(s => s.score > 0).concat(sorted.filter(s => s.score <= 0))
const bearRank = [...sorted].reverse()

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
  const dm = darkMode
  const card = dm ? '#1e1e1e' : '#fff'
  const border = dm ? 'rgba(255,255,255,0.06)' : '#f0f0f0'
  const text1 = dm ? '#f0f0f0' : '#111'
  const text2 = dm ? '#999' : '#555'
  const tabActiveBg = dm ? '#f0f0f0' : '#111'
  const tabActiveColor = dm ? '#111' : '#fff'
  const tabInactiveBg = dm ? '#252525' : '#fff'
  const tabBorder = dm ? 'rgba(255,255,255,0.1)' : '#e5e7eb'

  function goStock(s) { setSelectedStock(s); setPage('stockdetail') }

  return (
    <div style={{ padding: '32px', flex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: text1 }}>랭킹</h1>
        <div style={{ display: 'flex', gap: 6 }}>
          {['코스피 종목', '환율', '해외지수'].map((t, i) => (
            <button key={t} style={{
              padding: '6px 16px', borderRadius: 8, fontSize: 13, cursor: 'pointer', border: '1px solid',
              background: i === 0 ? tabActiveBg : tabInactiveBg,
              color: i === 0 ? tabActiveColor : text2,
              borderColor: i === 0 ? tabActiveBg : tabBorder,
            }}>{t}</button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Bull */}
        <div style={{ background: card, borderRadius: 16, overflow: 'hidden', border: `1px solid ${border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '16px 20px', borderBottom: `1px solid ${border}` }}>
            <span style={{ color: '#ef4444', fontSize: 13 }}>▲</span>
            <span style={{ fontWeight: 700, color: '#ef4444', fontSize: 14 }}>호재 랭킹</span>
          </div>
          {bullRank.map((s, i) => <Row key={s.id} rank={i + 1} stock={s} onClick={goStock} dm={dm} />)}
        </div>

        {/* Bear */}
        <div style={{ background: card, borderRadius: 16, overflow: 'hidden', border: `1px solid ${border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '16px 20px', borderBottom: `1px solid ${border}` }}>
            <span style={{ color: '#3b82f6', fontSize: 13 }}>▼</span>
            <span style={{ fontWeight: 700, color: '#3b82f6', fontSize: 14 }}>악재 랭킹</span>
          </div>
          {bearRank.map((s, i) => <Row key={s.id} rank={i + 1} stock={s} onClick={goStock} dm={dm} />)}
        </div>
      </div>
    </div>
  )
}
