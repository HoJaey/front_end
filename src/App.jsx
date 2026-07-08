import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Ranking from './pages/Ranking'
import Heatmap from './pages/Heatmap'
import Watchlist from './pages/Watchlist'
import Chatbot from './pages/Chatbot'
import Search from './pages/Search'
import Settings from './pages/Settings'
import StockDetail from './pages/StockDetail'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'

export default function App() {
  const [page, setPage] = useState('login')
  const [loggedIn, setLoggedIn] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [selectedStock, setSelectedStock] = useState(null)

  if (!loggedIn) {
    if (page === 'register') return <Register setPage={setPage} darkMode={darkMode} />
    return <Login setPage={setPage} setLoggedIn={setLoggedIn} darkMode={darkMode} />
  }

  const commonProps = { setPage, setSelectedStock, darkMode }

  const pages = {
    dashboard: <Dashboard {...commonProps} />,
    ranking: <Ranking {...commonProps} />,
    heatmap: <Heatmap {...commonProps} />,
    watchlist: <Watchlist {...commonProps} />,
    chatbot: <Chatbot darkMode={darkMode} />,
    search: <Search {...commonProps} />,
    settings: <Settings darkMode={darkMode} setDarkMode={setDarkMode} />,
    stockdetail: <StockDetail stock={selectedStock} setPage={setPage} darkMode={darkMode} />,
    profile: <Profile setPage={setPage} setLoggedIn={setLoggedIn} darkMode={darkMode} />,
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: darkMode ? '#0f0f0f' : '#f5f5f5' }}>
      <Sidebar page={page} setPage={setPage} darkMode={darkMode} setDarkMode={setDarkMode} />
      <main style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        {pages[page] || pages.dashboard}
      </main>
    </div>
  )
}
