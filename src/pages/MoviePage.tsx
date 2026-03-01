
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getMovieDetails, getMovieVideos } from "../services/tmdb"
import styles from "./MoviePage.module.css"
import type { MovieDetails, VideosResponse } from "../types/movie"

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original"
const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500"

function MoviePage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [movie, setMovie] = useState<MovieDetails | null>(null)
  const [trailerKey, setTrailerKey] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [showTrailer, setShowTrailer] = useState(false)

  useEffect(() => {
    if (!id) return

    const fetchData = async () => {
      try {
        setLoading(true)

        const movieData = await getMovieDetails(id)
        setMovie(movieData)

        const videos: VideosResponse = await getMovieVideos(id)

        const trailer = videos.results.find(
          (video) =>
            video.type === "Trailer" &&
            video.site === "YouTube"
        )

        if (trailer) {
          setTrailerKey(trailer.key)
        }
      } catch {
        setError("Something went wrong")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowTrailer(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  if (loading) return <p className={styles.message}>Loading...</p>
  if (error) return <p className={styles.message}>{error}</p>
  if (!movie) return null

 
  const backdropUrl =
    movie.backdrop_path && movie.backdrop_path !== "null"
      ?` ${IMAGE_BASE_URL}${movie.backdrop_path}`
      : "/no-image.png"


  const posterUrl =
    movie.poster_path && movie.poster_path !== "null"
      ?` ${POSTER_BASE_URL}${movie.poster_path}`
      : "/no-image.png"

  return (
    <div
      className={styles.container}
      style={{
        backgroundImage: `url(${backdropUrl})`,
      }}
    >
      <div className={styles.overlay}>
        <button
          className={styles.backButton}
          onClick={() => navigate(-1)}
        >
          Back
        </button>

        <div className={styles.content}>
          <img
            src={posterUrl}
            alt={movie.title}
            className={styles.poster}
            onError={(e) => {
              e.currentTarget.src = "/no-image.png"
            }}
          />

          <div className={styles.info}>
            <h1>{movie.title}</h1>

            <div className={styles.meta}>
              <span className={styles.rating}>
                ⭐ {movie.vote_average.toFixed(1)}
              </span>

              <span className={styles.year}>
                {movie.release_date?.slice(0, 4)}
              </span>
            </div>

            <div className={styles.genres}>
              {movie.genres?.map((genre) => (
                <span key={genre.id} className={styles.genreTag}>
                  {genre.name}
                </span>
              ))}
            </div>

            <p className={styles.overview}>
              {movie.overview}
            </p>

            {trailerKey && (
              <button
                className={styles.trailerButton}
                onClick={() => setShowTrailer(true)}
              >
                Watch Trailer
              </button>
            )}
          </div>
        </div>
      </div>

      {showTrailer && (
        <div
          className={styles.modal}
          onClick={() => setShowTrailer(false)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="Trailer"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default MoviePage