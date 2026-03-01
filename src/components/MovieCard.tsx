import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toggleFavorite, isFavorite } from "../services/favorites"
import type { Movie } from "../types/movie"
import styles from "./MovieCard.module.css"

interface Props {
  movie: Movie
}

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500"

function MovieCard({ movie }: Props) {
  const navigate = useNavigate()
  const [favorite, setFavorite] = useState(isFavorite(movie.id))

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation()
    toggleFavorite(movie.id)
    setFavorite(!favorite)
  }

  const posterUrl =
    movie.poster_path && movie.poster_path !== "null"
      ?` ${IMAGE_BASE_URL}${movie.poster_path}`
      : "/no-image.png"

  return (
    <div
      className={styles.card}
      onClick={() => navigate(`/movie/${movie.id}`)}
    >
      <button
        className={`${styles.favorite} ${
          favorite ? styles.active : ""
        }`}
        onClick={handleFavorite}
      >
        <svg viewBox="0 0 24 24">
          <path d="M20.8 4.6c-1.5-1.5-4-1.5-5.5 0L12 8l-3.3-3.4c-1.5-1.5-4-1.5-5.5 0s-1.5 4 0 5.5l3.3 3.4L12 21l5.5-7.5 3.3-3.4c1.5-1.5 1.5-4 0-5.5z" />
        </svg>
      </button>

      <div className={styles.imageWrapper}>
        <img
          src={posterUrl}
          alt={movie.title}
          className={styles.image}
          onError={(e) => {
            e.currentTarget.src = "/no-image.png"
          }}
        />
      </div>

      <div className={styles.info}>
        <h3 className={styles.title}>{movie.title}</h3>
        <p className={styles.rating}>
          ⭐ {movie.vote_average.toFixed(1)}
        </p>
      </div>
    </div>
  )
}

export default MovieCard