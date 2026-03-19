import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function PlaceDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  // Исторический маршрут. Теперь детали места показываются прямо на главной карте.
  React.useEffect(() => {
    navigate('/', { replace: true })
  }, [navigate, id])
  return null
}

