import React, { useEffect, useMemo, useState } from 'react'
import Header from '../components/Header'
import Map from '../components/Map'
import PlacePanels from '../components/PlacePanels'
import { api } from '../lib/api'
import { useAuth } from '../lib/useAuth'
import './Home.css'

const Home = () => {
  const { isAuthenticated } = useAuth()
  const [places, setPlaces] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [selectedPlace, setSelectedPlace] = useState(null)
  const [reviews, setReviews] = useState([])
  const [myReview, setMyReview] = useState(null)

  const [routePoints, setRoutePoints] = useState([]) // [[lat, lng], [lat, lng]]
  const [routeCoords, setRouteCoords] = useState([])
  const [userType, setUserType] = useState('wheelchair') // wheelchair | sim | mobility

  const center = useMemo(() => [55.042135, 82.90138], [])

  const loadPlaces = async () => {
    setError('')
    setLoading(true)
    console.log('Loading places...')
    try {
      const data = await api.getPlaces()
      console.log('Places loaded:', data)
      setPlaces(Array.isArray(data) ? data : [])
    } catch (e) {
      console.error('Error loading places:', e)
      setError(e?.message || 'Не удалось загрузить места')
      // Даже если произошла ошибка, все равно показываем карту с empty places
      setPlaces([])
    } finally {
      setLoading(false)
    }
  }

  const loadPlacePanels = async (place) => {
    setSelectedPlace(place)
    setReviews([])
    setMyReview(null)
    try {
      const [rv] = await Promise.all([api.getReviews(place.id)])
      setReviews(Array.isArray(rv) ? rv : [])
    } catch {
      setReviews([])
    }
    if (isAuthenticated) {
      try {
        const mr = await api.getMyReview(place.id)
        setMyReview(mr)
      } catch {
        setMyReview(null)
      }
    }
  }

  const reloadSelected = async () => {
    if (!selectedPlace) return
    await loadPlacePanels(selectedPlace)
    await loadPlaces()
  }

  useEffect(() => {
    loadPlaces()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    // если пользователь залогинился/вышел — перезагрузим "мой отзыв" для открытого места
    if (!selectedPlace) return
    loadPlacePanels(selectedPlace)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])

  const onMapClick = async (latlng) => {
    const next = [...routePoints, [latlng.lat, latlng.lng]].slice(-2)
    setRoutePoints(next)
    if (next.length === 2) {
      try {
        const res = await api.route({
          start_lat: next[0][0],
          start_lon: next[0][1],
          end_lat: next[1][0],
          end_lon: next[1][1],
          user_type: userType,
        })
        setRouteCoords(Array.isArray(res?.route) ? res.route : [])
      } catch {
        setRouteCoords([])
      }
    } else {
      setRouteCoords([])
    }
  }

  return (
    <div className="home">
      <Header />
      <div className="map-wrapper">
        <div className="route-user-type">
          <button
            className={`route-pill ${userType === 'wheelchair' ? 'active' : ''}`}
            onClick={() => setUserType('wheelchair')}
          >
            Коляска
          </button>
          <button className={`route-pill ${userType === 'sim' ? 'active' : ''}`} onClick={() => setUserType('sim')}>
            СИМ
          </button>
          <button
            className={`route-pill ${userType === 'mobility' ? 'active' : ''}`}
            onClick={() => setUserType('mobility')}
          >
            Маломобильные
          </button>
        </div>
        
        <Map
          center={center}
          zoom={15}
          places={places}
          onMarkerClick={loadPlacePanels}
          onMapClick={onMapClick}
          routeCoords={routeCoords}
          interactive
        />
        
        {loading ? <div className="home-toast">Загрузка...</div> : null}
        {error ? <div className="home-toast error">{error}</div> : null}

        {selectedPlace ? (
          <PlacePanels
            place={selectedPlace}
            reviews={reviews}
            myReview={myReview}
            onClose={() => setSelectedPlace(null)}
            onReviewAdded={reloadSelected}
          />
        ) : null}
      </div>
    </div>
  )
}

export default Home

