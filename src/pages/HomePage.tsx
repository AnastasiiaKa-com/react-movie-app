
import { useEffect, useState, useRef } from "react"
import {
  getPopularMovies,
  searchMovies,
  getGenres,
  getMoviesByGenre,
} from "../services/tmdb"
import type { Movie, Genre } from "../types/movie"
import MovieCard from "../components/MovieCard"
import styles from "./HomePage.module.css"

function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [genres, setGenres] = useState<Genre[]>([])
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)

  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchInitial = async () => {
      try {
        setLoading(true)
        const [moviesData, genresData] = await Promise.all([
          getPopularMovies(),
          getGenres(),
        ])
        setMovies(moviesData.results)
        setGenres(genresData.genres)
      } finally {
        setLoading(false)
      }
    }

    fetchInitial()
  }, [])


  useEffect(() => {
    const saved = localStorage.getItem("recentSearches")
    if (saved) {
      setRecentSearches(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () =>
      document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSearch = async (query: string) => {
    if (!query.trim()) return

    try {
      setLoading(true)
      const data = await searchMovies(query)
      setMovies(data.results)
      setSelectedGenre(null)

      const updated = [
        query,
        ...recentSearches.filter((s) => s !== query),
      ].slice(0, 5)

      setRecentSearches(updated)
      localStorage.setItem(
        "recentSearches",
        JSON.stringify(updated)
      )
    } finally {
      setLoading(false)
      setShowDropdown(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch(searchQuery)
  }

  const handleGenreClick = async (genreId: number) => {
    setLoading(true)
    const data = await getMoviesByGenre(genreId)
    setMovies(data.results)
    setSelectedGenre(genreId)
    setSearchQuery("")
    setLoading(false)
  }

  const handleReset = async () => {
    setLoading(true)
    const data = await getPopularMovies()
    setMovies(data.results)
    setSelectedGenre(null)
    setSearchQuery("")
    setLoading(false)
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Popular Movies</h1>
      <div className={styles.searchWrapper} ref={searchRef}>
  <form onSubmit={handleSubmit} className={styles.searchForm}>
    <input
      type="text"
      placeholder="Search movies..."
      value={searchQuery}
      onFocus={() => setShowDropdown(true)}
      onChange={(e) => setSearchQuery(e.target.value)}
      className={styles.searchInput}
    />

    <button type="submit" className={styles.searchButton}>
      Search
    </button>
  </form>

  {showDropdown && recentSearches.length > 0 && (
    <div className={styles.dropdown}>
      {recentSearches.map((item, index) => (
        <div
          key={index}
          className={styles.dropdownItem}
          onClick={() => {
            setSearchQuery(item)
            handleSearch(item)
          }}
        >
          {item}
        </div>
      ))}
    </div>
  )}
</div>
      <div className={styles.genres}>
        <button
          onClick={handleReset}
          className={`${styles.genreButton} ${


!selectedGenre ? styles.activeGenre : ""
          }`}
        >
          All
        </button>

        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() =>
              handleGenreClick(genre.id)
            }
            className={`${styles.genreButton} ${
              selectedGenre === genre.id
                ? styles.activeGenre
                : ""
            }`}
          >
            {genre.name}
          </button>
        ))}
      </div>

      {loading && (
        <p className={styles.message}>Loading...</p>
      )}

      <div className={styles.grid}>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
          />
        ))}
      </div>
    </div>
  )
}

export default HomePage