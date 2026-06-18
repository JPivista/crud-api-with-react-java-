import { useEffect, useState } from 'react'
import { fetchAllUsers } from '../services/userApi'

export default function UserList() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchAllUsers()

        console.log('Full API Response:', data)

        if (Array.isArray(data)) {
          data.forEach((user) => {
            console.log('ID:', user.id)
            console.log('Name:', user.name)
            console.log('Age:', user.age)
          })

          setUsers(data)
        } else {
          console.error('Data is not an array:', data)
          setUsers([])
        }
      } catch (err) {
        console.error('Fetch Error:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadUsers()
  }, [])

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error: {error}</p>
  }

  return (
    <div>
      <h2>Users</h2>

      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        users.map((user) => (
          <div key={user.id}>
            <p>Name: {user.name}</p>
            <p>Age: {user.age}</p>
            <hr />
          </div>
        ))
      )}
    </div>
  )
}