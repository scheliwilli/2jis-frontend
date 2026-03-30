// Mock API для разработки когда backend недоступен
import { getAccessToken, setAccessToken, setUserData } from './auth'

// Симуляция задержки сети
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms))

// Mock данные - реальные места Новосибирска
const mockPlaces = [
  {
    id: 1,
    name: 'Новосибирский государственный театр оперы и балета',
    description: 'Главный театр города, один из крупнейших в России',
    latitude: 55.0366,
    longitude: 82.8985,
    average_rating: 0,
  },
  {
    id: 2,
    name: 'Красный проспект',
    description: 'Центральная улица Новосибирска с магазинами и кафе',
    latitude: 55.0375,
    longitude: 82.8998,
    average_rating: 0,
  },
  {
    id: 3,
    name: 'Новосибирский музей изобразительных искусств',
    description: 'Художественный музей с коллекциями русского искусства',
    latitude: 55.0405,
    longitude: 82.8945,
    average_rating: 0,
  },
  {
    id: 4,
    name: 'Парк имени Горького',
    description: 'Большой парк в центре города с атракционами и прогулочными дорожками',
    latitude: 55.0295,
    longitude: 82.9125,
    average_rating: 0,
  },
  {
    id: 5,
    name: 'ТРЦ "Аура"',
    description: 'Современный торговый центр с множеством магазинов и ресторанов',
    latitude: 55.0421,
    longitude: 82.9015,
    average_rating: 0,
  },
  {
    id: 6,
    name: 'Государственная публичная научно-техническая библиотека Сибири',
    description: 'Крупная библиотека с обширной коллекцией книг',
    latitude: 55.0380,
    longitude: 82.9045,
    average_rating: 0,
  },
  {
    id: 7,
    name: 'Культурно-деловой центр "Портал"',
    description: 'Творческое пространство для культурных событий',
    latitude: 55.0405,
    longitude: 82.8945,
    average_rating: 0,
  },
  {
    id: 8,
    name: 'Монумент "Мать-Россия"',
    description: 'Знаменитый памятник-символ города на берегу Оби',
    latitude: 55.0350,
    longitude: 82.9065,
    average_rating: 0,
  },
  {
    id: 9,
    name: 'Зоопарк Новосибирска',
    description: 'Крупнейший зоопарк России с разнообразными животными',
    latitude: 55.0128,
    longitude: 82.9178,
    average_rating: 0,
  },
  {
    id: 10,
    name: 'Новосибирский планетарий',
    description: 'Планетарий с современными астрономическими шоу',
    latitude: 55.0280,
    longitude: 82.8925,
    average_rating: 0,
  },
]

const mockUsers = [
  {
    email: 'test@example.com',
    username: 'testuser',
    password: '123456',
    age: 25,
  },
  {
    email: 'user@example.com',
    username: 'user123',
    password: 'password',
    age: 30,
  },
]

const mockReviews = {
  1: [
    { id: 1, rating: 5, accessibility: { wheelchairs: true, sim: true, mobility: true }, user_id: 1, created_at: '2026-03-20T10:00:00' },
  ],
  3: [
    { id: 2, rating: 4, accessibility: { wheelchairs: true, sim: false, mobility: true }, user_id: 1, created_at: '2026-03-20T09:00:00' },
  ],
  8: [
    { id: 3, rating: 5, accessibility: { wheelchairs: true, sim: true, mobility: true }, user_id: 1, created_at: '2026-03-20T08:00:00' },
  ],
}

export const mockApiRequest = async (path, options = {}) => {
  await delay()

  const { method = 'GET', body, auth = false } = options

  try {
    // Регистрация
    if (path === '/users/register' && method === 'POST') {
      const newUser = body
      const exists = mockUsers.find(u => u.email === newUser.email)
      if (exists) {
        const err = new Error('Аккаунт с такой почтой уже существует')
        err.status = 400
        throw err
      }
      mockUsers.push(newUser)
      // Сохраняем данные пользователя и токен
      const token = 'mock-token-' + Date.now()
      setAccessToken(token)
      setUserData(newUser.email, newUser.password)
      return { message: 'Новый профиль создан' }
    }

    // Вход
    if (path === '/users/login' && method === 'POST') {
      const user = mockUsers.find(u => u.email === body.email && u.password === body.password)
      if (!user) {
        const err = new Error('Неправильные учётные данные')
        err.status = 401
        throw err
      }
      const token = 'mock-token-' + Date.now()
      setAccessToken(token)
      setUserData(user.email, user.password)
      return { access_token: token, token_type: 'bearer' }
    }

    // Получение мест
    if (path === '/places' && method === 'GET') {
      return mockPlaces
    }

    // Получение отзывов места
    if (path.startsWith('/reviews/') && method === 'GET') {
      const parts = path.slice(1).split('/')
      if (parts.length === 3 && parts[2] === 'me') {
        // /reviews/{id}/me
        const placeId = parseInt(parts[1])
        const reviews = mockReviews[placeId] || []
        return reviews[0] || null
      } else if (parts.length === 2) {
        // /reviews/{id}
        const placeId = parseInt(parts[1])
        return mockReviews[placeId] || []
      }
    }

    // Добавление отзыва
    if (path.startsWith('/reviews/') && method === 'POST') {
      const placeId = parseInt(path.split('/')[2])
      const newReview = { 
        id: Date.now(), 
        rating: body.rating,
        accessibility: body.accessibility || { wheelchairs: null, sim: null, mobility: null },
        user_id: 1, // Симуляция текущего пользователя
        created_at: new Date().toISOString()
      }
      if (!mockReviews[placeId]) {
        mockReviews[placeId] = []
      }
      mockReviews[placeId].push(newReview)
      
      // Пересчитываем средний рейтинг места
      const place = mockPlaces.find(p => p.id === placeId)
      if (place && mockReviews[placeId].length > 0) {
        const ratings = mockReviews[placeId].map(r => r.rating)
        place.average_rating = Math.round((ratings.reduce((a, b) => a + b, 0) / ratings.length) * 10) / 10
      }
      
      return newReview
    }

    // Маршрут
    if (path === '/api/route' && method === 'POST') {
      const { start_lat, start_lon, end_lat, end_lon } = body
      return {
        route: [
          [start_lat, start_lon],
          [(start_lat + end_lat) / 2, (start_lon + end_lon) / 2],
          [end_lat, end_lon],
        ],
      }
    }

    const err = new Error(`Unknown API endpoint: ${method} ${path}`)
    err.status = 404
    throw err
  } catch (error) {
    // Пробрасываем ошибку дальше
    throw error
  }
}

// Функция для удаления пользователя (вспомогательная для разработки)
export const deleteUserByEmail = (email) => {
  const index = mockUsers.findIndex(u => u.email === email)
  if (index !== -1) {
    mockUsers.splice(index, 1)
    return true
  }
  return false
}
