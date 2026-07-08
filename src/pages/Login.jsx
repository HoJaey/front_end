import { useState } from 'react'

export default function Login({ setPage, setLoggedIn, darkMode }) {
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')

  const dm = darkMode
  const bg = dm ? '#0f0f0f' : '#f5f5f5'
  const card = dm ? '#1e1e1e' : '#fff'
  const border = dm ? 'rgba(255,255,255,0.06)' : '#e5e7eb'
  const text1 = dm ? '#f0f0f0' : '#111'
  const text2 = dm ? '#666' : '#aaa'
  const inputColor = dm ? '#e0e0e0' : '#333'

  return (
    <div style={{ minHeight: '100vh', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: card, borderRadius: 24, padding: '48px 44px', width: 440, boxShadow: '0 4px 32px rgba(0,0,0,0.12)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
          <div style={{ width: 36, height: 36, background: '#10b981', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
              <path d="M3 13L7 8.5L10 11L14 6" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span style={{ fontWeight: 800, fontSize: 18, color: text1 }}>HoJaey</span>
        </div>

        <h2 style={{ fontSize: 26, fontWeight: 800, color: text1, marginBottom: 6 }}>로그인</h2>
        <p style={{ fontSize: 13, color: text2, marginBottom: 28 }}>뉴스 감성분석으로 투자 신호를 확인하세요</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="이메일"
            style={{ border: `1px solid ${border}`, borderRadius: 12, padding: '14px 16px', fontSize: 14, outline: 'none', color: inputColor, background: dm ? '#252525' : '#fff' }}
            onFocus={e => e.target.style.borderColor = '#10b981'} onBlur={e => e.target.style.borderColor = border}
            autoComplete="email" />
          <input type="password" value={pw} onChange={e => setPw(e.target.value)} placeholder="비밀번호"
            style={{ border: `1px solid ${border}`, borderRadius: 12, padding: '14px 16px', fontSize: 14, outline: 'none', color: inputColor, background: dm ? '#252525' : '#fff' }}
            onFocus={e => e.target.style.borderColor = '#10b981'} onBlur={e => e.target.style.borderColor = border}
            autoComplete="current-password" />
          <button onClick={() => { setLoggedIn(true); setPage('dashboard') }}
            style={{ background: '#10b981', color: '#fff', border: 'none', borderRadius: 12, padding: '14px', fontSize: 15, fontWeight: 700, cursor: 'pointer', marginTop: 4 }}>
            로그인
          </button>
        </div>

        <p style={{ textAlign: 'center', fontSize: 13, color: text2, marginTop: 20 }}>
          계정이 없으신가요?{' '}
          <button onClick={() => setPage('register')} style={{ color: '#10b981', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', fontSize: 13 }}>회원가입</button>
        </p>
      </div>
    </div>
  )
}
