import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Logo from './Logo'
import './Header.css'

const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const isAboutPage = location.pathname === '/about'

  const handleNavigateHome = () => navigate('/')
  const handleAboutClick = () => {
    if (!isAboutPage) navigate('/about')
  }
  const handleProfileClick = () => navigate('/profile')

  return (
    <header className="header">
      <div className="header-content">
        <Logo onClick={handleNavigateHome} />
        <div className="header-actions">
          <button
            className={`btn-about ${isAboutPage ? 'active' : ''}`}
            onClick={handleAboutClick}
            aria-current={isAboutPage ? 'page' : undefined}
          >
            О нас
          </button>
          <button type="button" className="profile-icon" onClick={handleProfileClick} aria-label="Перейти в профиль">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header

