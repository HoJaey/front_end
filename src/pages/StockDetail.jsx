import { useState } from 'react'

const NEWS = [
  { title: '실적 기대감에 강세 시현, 기관 순매수 지속', time: '오늘 09:12', type: 'bull' },
  { title: '외국인 순매수 전환… 반도체 업황 회복 기대', time: '오늘 11:45', type: 'bull' },
  { title: '목표주가 하향 조정, 증권가 의견 엇갈려', time: '오늘 14:30', type: 'bear' },
  { title: 'AI 반도체 수요 급증, 수혜 기대감 확산', time: '어제 09:05', type: 'bull' },
  { title: '경쟁사 신제품 출시로 점유율 우려 제기', time: '어제 11:20', type: 'bear' },
  { title: '3분기 영업이익 전망치 상향, 어닝 서프라이즈 기대', time: '어제 14:00', type: 'bull' },
  { title: '글로벌 공급망 리스크 재부각, 생산 차질 우려', time: '어제 16:45', type: 'bear' },
  { title: '메모리 반도체 가격 반등세 지속', time: '2일 전 09:30', type: 'bull' },
  { title: '환율 급등으로 수출 채산성 악화 우려', time: '2일 전 13:10', type: 'bear' },
  { title: '신규 파운드리 수주 소식, 중장기 성장 기대', time: '2일 전 15:55', type: 'bull' },
  { title: '노조 파업 가능성 제기, 생산 일정 불확실', time: '3일 전 10:20', type: 'bear' },
  { title: '미국 대형 빅테크와 HBM 공급 계약 체결', time: '3일 전 14:00', type: 'bull' },
  { title: '반도체 규제 강화 우려로 투자 심리 위축', time: '4일 전 09:00', type: 'bear' },
  { title: '자사주 매입 계획 발표, 주주 환원 확대', time: '4일 전 11:30', type: 'bull' },
  { title: '중국 경쟁사 저가 공세 심화, 시장 점유율 압박', time: '5일 전 10:45', type: 'bear' },
]

function MiniChart({ positive }) {
  const points = positive
    ? [40, 38, 42, 44, 41, 46, 48, 45, 50, 52, 49, 54, 56, 60]
    : [60, 58, 55, 52, 54, 50, 47, 49, 44, 42, 45, 40, 38, 35]

  const W = 820, H = 160, pad = 20
  const minV = Math.min(...points), maxV = Math.max(...points)
  const range = maxV - minV || 1
  const step = (W - pad * 2) / (points.length - 1)

  const coords = points.map((v, i) => ({
    x: pad + i * step,
    y: pad + (1 - (v - minV) / range) * (H - pad * 2),
  }))
  const pathD = coords.map((c, i) => `${i === 0 ? 'M' : 'L'}${c.x},${c.y}`).join(' ')
  const color = positive ? '#ef4444' : '#3b82f6'
  const last = coords[coords.length - 1]

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 160 }}>
      <path d={pathD} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={last.x} cy={last.y} r="5" fill={color} />
    </svg>
  )
}

export default function StockDetail({ stock, setPage, darkMode }) {
  const [inWatchlist, setInWatchlist] = useState(false)

  const dm = darkMode
  const card = dm ? '#1e1e1e' : '#fff'
  const border = dm ? 'rgba(255,255,255,0.06)' : '#f0f0f0'
  const border2 = dm ? 'rgba(255,255,255,0.06)' : '#f5f5f5'
  const text1 = dm ? '#f0f0f0' : '#111'
  const text3 = dm ? '#666' : '#aaa'
  const backBg = dm ? '#252525' : '#fff'
  const backBorder = dm ? 'rgba(255,255,255,0.1)' : '#e5e7eb'
  const backColor = dm ? '#aaa' : '#555'

  if (!stock) return (
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: dm ? '#555' : '#aaa' }}>
      종목을 선택해주세요
    </div>
  )

  const isBull = stock.score > 0
  const scoreColor = isBull ? '#ef4444' : '#3b82f6'
  const price = (70000 + stock.score * 100).toLocaleString()

  return (
    <div style={{ padding: '24px 32px', flex: 1 }}>
      {/* Back */}
      <button onClick={() => setPage('search')} style={{
        display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: backColor,
        background: backBg, border: `1px solid ${backBorder}`, borderRadius: 8, padding: '6px 14px',
        cursor: 'pointer', marginBottom: 20,
      }}>← 뒤로</button>

      {/* Stock header card */}
      <div style={{ background: card, borderRadius: 16, padding: '24px 28px', border: `1px solid ${border}`, marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: 22, color: text1, marginBottom: 4 }}>{stock.name}</div>
            <div style={{ fontSize: 13, color: text3 }}>{stock.ticker} · {stock.sector}</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: scoreColor, marginTop: 12 }}>{price}</div>
            <div style={{ fontSize: 13, color: scoreColor, marginTop: 2 }}>{isBull ? '+' : ''}{stock.change}%</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 12, color: text3, marginBottom: 4 }}>감성 점수</div>
            <div style={{ fontSize: 32, fontWeight: 800, color: scoreColor }}>{isBull ? '+' : ''}{stock.score}</div>
            <button
              onClick={() => setInWatchlist(v => !v)}
              style={{
                marginTop: 12, padding: '6px 16px', borderRadius: 8, fontSize: 13,
                border: `1px solid ${inWatchlist ? '#10b981' : backBorder}`,
                background: inWatchlist ? '#10b981' : backBg,
                color: inWatchlist ? '#fff' : backColor, cursor: 'pointer',
              }}
            >★ 관심종목</button>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div style={{ background: card, borderRadius: 16, padding: '20px 24px', border: `1px solid ${border}`, marginBottom: 16 }}>
        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 12, color: text1 }}>14일 감성 점수 추이</div>
        <MiniChart positive={isBull} />
      </div>

      {/* News timeline */}
      <div style={{ background: card, borderRadius: 16, border: `1px solid ${border}`, overflow: 'hidden', marginBottom: 24 }}>
        <div style={{ padding: '16px 24px', borderBottom: `1px solid ${border2}`, fontWeight: 700, fontSize: 15, color: text1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span>관련 뉴스 타임라인</span>
          <span style={{ fontSize: 12, fontWeight: 400, color: text3 }}>{NEWS.length}건</span>
        </div>
        <div style={{ maxHeight: 360, overflowY: 'auto' }}>
          {NEWS.map((n, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', padding: '14px 24px',
              borderBottom: i < NEWS.length - 1 ? `1px solid ${border2}` : 'none',
            }}>
              <span style={{
                width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
                background: n.type === 'bull' ? '#ef4444' : '#3b82f6', marginRight: 14,
              }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, color: text1 }}>{n.title}</div>
                <div style={{ fontSize: 11, color: text3, marginTop: 3 }}>{n.time}</div>
              </div>
              <span style={{ fontSize: 12, fontWeight: 600, color: n.type === 'bull' ? '#ef4444' : '#3b82f6', flexShrink: 0, marginLeft: 12 }}>
                {n.type === 'bull' ? '호재' : '악재'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
