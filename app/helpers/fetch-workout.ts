export default async function fetchWorkout(id: string) {
  const res = await fetch(`https://movement.vercel.app/api/workouts/${id}`)

  if (!res.ok) {
    throw new Error('Failed to fetch the workout')
  }
  return res.json()
}
