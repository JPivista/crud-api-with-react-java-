import { useEffect, useState } from 'react'
import { createUser, updateUser } from '../services/userApi'

const emptyForm = {
  name: '',
  age: '',
}

export default function UserForm({
  editingUser,
  onSaved,
  onCancelEdit,
}) {
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(false)

  const isEditing = Boolean(editingUser)

  useEffect(() => {
    if (editingUser) {
      setForm({
        name: editingUser.name || '',
        age: editingUser.age || '',
      })
    } else {
      setForm(emptyForm)
    }
  }, [editingUser])

  const handleChange = (e) => {
    const { name, value } = e.target

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)

      if (isEditing) {
        await updateUser(editingUser.id, form)
      } else {
        await createUser(form)
      }

      setForm(emptyForm)
      await onSaved?.()
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
      <h2 className="mb-6 text-2xl font-bold text-slate-800">
        {isEditing ? '✏️ Update User' : '➕ Create User'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Full Name
          </label>

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter name"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Age
          </label>

          <input
            type="number"
            name="age"
            value={form.age}
            onChange={handleChange}
            placeholder="Enter age"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            required
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
          >
            {loading
              ? 'Saving...'
              : isEditing
              ? 'Update User'
              : 'Create User'}
          </button>

          {isEditing && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="rounded-xl bg-slate-200 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-300"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  )
}