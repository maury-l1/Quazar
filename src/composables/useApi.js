const BASE_URL = 'http://localhost:3000'

export function useApi() {
  const get = async (endpoint) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      credentials: 'include'
    })
    if (!res.ok) {
      const error = await res.json()
      throw new Error(error.statusMessage ?? `Error ${res.status}`)
    }
    return res.json()
  }

  const post = async (endpoint, body) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      credentials: 'include'
    })
    if (!res.ok) {
      const error = await res.json()
      throw new Error(error.statusMessage ?? `Error ${res.status}`)
    }
    return res.json()
  }
  const put = async (endpoint, body) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        credentials: 'include'
    })
    if (!res.ok) {
        const error = await res.json()
        throw new Error(error.statusMessage ?? `Error ${res.status}`)
    }
    return res.json()
}

const remove = async (endpoint) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'DELETE',
        credentials: 'include'
    })
    if (!res.ok) {
        const error = await res.json()
        throw new Error(error.statusMessage ?? `Error ${res.status}`)
    }
    return res.json()
}

  return { get, post, put, remove }
}