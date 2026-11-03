import MovieCard from '../MovieCard/MovieCard.jsx'
import './MovieList.css'

// Walks the billboard with map and draws one card per movie.
function MovieList({ movies, selectedId, onSelectMovie }) {
  return (
    <section className="movie-list" id="billboard">
      <h2 className="movie-list-title">Cartelera</h2>
      <p className="movie-list-subtitle">
        {movies.length} películas en exhibición · haz clic en un póster para verla arriba
      </p>
      <div className="movie-list-grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isSelected={movie.id === selectedId}
            onSelect={onSelectMovie}
          />
        ))}
      </div>
    </section>
  )
}

export default MovieList
