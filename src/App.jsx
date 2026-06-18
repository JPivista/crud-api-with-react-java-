import { useCallback, useEffect, useState } from 'react'
import UserForm from './components/UserForm'
import UserList from './components/UserList'
import { fetchAllUsers, getUserId } from './services/userApi'
import { SERVER_DISPLAY_URL } from './config/api'

function App() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editingUser, setEditingUser] = useState(null)

  const loadUsers = useCallback(async () => {
    setLoading(true)
    setError('')

    try {
      const data = await fetchAllUsers()
      setUsers(data)
    } catch (err) {
      setError(err.message || 'Failed to load users.')
      setUsers([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadUsers()
  }, [loadUsers])

  function handleEdit(user) {
    setEditingUser(user)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleCancelEdit() {
    setEditingUser(null)
  }

  function handleSaved() {
    setEditingUser(null)
    loadUsers()
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 text-center sm:px-6">
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-blue-600">
            React + Tailwind
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Users CRUD
          </h1>
          <p className="mt-2 text-sm text-slate-500">API: {SERVER_DISPLAY_URL}</p>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[360px_1fr]">
        <UserForm
          editingUser={editingUser}
          onSaved={handleSaved}
          onCancelEdit={handleCancelEdit}
        />
        <UserList
          users={users}
          loading={loading}
          error={error}
          editingUserId={editingUser ? getUserId(editingUser) : null}
          onRefresh={loadUsers}
          onEdit={handleEdit}
        />
      </main>
    </div>
  )
}

export default App
