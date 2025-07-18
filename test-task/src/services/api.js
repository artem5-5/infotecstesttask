export const fetchUsersData = async () => {
  try {
    const response = await fetch('https://dummyjson.com/users')
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    const data = await response.json()
    return data.users.map((user) => ({
      ...user,
      country: user.address.state,
      city: user.address.city,
    }))
  } catch (error) {
    console.error('Fetch error:', error)
    throw error
  }
}
