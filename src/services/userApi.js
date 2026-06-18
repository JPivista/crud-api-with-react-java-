import { ENDPOINTS } from '../config/api'

async function parseResponse(response) {
  const text = await response.text()
  let data = null

  if (text) {
    try {
      data = JSON.parse(text)
    } catch {
      data = text
    }
  }

  if (!response.ok) {
    const message =
      typeof data === 'object' && data !== null
        ? data.message || data.error || JSON.stringify(data)
        : data || response.statusText

    throw new Error(message || `Request failed (${response.status})`)
  }

  return data
}

export async function fetchAllUsers() {
  const response = await fetch(ENDPOINTS.allUsers)
  const data = await parseResponse(response)

  if (Array.isArray(data)) {
    return data
  }

  if (data && Array.isArray(data.users)) {
    return data.users
  }

  if (data && Array.isArray(data.data)) {
    return data.data
  }

  return []
}

export async function createUser(userData) {
  const response = await fetch(ENDPOINTS.createUser, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })

  return parseResponse(response)
}

export async function updateUser(id, userData) {
  const response = await fetch(ENDPOINTS.updateUser(id), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })

  return parseResponse(response)
}

export async function deleteUser(id) {
  const response = await fetch(ENDPOINTS.deleteUser(id), {
    method: 'DELETE',
  })

  return parseResponse(response)
}

export function getUserId(user) {
  return user.id ?? user._id ?? user.userId
}
