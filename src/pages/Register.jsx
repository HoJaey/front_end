import { useState } from 'react'

export default function Register({ setPage, darkMode }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' })

  function handleSubmit(e) {
    e.preventDefault()
    setPage('login')
  }

  const dm = darkMode
  const bg = dm ? '#0f0f0f' : '#f5f5f5'
  const card = dm ? '#1e1e1e' : '#fff'
  const border = dm ? 'rgba(255,255,255,0.06)' : '#e5e7eb'
  const text1 = dm ? '#f0f0f0' : '#111'
  const text2 = dm ? '#666' : '#aaa'
  const inputColor = dm ? '#e0e0e0' : '#333'
  const inputBg = dm ? '#252525' : '#fff'

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

        <h2 style={{ fontSize: 26, fontWeight: 800, color: text1, marginBottom: 6 }}>회원가입</h2>
        <p style={{ fontSize: 13, color: text2, marginBottom: 28 }}>무료로 시작하세요</p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input
            type="text"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            placeholder="이름"
            style={{ border: `1px solid ${border}`, borderRadius: 12, padding: '14px 16px', fontSize: 14, outline: 'none', color: inputColor, background: inputBg }}
            onFocus={e => e.target.style.borderColor = '#10b981'}
            onBlur={e => e.target.style.borderColor = border}
          />
          <input
            type="email"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            placeholder="이메일"
            style={{ border: `1px solid ${border}`, borderRadius: 12, padding: '14px 16px', fontSize: 14, outline: 'none', color: inputColor, background: inputBg }}
            onFocus={e => e.target.style.borderColor = '#10b981'}
            onBlur={e => e.target.style.borderColor = border}
            autoComplete="email"
          />
          <input
            type="password"
            value={form.password}
            onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
            placeholder="비밀번호"
            style={{ border: `1px solid ${border}`, borderRadius: 12, padding: '14px 16px', fontSize: 14, outline: 'none', color: inputColor, background: inputBg }}
            onFocus={e => e.target.style.borderColor = '#10b981'}
            onBlur={e => e.target.style.borderColor = border}
            autoComplete="new-password"
          />
          <button
            type="submit"
            style={{ background: '#10b981', color: '#fff', border: 'none', borderRadius: 12, padding: '14px', fontSize: 15, fontWeight: 700, cursor: 'pointer', marginTop: 4 }}
          >
            가입하기
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: 13, color: text2, marginTop: 20 }}>
          이미 계정이 있으신가요?{' '}
          <button onClick={() => setPage('login')} style={{ color: '#10b981', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', fontSize: 13 }}>로그인</button>
        </p>
      </div>
    </div>
  )
}
