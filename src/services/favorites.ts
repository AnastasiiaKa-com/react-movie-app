const FAVORITES_KEY = "favorite_movies"

export const getFavorites = (): number[] => {
  const stored = localStorage.getItem(FAVORITES_KEY)
  return stored ? JSON.parse(stored) : []
}

export const toggleFavorite = (id: number) => {
  const favorites = getFavorites()

  if (favorites.includes(id)) {
    const updated = favorites.filter((movieId) => movieId !== id)
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated))
  } else {
    favorites.push(id)
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
  }
}

export const isFavorite = (id: number): boolean => {
  return getFavorites().includes(id)
}