import React, { useState } from 'react'
import Header from '../components/Header'
import './Profile.css'

const Profile = () => {
  const [email, setEmail] = useState('user@example.com')
  const [password, setPassword] = useState('••••••••')
  const [showChangePassword, setShowChangePassword] = useState(false)

  const handleAvatarClick = () => {
    // TODO: Implement avatar change
    console.log('Change avatar clicked')
  }

  const handleChangePassword = () => {
    setShowChangePassword(!showChangePassword)
    // TODO: Implement password change logic
  }

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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="profile-input"
                placeholder="Почта"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="profile-input"
                placeholder="Пароль"
                disabled={!showChangePassword}
              />
              <button className="change-password-link" onClick={handleChangePassword}>
                Изменить пароль
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile

