const baseURL = import.meta.env.VITE_API_BASE_URL || '/api'

const buildUrl = (path) => {
  const normalizedBase = baseURL.replace(/\/$/, '')
  const normalizedPath = path.replace(/^\//, '')
  return `${normalizedBase}/${normalizedPath}`
}

const api = {
  async get(path, options = {}) {
    const response = await fetch(buildUrl(path), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      ...options,
    })

    if (!response.ok) {
      const text = await response.text()
      throw new Error(`API request failed: ${response.status} ${response.statusText} - ${text}`)
    }

    const data = await response.json()
    return { data, status: response.status, statusText: response.statusText }
  },
}

export default api
