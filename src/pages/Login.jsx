import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Header from '../components/Header'
import { api } from '../lib/api'
import { setAccessToken, setUserData } from '../lib/auth'
import './Auth.css'

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const data = await api.login(email, password)
      if (!data?.access_token) throw new Error('Не удалось получить токен')
      setAccessToken(data.access_token, { token_type: data.token_type })
      setUserData(email, password)
      navigate('/')
    } catch (e2) {
      setError(e2?.message || 'Ошибка входа')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <Header />
      <div className="auth-background" aria-hidden="true"></div>
      <div className="auth-container">
        <div className="auth-card">
          <h1 className="auth-title">Вход</h1>
          {error ? <div className="auth-error">{error}</div> : null}
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
            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? 'Вход...' : 'Войти'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login

