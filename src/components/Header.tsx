import { Link } from "react-router-dom"
import styles from "./Header.module.css"

function Header() {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        MovieApp
      </Link>

      <nav>
      <Link to="/favorites" className={styles.navLink}>
  Favorites
</Link>
      </nav>
    </header>
  )
}

export default Header