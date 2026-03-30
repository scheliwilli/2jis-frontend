const STORAGE_KEY = 'trust.auth'

function base64UrlDecode(str) {
  // base64url -> base64
  const base64 = str.replace(/-/g, '+').replace(/_/g, '/')
  // pad
  const padded = base64 + '==='.slice((base64.length + 3) % 4)
  try {
    return atob(padded)
  } catch {
    return null
  }
}

export function getAccessToken() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const data = JSON.parse(raw)
    return typeof data?.access_token === 'string' ? data.access_token : null
  } catch {
    return null
  }
}

export function setAccessToken(access_token, meta = {}) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ access_token, ...meta }))
  window.dispatchEvent(new Event('trust:auth'))
}

export function setUserData(email, password) {
  const data = {
    email,
    password,
  }
  localStorage.setItem(STORAGE_KEY + ':user', JSON.stringify(data))
}

export function clearAccessToken() {
  localStorage.removeItem(STORAGE_KEY)
  localStorage.removeItem(STORAGE_KEY + ':user')
  window.dispatchEvent(new Event('trust:auth'))
}

export function getJwtEmail(token) {
  if (!token) return null
  const parts = token.split('.')
  if (parts.length < 2) return null
  const json = base64UrlDecode(parts[1])
  if (!json) return null
  try {
    const payload = JSON.parse(json)
    return typeof payload?.sub === 'string' ? payload.sub : null
  } catch {
    return null
  }
}

export function getAuthState() {
  const token = getAccessToken()
  
  // Получаем данные пользователя из localStorage
  let userData = {}
  try {
    const raw = localStorage.getItem(STORAGE_KEY + ':user')
    if (raw) {
      userData = JSON.parse(raw)
    }
  } catch {
    userData = {}
  }

  return {
    token,
    isAuthenticated: Boolean(token),
    email: userData.email || getJwtEmail(token),
    password: userData.password || null,
  }
}

