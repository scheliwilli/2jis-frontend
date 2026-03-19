import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Header from '../components/Header'
import { api } from '../lib/api'
import './Auth.css'

const Register = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [telegram, setTelegram] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      // backend принимает только email+password
      await api.register(email, password)
      navigate('/login')
    } catch (e2) {
      setError(e2?.message || 'Ошибка регистрации')
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
          <h1 className="auth-title">Регистрация</h1>
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
              type="text"
              placeholder="Тег"
              value={telegram}
              onChange={(e) => setTelegram(e.target.value)}
              className="auth-input"
            />
            <input
              type="text"
              placeholder="Имя пользователя"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="auth-input"
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
              <span>Уже есть аккаунт? </span>
              <Link to="/login" className="auth-link">
                Войти
              </Link>
            </div>
            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? 'Регистрация...' : 'Регистрация'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register

