export const fetchUserWeights = async (userId: string) => {
  const res = await fetch(`http://localhost:3000/api/weights/user/${userId}`)

  if (!res.ok) {
    throw new Error('Failed to fetch user weights')
  }

  return res.json()
}
