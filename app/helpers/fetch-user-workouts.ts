export default async function fetchUserWorkouts(id: string) {
  const res = await fetch(`https://movement.vercel.app/api/workouts/user/${id}`)

  if (!res.ok) {
    throw new Error('Failed to fetch user workouts')
  }

  return res.json()
}
