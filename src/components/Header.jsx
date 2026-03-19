import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Logo from './Logo'
import { clearAccessToken } from '../lib/auth'
import { useAuth } from '../lib/useAuth'
import './Header.css'

const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const isAboutPage = location.pathname === '/about'
  const { isAuthenticated } = useAuth()

  const handleNavigateHome = () => navigate('/')
  const handleAboutClick = () => {
    if (!isAboutPage) navigate('/about')
  }
  const handleProfileClick = () => navigate('/profile')
  const handleLoginClick = () => navigate('/login')
  const handleLogout = () => {
    clearAccessToken()
    navigate('/')
  }

  return (
    <header className="header">
      <div className="header-content">
        <Logo onClick={handleNavigateHome} />
        <div className="header-actions">
          <button
            className={`btn-pill ${isAboutPage ? 'active' : ''}`}
            onClick={handleAboutClick}
            aria-current={isAboutPage ? 'page' : undefined}
          >
            О нас
          </button>

          {!isAuthenticated ? (
            <button type="button" className="btn-pill" onClick={handleLoginClick}>
              Войти
            </button>
          ) : (
            <>
              <button
                type="button"
                className="profile-icon"
                onClick={handleProfileClick}
                aria-label="Перейти в профиль"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </button>
              <button type="button" className="btn-pill btn-pill-light" onClick={handleLogout}>
                Выйти
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header

