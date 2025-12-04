import React from 'react'
import Header from '../components/Header'
import './About.css'

const About = () => {
  return (
    <div className="about-page">
      <Header />
      <div className="about-container">
        <div className="about-card">
          <h1 className="about-title">О нас</h1>
          <div className="about-divider" />
          <div className="about-content">
            <p className="about-paragraph highlight">
              <strong>trust'</strong> — карта доступности города для людей с ограниченными возможностями передвижения, пользователей СИМ.
            </p>
            <p className="about-paragraph">
              Наша карта показывает доступную среду города и строит маршруты через неё, доступную среду можно и нужно оценивать, также можно добавлять новые места на карту. Вся информация проходит верификацию.
            </p>
            <p className="about-cta">
              Вы можете на нас опереться!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About

