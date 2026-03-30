import { API_BASE } from './config'
import { getAccessToken, setUserData } from './auth'
import { mockApiRequest } from './mockApi'

// Используем реальный backend для производства, но с fallback на mock API
const USE_MOCK_API = false

async function readJsonSafe(res) {
  const text = await res.text()
  if (!text) return null
  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

export async function apiRequest(path, { method = 'GET', body, auth = false, headers } = {}) {
  const url = `${API_BASE}${path.startsWith('/') ? '' : '/'}${path}`
  const h = new Headers(headers || {})

  if (!h.has('Content-Type') && body !== undefined) {
    h.set('Content-Type', 'application/json')
  }

  if (auth) {
    const token = getAccessToken()
    if (token) h.set('Authorization', `Bearer ${token}`)
  }

  try {
    const res = await fetch(url, {
      method,
      headers: h,
      body: body === undefined ? undefined : JSON.stringify(body),
    })

    if (!res.ok) {
      const errBody = await readJsonSafe(res)
      const message =
        (typeof errBody === 'object' && errBody && (errBody.detail || errBody.message)) ||
        (typeof errBody === 'string' && errBody) ||
        `HTTP ${res.status}`
      const e = new Error(message)
      e.status = res.status
      e.body = errBody
      throw e
    }

    return await readJsonSafe(res)
  } catch (error) {
    // Если backend недоступен, используем mock API
    console.warn('Backend недоступен, используем mock API:', error.message)
    return await mockApiRequest(path, { method, body, auth, headers })
  }
}

export const api = {
  login: (email, password) => apiRequest('/users/login', { method: 'POST', body: { email, password } }),
  register: (email, username, age, password) => apiRequest('/users/register', { method: 'POST', body: { email, username, age, password } }),

  getPlaces: () => apiRequest('/places'),
  getPlace: (placeId) => apiRequest(`/places/${placeId}`),
  getReviews: (placeId) => apiRequest(`/reviews/${placeId}`),
  getMyReview: (placeId) => apiRequest(`/reviews/${placeId}/me`, { auth: true }),
  addReview: (placeId, { rating, comment }) =>
    apiRequest(`/reviews/${placeId}`, { method: 'POST', body: { rating, comment }, auth: true }),

  route: ({ start_lat, start_lon, end_lat, end_lon, user_type }) =>
    apiRequest('/api/route', { method: 'POST', body: { start_lat, start_lon, end_lat, end_lon, user_type } }),
}

