import Button from '../Button/Button.jsx'
import MovieCard from '../MovieCard/MovieCard.jsx'
import './MovieList.css'

// Lower case and without accents, so "leon" also finds "León".
function normalize(text) {
  return text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
}

// Filters the billboard by the search text and draws one card per movie.
function MovieList({
  movies,
  searchQuery,
  onClearSearch,
  selectedId,
  onSelectMovie,
  favoriteIds,
  onToggleFavorite,
}) {
  const query = normalize(searchQuery.trim())
  const visibleMovies = movies.filter((movie) => normalize(movie.title).includes(query))

  const favoritesText = favoriteIds.length === 1 ? 'favorita' : 'favoritas'
  let subtitle = `${movies.length} películas en exhibición · ${favoriteIds.length} ${favoritesText}`
  if (query) {
    subtitle = `${visibleMovies.length} de ${movies.length} películas para «${searchQuery.trim()}»`
  }

  return (
    <section className="movie-list" id="billboard">
      <h2 className="movie-list-title">Cartelera</h2>
      <p className="movie-list-subtitle">{subtitle}</p>

      {visibleMovies.length === 0 ? (
        <div className="movie-list-empty">
          <p className="movie-list-empty-icon" aria-hidden="true">🎬</p>
          <h3 className="movie-list-empty-title">No encontramos películas</h3>
          <p className="text-muted">
            Ninguna película de la cartelera coincide con «{searchQuery.trim()}».
          </p>
          <Button variant="soft" onClick={onClearSearch}>
            Ver toda la cartelera
          </Button>
        </div>
      ) : (
        <div className="movie-list-grid">
          {visibleMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isSelected={movie.id === selectedId}
              onSelect={onSelectMovie}
              isFavorite={favoriteIds.includes(movie.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default MovieList
