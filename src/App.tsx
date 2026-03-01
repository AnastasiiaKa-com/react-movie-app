import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import MoviePage from "./pages/MoviePage"
import Footer from "./components/Footer"
import "./App.css"
import FavoritesPage from "./pages/FavoritesPage"
import Header from "./components/Header"
function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:id" element={<MoviePage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App