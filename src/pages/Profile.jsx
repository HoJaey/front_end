import { useState } from 'react'

const FOLLOWERS = [
  { name: '김민재', handle: '@minjae_invest', color: '#111', mutual: false },
  { name: '박서연', handle: '@seoyeon_stock', color: '#3b82f6', mutual: true },
  { name: '이도현', handle: '@dohyun_fx', color: '#ef4444', mutual: false },
  { name: '정하늘', handle: '@haneul_trade', color: '#f59e0b', mutual: true },
  { name: '윤지아', handle: '@jia_news', color: '#8b5cf6', mutual: false },
  { name: '한소은', handle: '@soeun_chart', color: '#10b981', mutual: true },
]
const FOLLOWING = FOLLOWERS.slice(1, 4)

export default function Profile({ setPage, setLoggedIn, darkMode }) {
  const [tab, setTab] = useState('followers')
  const [search, setSearch] = useState('')
  const list = tab === 'followers' ? FOLLOWERS : FOLLOWING
  const filtered = list.filter(u => !search || u.name.includes(search) || u.handle.includes(search))

  const dm = darkMode
  const card = dm ? '#1e1e1e' : '#fff'
  const border = dm ? 'rgba(255,255,255,0.06)' : '#f0f0f0'
  const border2 = dm ? 'rgba(255,255,255,0.06)' : '#f5f5f5'
  const text1 = dm ? '#f0f0f0' : '#111'
  const text2 = dm ? '#999' : '#aaa'
  const text3 = dm ? '#aaa' : '#555'
  const tabActiveBg = dm ? '#f0f0f0' : '#111'
  const tabActiveColor = dm ? '#111' : '#fff'
  const tabInactiveBg = dm ? '#252525' : '#fff'
  const tabBorder = dm ? 'rgba(255,255,255,0.1)' : '#e5e7eb'
  const inputBorder = dm ? 'rgba(255,255,255,0.1)' : '#e5e7eb'
  const btnBg = dm ? '#252525' : '#fff'
  const btnColor = dm ? '#aaa' : '#555'

  return (
    <div style={{ padding: '32px', flex: 1 }}>
      {/* Profile header */}
      <div style={{ background: card, borderRadius: 16, padding: '28px', border: `1px solid ${border}`, marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 24, flexShrink: 0 }}>이</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 800, fontSize: 20, color: text1 }}>이건우</div>
            <div style={{ fontSize: 13, color: text2, marginTop: 2 }}>gunwoo.lee@hojaey.com</div>
          </div>
          <div style={{ display: 'flex', gap: 32, textAlign: 'center' }}>
            {[{ label: '팔로워', val: 6 }, { label: '팔로잉', val: 5 }, { label: '관심종목', val: 2 }].map(s => (
              <div key={s.label}>
                <div style={{ fontWeight: 800, fontSize: 18, color: text1 }}>{s.val}</div>
                <div style={{ fontSize: 12, color: text2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs + search */}
      <div style={{ background: card, borderRadius: 16, border: `1px solid ${border}`, overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', padding: '12px 20px', borderBottom: `1px solid ${border2}`, gap: 4 }}>
          <button onClick={() => setTab('followers')} style={{
            padding: '6px 16px', borderRadius: 8, fontSize: 13, cursor: 'pointer', border: '1px solid',
            background: tab === 'followers' ? tabActiveBg : tabInactiveBg,
            color: tab === 'followers' ? tabActiveColor : text3,
            borderColor: tab === 'followers' ? tabActiveBg : tabBorder,
          }}>팔로워 {FOLLOWERS.length}</button>
          <button onClick={() => setTab('following')} style={{
            padding: '6px 16px', borderRadius: 8, fontSize: 13, cursor: 'pointer', border: '1px solid',
            background: tab === 'following' ? tabActiveBg : tabInactiveBg,
            color: tab === 'following' ? tabActiveColor : text3,
            borderColor: tab === 'following' ? tabActiveBg : tabBorder,
          }}>팔로잉 {FOLLOWING.length}</button>
          <div style={{ flex: 1 }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="이름 또는 아이디로 검색"
            style={{ padding: '6px 14px', border: `1px solid ${inputBorder}`, borderRadius: 8, fontSize: 13, outline: 'none', color: text1, width: 220, background: dm ? '#252525' : '#fff' }} />
        </div>

        {filtered.map((u, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', padding: '14px 20px',
            borderBottom: i < filtered.length - 1 ? `1px solid ${border2}` : 'none',
          }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: u.color === '#111' ? (dm ? '#444' : '#111') : u.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 15, marginRight: 14, flexShrink: 0 }}>
              {u.name[0]}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 14, color: text1 }}>{u.name}</div>
              <div style={{ fontSize: 12, color: text2, marginTop: 1 }}>{u.handle}</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={{
                padding: '6px 14px', borderRadius: 8, fontSize: 12, cursor: 'pointer', border: '1px solid',
                background: u.mutual ? '#10b981' : btnBg,
                color: u.mutual ? '#fff' : btnColor,
                borderColor: u.mutual ? '#10b981' : tabBorder,
                fontWeight: 600,
              }}>{u.mutual ? '맞팔로우' : '언팔로우'}</button>
              <button style={{ padding: '6px 14px', borderRadius: 8, fontSize: 12, cursor: 'pointer', border: `1px solid ${tabBorder}`, background: btnBg, color: btnColor }}>삭제</button>
            </div>
          </div>
        ))}
      </div>

      <button onClick={() => { setLoggedIn(false); setPage('login') }}
        style={{ marginTop: 16, padding: '10px 20px', borderRadius: 8, border: '1px solid #fecaca', background: dm ? 'transparent' : '#fff', color: '#ef4444', fontSize: 13, cursor: 'pointer' }}>
        로그아웃
      </button>
    </div>
  )
}
