export default function UserList({
  users,
  loading,
  error,
  onEdit,
}) {
  if (loading) {
    return (
      <div className="rounded-3xl bg-white p-8 shadow-lg">
        <p className="text-center text-slate-500">
          Loading users...
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-3xl bg-red-50 p-8 shadow-lg">
        <p className="text-center font-medium text-red-600">
          {error}
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">
          Users List
        </h2>

        <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-700">
          {users.length} Users
        </span>
      </div>

      {users.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center">
          <p className="text-slate-500">No users found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between rounded-2xl border border-slate-200 p-5 transition hover:border-blue-300 hover:shadow-md"
            >
              <div>
                <h3 className="text-lg font-bold text-slate-800">
                  {user.name}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Age: {user.age}
                </p>
              </div>

              <button
                onClick={() => onEdit(user)}
                className="rounded-xl bg-amber-500 px-4 py-2 font-medium text-white transition hover:bg-amber-600"
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}