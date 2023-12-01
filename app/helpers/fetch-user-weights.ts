export const fetchUserWeights = async (userId: string) => {
  const res = await fetch(
    `https://movement-next.vercel.app/api/weights/user/${userId}`
  )

  if (!res.ok) {
    throw new Error('Failed to fetch user weights')
  }

  return res.json()
}
