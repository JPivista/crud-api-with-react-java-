import { useEffect, useState } from 'react'
import { createUser, updateUser } from '../services/userApi'

const emptyForm = {
  name: '',
  email: '',
  phone: '',
}

const inputClassName =
  'w-full rounded-xl border border-slate-300 px-4 py-2.5 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100'

export default function UserForm({ editingUser, onSaved, onCancelEdit }) {
  const [form, setForm] = useState(emptyForm)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const isEditing = Boolean(editingUser)

  useEffect(() => {
    if (editingUser) {
      setForm({
        name: editingUser.name ?? '',
        email: editingUser.email ?? '',
        phone: editingUser.phone ?? '',
      })
    } else {
      setForm(emptyForm)
    }
    setError('')
    setSuccess('')
  }, [editingUser])

  function handleChange(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setError('')
    setSuccess('')
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setSubmitting(true)
    setError('')
    setSuccess('')

    try {
      if (isEditing) {
        const id = editingUser.id ?? editingUser._id ?? editingUser.userId
        await updateUser(id, form)
        setSuccess('User updated successfully.')
      } else {
        await createUser(form)
        setForm(emptyForm)
        setSuccess('User created successfully.')
      }

      onSaved?.()
    } catch (err) {
      setError(err.message || `Failed to ${isEditing ? 'update' : 'create'} user.`)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-slate-900">
          {isEditing ? `Update User #${editingUser.id ?? editingUser._id}` : 'Create User'}
        </h2>
        {isEditing && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
          >
            Cancel
          </button>
        )}
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-700">Name</span>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="John Doe"
            required
            className={inputClassName}
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-700">Email</span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="john@example.com"
            required
            className={inputClassName}
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-700">Phone</span>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+1 555 0100"
            className={inputClassName}
          />
        </label>

        {error && (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
        )}
        {success && (
          <p className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">{success}</p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting
            ? isEditing
              ? 'Updating...'
              : 'Creating...'
            : isEditing
              ? 'Update User'
              : 'Create User'}
        </button>
      </form>
    </section>
  )
}
