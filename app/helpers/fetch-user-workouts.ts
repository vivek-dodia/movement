export default async function fetchUserWorkouts(id: string) {
  const res = await fetch(`http://localhost:3000/api/workouts/user/${id}`)

  if (!res.ok) {
    throw new Error('Failed to fetch user workouts')
  }

  return res.json()
}
