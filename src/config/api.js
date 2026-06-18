const SERVER_URL =
  import.meta.env.VITE_API_SERVER_URL || 'http://192.168.1.34:8080'

export const API_BASE_URL = import.meta.env.DEV
  ? '/api/crud/users'
  : `${SERVER_URL}/api/crud/users`

export const ENDPOINTS = {
  createUser: API_BASE_URL,
  allUsers: `http://192.168.1.34:8080/api/crud/users/all_users`,
  deleteUser: (id) => `${API_BASE_URL}/delete/${id}`,
  updateUser: (id) => `${API_BASE_URL}/update/${id}`,
}

export const SERVER_DISPLAY_URL = `${SERVER_URL}/api/crud/users`