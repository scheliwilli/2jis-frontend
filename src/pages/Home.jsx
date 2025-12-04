import React from 'react'
import Header from '../components/Header'
import './Home.css'

const Home = () => {
  return (
    <div className="home">
      <Header />
      <div className="map-wrapper">
        <img src="/fckcrsr.png" alt="Схема карты доступности" className="map-placeholder" />
      </div>
    </div>
  )
}

export default Home

