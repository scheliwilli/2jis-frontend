import React from 'react'
import './Logo.css'

const Logo = ({ onClick }) => {
  return (
    <button type="button" className="logo-container" onClick={onClick} aria-label="Перейти на главную">
      <span className="logo-text">trust'</span>
    </button>
  )
}

export default Logo
