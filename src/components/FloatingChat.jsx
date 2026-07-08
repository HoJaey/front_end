import { useState, useRef, useEffect } from 'react'
import { reply } from '../pages/Chatbot'

const INIT = [{ role: 'assistant', content: '안녕하세요! 저는 호재이 AI예요. 종목, 환율, 해외지수의 뉴스 감성이나 투자 신호에 대해 궁금한 점을 물어보세요.' }]

export default function FloatingChat({ darkMode }) {
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState(INIT)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottom = useRef(null)

  const dm = darkMode
  const popupBg = dm ? '#1a1a1a' : '#fff'
  const headerBg = dm ? '#141414' : '#f9f9f9'
  const borderColor = dm ? 'rgba(255,255,255,0.08)' : '#e5e7eb'
  const text1 = dm ? '#f0f0f0' : '#111'
  const text2 = dm ? '#999' : '#888'
  const aiBubble = dm ? '#252525' : '#f3f4f6'
  const aiBubbleBorder = dm ? 'rgba(255,255,255,0.06)' : '#e5e7eb'
  const aiText = dm ? '#e0e0e0' : '#333'
  const inputBg = dm ? '#1a1a1a' : '#fff'
  const inputBorder = dm ? 'rgba(255,255,255,0.1)' : '#e5e7eb'

  useEffect(() => {
    if (open) bottom.current?.scrollIntoView({ behavior: 'smooth' })
  }, [msgs, open])

  function send() {
    const m = input.trim()
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
    <>
      {/* Popup panel */}
      {open && (
        <div style={{
          position: 'fixed', bottom: 88, right: 24, width: 360, height: 500,
          background: popupBg, borderRadius: 20, border: `1px solid ${borderColor}`,
          boxShadow: '0 20px 60px rgba(0,0,0,0.18)', display: 'flex', flexDirection: 'column',
          zIndex: 1000, overflow: 'hidden',
        }}>
          {/* Header */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '14px 18px', background: headerBg, borderBottom: `1px solid ${borderColor}`, flexShrink: 0,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 10L5 6.5L7.5 8.5L10.5 5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span style={{ fontWeight: 700, fontSize: 14, color: text1 }}>AI 챗봇</span>
            </div>
            <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: text2, fontSize: 18, lineHeight: 1, padding: 4 }}>✕</button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', minHeight: 0, padding: '12px 14px 8px' }}>
            {msgs.map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start', marginBottom: 10 }}>
                <div style={{
                  padding: '10px 14px', borderRadius: 14, fontSize: 13, lineHeight: 1.55, maxWidth: '80%',
                  background: m.role === 'user' ? '#10b981' : aiBubble,
                  color: m.role === 'user' ? '#fff' : aiText,
                  border: m.role === 'assistant' ? `1px solid ${aiBubbleBorder}` : 'none',
                }}>{m.content}</div>
              </div>
            ))}
            {loading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 10 }}>
                <div style={{ padding: '10px 14px', borderRadius: 14, background: aiBubble, border: `1px solid ${aiBubbleBorder}`, fontSize: 13, color: dm ? '#666' : '#aaa' }}>분석 중...</div>
              </div>
            )}
            <div ref={bottom} />
          </div>

          {/* Input */}
          <div style={{ padding: '8px 12px 12px', flexShrink: 0, borderTop: `1px solid ${borderColor}` }}>
            <div style={{ display: 'flex', gap: 8, background: inputBg, border: `1px solid ${inputBorder}`, borderRadius: 12, padding: '4px 4px 4px 12px' }}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send()}
                placeholder="메시지를 입력하세요"
                style={{ flex: 1, border: 'none', outline: 'none', fontSize: 13, color: text1, background: 'transparent', padding: '7px 0' }}
              />
              <button onClick={send} style={{
                background: '#10b981', color: '#fff', border: 'none', borderRadius: 9,
                padding: '8px 14px', fontSize: 13, fontWeight: 600, cursor: 'pointer',
              }}>전송</button>
            </div>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          position: 'fixed', bottom: 24, right: 24,
          width: 52, height: 52, borderRadius: '50%',
          background: '#10b981', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(16,185,129,0.4)',
          transition: 'transform 0.2s, box-shadow 0.2s',
          zIndex: 1001,
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.08)'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(16,185,129,0.5)' }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(16,185,129,0.4)' }}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M5 5L15 15M15 5L5 15" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 18 18" fill="none">
            <path d="M3 13L7 8.5L10 11L14 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>
    </>
  )
}
