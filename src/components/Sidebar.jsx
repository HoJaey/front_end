import Toggle from './Toggle'

const NAV = [
  { key: 'dashboard', label: '대시보드' },
  { key: 'ranking',   label: '랭킹' },
  { key: 'heatmap',   label: '히트맵' },
  { key: 'watchlist', label: '관심종목' },
  { key: 'chatbot',   label: 'AI 챗봇' },
  { key: 'search',    label: '검색' },
  { key: 'settings',  label: '설정' },
]

export default function Sidebar({ page, setPage, darkMode, setDarkMode }) {
  const activePage = ['stockdetail', 'profile'].includes(page) ? '' : page
  const dm = darkMode
  const sideBg = dm ? '#161616' : '#fff'
  const borderColor = dm ? 'rgba(255,255,255,0.06)' : '#f0f0f0'
  const text1 = dm ? '#f0f0f0' : '#111'
  const text2 = dm ? '#999' : '#555'
  const profileBg = dm ? '#252525' : '#f5f5f5'
  const activeNavBg = dm ? '#1a3028' : '#e8f5f0'
  const hoverNavBg = dm ? '#252525' : '#f5f5f5'

  return (
    <aside style={{ width: 220, minHeight: '100vh', background: sideBg, borderRight: `1px solid ${borderColor}`, display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '20px 20px 16px' }}>
        <div style={{ width: 32, height: 32, background: '#10b981', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M3 13L7 8.5L10 11L14 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span style={{ fontWeight: 700, fontSize: 16, color: text1 }}>HoJaey</span>
      </div>

      {/* Profile */}
      <div
        onClick={() => setPage('profile')}
        style={{ margin: '0 12px 4px', padding: '10px 12px', background: profileBg, borderRadius: 12, display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
      >
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 14, flexShrink: 0 }}>이</div>
        <div>
          <div style={{ fontWeight: 600, fontSize: 13, color: text1 }}>이건우</div>
          <div style={{ fontSize: 11, color: '#10b981' }}>내 프로필 보기</div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '8px 12px' }}>
        {NAV.map(({ key, label }) => {
          const active = activePage === key
          return (
            <button
              key={key}
              onClick={() => setPage(key)}
              style={{
                width: '100%', textAlign: 'left', padding: '9px 14px',
                borderRadius: 10, fontSize: 14, cursor: 'pointer', border: 'none',
                display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2,
                background: active ? activeNavBg : 'transparent',
                color: active ? (dm ? '#34d399' : '#111') : text2,
                fontWeight: active ? 600 : 400,
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.background = hoverNavBg }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent' }}
            >
              {active && <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', flexShrink: 0 }} />}
              {label}
            </button>
          )
        })}
      </nav>

      {/* Dark mode */}
      <div style={{ padding: '12px 20px 20px', borderTop: `1px solid ${borderColor}` }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 13, color: text2 }}>다크 모드</span>
          <Toggle checked={darkMode} onChange={setDarkMode} />
        </div>
      </div>
    </aside>
  )
}
