/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react"
import { getFavorites } from "../services/favorites"
import { getMovieDetails } from "../services/tmdb"
import MovieCard from "../components/MovieCard"
import styles from "./FavoritesPage.module.css"

function FavoritesPage() {
  const [movies, setMovies] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favoriteIds = getFavorites()

        if (favoriteIds.length === 0) {
          setMovies([])
          return
        }

        const moviesData = await Promise.all(
          favoriteIds.map((id) =>
            getMovieDetails(id.toString())
          )
        )

        setMovies(moviesData)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchFavorites()
  }, [])

  if (loading) return <p className={styles.message}>Loading...</p>

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Your Favorites</h1>

      {movies.length === 0 ? (
        <p className={styles.message}>
          You have no favorite movies yet.
        </p>
      ) : (
        <div className={styles.grid}>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  )
}

export default FavoritesPage