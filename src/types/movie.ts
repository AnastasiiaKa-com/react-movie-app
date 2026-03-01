export interface Genre {
  id: number
  name: string
}

export interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string | null
  vote_average: number
  release_date: string
}

export interface MoviesResponse {
  results: Movie[]
}

export interface MovieDetails extends Movie {
  backdrop_path: string | null
  runtime: number
  genres: Genre[]
}

export interface Video {
  id: string
  key: string
  name: string
  site: string
  type: string
}

export interface VideosResponse {
  results: Video[]
}