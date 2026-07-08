import { useState, useRef, useEffect } from 'react'

const INIT = [{ role: 'assistant', content: '안녕하세요! 저는 호재이 AI예요. 종목, 환율, 해외지수의 뉴스 감성이나 투자 신호에 대해 궁금한 점을 물어보세요.' }]

export function reply(msg) {
  if (msg.includes('삼성전자')) return '삼성전자는 최근 반도체 업황 회복 기대감으로 긍정 뉴스가 많습니다. 감성 점수 +62로 강한 호재 신호를 보이고 있어요.'
  if (msg.includes('SK하이닉스') || msg.includes('하이닉스')) return 'SK하이닉스는 HBM 수요 확대 소식으로 현재 +78의 최고 감성 점수를 기록 중입니다.'
  if (msg.includes('악재')) return '오늘 가장 강한 악재 종목은 에코프로(-71)입니다. 2차전지 관련 부정적 뉴스가 27건 감지됐습니다.'
  if (msg.includes('환율') || msg.includes('달러')) return '달러/원 환율은 현재 감성 점수 +42로 강세 흐름입니다. 관련 뉴스 18건이 분석됐어요.'
  if (msg.includes('나스닥') || msg.includes('NASDAQ')) return 'NASDAQ은 현재 +67의 높은 감성 점수를 기록 중입니다. AI 관련 빅테크 호재가 주요 원인이에요.'
  return `"${msg}"에 대한 분석 중입니다. 현재 시장에서 관련 뉴스를 실시간으로 감성 분석하고 있어요.`
}

export default function Chatbot({ darkMode }) {
  const [msgs, setMsgs] = useState(INIT)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottom = useRef(null)

  const dm = darkMode
  const card = dm ? '#1e1e1e' : '#fff'
  const border = dm ? 'rgba(255,255,255,0.06)' : '#f0f0f0'
  const text1 = dm ? '#f0f0f0' : '#111'
  const text2 = dm ? '#999' : '#888'
  const inputBg = dm ? '#1e1e1e' : '#fff'
  const inputBorder = dm ? 'rgba(255,255,255,0.1)' : '#e5e7eb'
  const aiBubble = dm ? '#252525' : '#fff'
  const aiBubbleBorder = dm ? 'rgba(255,255,255,0.06)' : '#f0f0f0'
  const aiText = dm ? '#e0e0e0' : '#333'

  useEffect(() => { bottom.current?.scrollIntoView({ behavior: 'smooth' }) }, [msgs])

  function send(text) {
    const m = text || input.trim()
    if (!m) return
    setMsgs(p => [...p, { role: 'user', content: m }])
    setInput('')
    setLoading(true)
    setTimeout(() => {
      setMsgs(p => [...p, { role: 'assistant', content: reply(m) }])
      setLoading(false)
    }, 700)
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: '32px 32px 0' }}>
      <div style={{ marginBottom: 24, flexShrink: 0 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: text1 }}>AI 챗봇</h1>
        <p style={{ fontSize: 13, color: text2, marginTop: 4 }}>뉴스 감성 신호를 바탕으로 궁금한 점을 물어보세요</p>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', minHeight: 0, paddingBottom: 8 }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start', marginBottom: 12 }}>
            <div style={{
              padding: '12px 16px', borderRadius: 14, fontSize: 14, lineHeight: 1.6, maxWidth: '70%',
              background: m.role === 'user' ? '#10b981' : aiBubble,
              color: m.role === 'user' ? '#fff' : aiText,
              border: m.role === 'assistant' ? `1px solid ${aiBubbleBorder}` : 'none',
            }}>{m.content}</div>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 12 }}>
            <div style={{ padding: '12px 16px', borderRadius: 14, background: aiBubble, border: `1px solid ${aiBubbleBorder}`, fontSize: 14, color: dm ? '#666' : '#aaa' }}>분석 중...</div>
          </div>
        )}
        <div ref={bottom} />
      </div>

      {/* Input */}
      <div style={{ padding: '16px 0 32px', flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: 10, background: inputBg, border: `1px solid ${inputBorder}`, borderRadius: 14, padding: '4px 4px 4px 16px' }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            placeholder="예: 삼성전자 최근 감성 흐름 어때?"
            style={{ flex: 1, border: 'none', outline: 'none', fontSize: 14, color: text1, background: 'transparent', padding: '8px 0' }}
          />
          <button onClick={() => send()} style={{
            background: '#10b981', color: '#fff', border: 'none', borderRadius: 10,
            padding: '10px 20px', fontSize: 14, fontWeight: 600, cursor: 'pointer',
          }}>전송</button>
        </div>
      </div>
    </div>
  )
}
