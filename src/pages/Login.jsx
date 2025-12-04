import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Header from '../components/Header'
import './Auth.css'

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Implement login logic
    console.log('Login:', { email, password })
    // Navigate to home after successful login
    navigate('/')
  }

  return (
    <div className="auth-page">
      <Header />
      <div className="auth-background" aria-hidden="true"></div>
      <div className="auth-container">
        <div className="auth-card">
          <h1 className="auth-title">Вход</h1>
          <form onSubmit={handleSubmit} className="auth-form">
            <input
              type="email"
              placeholder="Почта"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input"
              required
            />
            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="auth-input"
              required
            />
            <div className="auth-link-container">
              <span>Нет аккаунта? </span>
              <Link to="/register" className="auth-link">
                Регистрация
              </Link>
            </div>
            <button type="submit" className="auth-submit-btn">
              Войти
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login

