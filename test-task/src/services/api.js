export const fetchUsersData = async () => {
  try {
    const response = await fetch('https://dummyjson.com/users?limit=100')
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorMessage = errorData?.message || `HTTP error! Status: ${response.status}`;
      throw new Error(errorMessage);
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
