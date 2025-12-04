import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header'
import './PlaceDetail.css'

const PlaceDetail = () => {
  const { id } = useParams()
  const [reviewText, setReviewText] = useState('')
  const [wheelchairAccess, setWheelchairAccess] = useState(null)
  const [simAccess, setSimAccess] = useState(null)
  const [mobilityAccess, setMobilityAccess] = useState(null)

  const icons = {
    wheelchair: {
      src: '/kol.svg',
      alt: 'Иконка коляска',
      label: 'Пригодно для колясочников',
    },
    sim: {
      src: '/vtlo.svg',
      alt: 'Иконка СИМ',
      label: 'Подойдёт для пользователей СИМ',
    },
    mobility: {
      src: '/ded.svg',
      alt: 'Иконка трость',
      label: 'Пригодно для маломобильных граждан',
    },
  }

  const [place] = useState({
    id: Number(id),
    address: id === '1' ? 'ул. Пушкина, дом 46' : 'ул. Ленина, дом 34',
    lat: 55.7558,
    lng: 37.6173,
    rating: 4.0,
    starRating: 4,
    wheelchairAccessible: true,
    simAccessible: true,
    mobilityAccessible: true,
    image: 'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&w=800&q=60',
    reviews: [
      { id: 1, user: 'Пользователь', text: 'Отличная доступность для инвалидной коляски.', color: '#000000' },
      { id: 2, user: 'Пользователь', text: 'Довольно удобное место.', color: '#8B4513' },
      { id: 3, user: 'Пользователь', text: 'Съезд с тротуара комфортный.', color: '#0000FF' },
    ],
  })

  const handleSubmitReview = (e) => {
    e.preventDefault()
    if (!reviewText.trim()) return
    console.log('Review submitted:', reviewText)
    setReviewText('')
  }

  const handleAccessibilityVote = (type, value) => {
    if (type === 'wheelchair') setWheelchairAccess(value)
    if (type === 'sim') setSimAccess(value)
    if (type === 'mobility') setMobilityAccess(value)
  }

  return (
    <div className="place-detail-page">
      <Header />
      <div className="map-wrapper">
        <img src="/fckcrsr.png" alt="Схема карты доступности" className="map-image" />
      </div>
      <div className="place-detail-panel">
        <div className="place-detail-content">
          <div className="place-info-section">
            <h2 className="place-address">{place.address}</h2>
            <div className="place-rating">
              <span className="rating-dot"></span>
              <span>Рейтинг: {place.rating.toFixed(1)}</span>
            </div>
            <div className="place-stars">
              {Array.from({ length: 5 }).map((_, index) => (
                <span key={index} className={index < place.starRating ? 'star filled' : 'star'}>
                  ★
                </span>
              ))}
            </div>
            <div className="accessibility-features">
              {place.wheelchairAccessible && (
                <div className="accessibility-item">
                  <img src={icons.wheelchair.src} alt={icons.wheelchair.alt} className="accessibility-icon" />
                  <span>{icons.wheelchair.label}</span>
                </div>
              )}
              {place.simAccessible && (
                <div className="accessibility-item">
                  <img src={icons.sim.src} alt={icons.sim.alt} className="accessibility-icon" />
                  <span>{icons.sim.label}</span>
                </div>
              )}
              {place.mobilityAccessible && (
                <div className="accessibility-item">
                  <img src={icons.mobility.src} alt={icons.mobility.alt} className="accessibility-icon" />
                  <span>{icons.mobility.label}</span>
                </div>
              )}
            </div>

            <div className="accessibility-questions">
              {[
                { id: 'wheelchair', label: 'Пригодно ли для колясочников?', icon: icons.wheelchair },
                { id: 'sim', label: 'Подойдёт ли для пользователей СИМ?', icon: icons.sim },
                { id: 'mobility', label: 'Пригодно ли для маломобильных граждан?', icon: icons.mobility },
              ].map((question) => (
                <div className="accessibility-question" key={question.id}>
                  <div className="question-header">
                    <img src={question.icon.src} alt={question.icon.alt} className="accessibility-icon" />
                    <span>{question.label}</span>
                  </div>
                  <div className="question-buttons">
                    <button
                      type="button"
                      className={`question-btn ${
                        (question.id === 'wheelchair' && wheelchairAccess === true) ||
                        (question.id === 'sim' && simAccess === true) ||
                        (question.id === 'mobility' && mobilityAccess === true)
                          ? 'active'
                          : ''
                      }`}
                      onClick={() => handleAccessibilityVote(question.id, true)}
                    >
                      Да
                    </button>
                    <button
                      type="button"
                      className={`question-btn ${
                        (question.id === 'wheelchair' && wheelchairAccess === false) ||
                        (question.id === 'sim' && simAccess === false) ||
                        (question.id === 'mobility' && mobilityAccess === false)
                          ? 'active'
                          : ''
                      }`}
                      onClick={() => handleAccessibilityVote(question.id, false)}
                    >
                      Нет
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="place-image-section">
            <img src={place.image} alt={place.address} className="place-image" />
          </div>

          <div className="place-reviews-section">
            <h3 className="reviews-title">Отзывы:</h3>
            <div className="reviews-list">
              {place.reviews.map((review) => (
                <div key={review.id} className="review-item">
                  <div className="review-avatar" style={{ backgroundColor: review.color }}></div>
                  <div className="review-content">
                    <div className="review-user">{review.user}</div>
                    <div className="review-text">{review.text}</div>
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSubmitReview} className="review-form">
              <input
                type="text"
                placeholder="Оставить отзыв..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="review-input"
              />
              <button type="submit" className="review-submit-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceDetail

