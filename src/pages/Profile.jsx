import React from 'react'
import Header from '../components/Header'
import { clearAccessToken } from '../lib/auth'
import { useAuth } from '../lib/useAuth'
import './Profile.css'

const Profile = () => {
  const { email, password, isAuthenticated } = useAuth()
  const [showPassword, setShowPassword] = React.useState(false)

  const handleAvatarClick = () => {
    // TODO: Implement avatar change
    console.log('Change avatar clicked')
  }

  const handleLogout = () => clearAccessToken()

  return (
    <div className="profile-page">
      <Header />
      <div className="profile-container">
        <div className="profile-card">
          <h1 className="profile-title justify-center">Профиль</h1>
          <div className="profile-content">
            <div className="profile-avatar-container">
              <div className="profile-avatar">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <button className="avatar-edit-btn" onClick={handleAvatarClick}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </button>
            </div>

            <div className="profile-fields">
              <input
                type="email"
                value={email || ''}
                readOnly
                className="profile-input"
                placeholder="Почта"
              />
              <div className="password-field">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password || '••••••••'}
                  readOnly
                  className="profile-input password-input"
                  placeholder="Пароль"
                />
                <button
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  title={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  )}
                </button>
              </div>
              {isAuthenticated ? (
                <button className="change-password-link" onClick={handleLogout}>
                  Выйти
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile

