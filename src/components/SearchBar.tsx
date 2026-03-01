import { useState } from "react"
import styles from "./SearchBar.module.css"

interface Props {
  onSearch: (query: string) => void
}

function SearchBar({ onSearch }: Props) {
  const [query, setQuery] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!query.trim()) return

    onSearch(query)
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={styles.input}
      />

      <button type="submit" className={styles.button}>
        Search
      </button>
    </form>
  )
}

export default SearchBar