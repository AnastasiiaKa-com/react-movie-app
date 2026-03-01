
const BASE_URL = "https://api.themoviedb.org/3"
const API_KEY = import.meta.env.VITE_TMDB_API_KEY!
export async function getPopularMovies(page: number = 1) {
  const response = await fetch(
   ` ${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
  )

  if (!response.ok) {
    throw new Error("Failed to fetch popular movies")
  }

  return response.json()
}

export const getMovieDetails = async (id: string) => {
  const response = await fetch(
   ` ${BASE_URL}/movie/${id}?api_key=${API_KEY}`
  )

  if (!response.ok) {
    throw new Error("Failed to fetch movie details")
  }

  return response.json()
}

export const searchMovies = async (query: string) => {
  const response = await fetch(
  `   ${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
  )

  if (!response.ok) {
    throw new Error("Failed to search movies")
  }

  return response.json()
}
export async function getMovieVideos(id: string) {
  const response = await fetch(
   ` ${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`
  )

  if (!response.ok) {
    throw new Error("Failed to fetch videos")
  }

  return response.json()
}


export const getGenres = async () => {
  const res = await fetch(
   ` ${BASE_URL}/genre/movie/list?api_key=${API_KEY}`
  )
  return res.json()
}

export const getMoviesByGenre = async (genreId: number) => {
  const res = await fetch(
   ` ${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`
  )
  return res.json()
}