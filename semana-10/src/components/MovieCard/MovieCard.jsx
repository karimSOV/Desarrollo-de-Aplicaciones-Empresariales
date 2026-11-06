import Button from '../Button/Button.jsx'
import './MovieCard.css'

// One movie of the billboard: image, title, rating, showtimes and favorite button.
// It does not change the favorites itself: it tells App through onToggleFavorite.
function MovieCard({ movie, isSelected, onSelect, isFavorite, onToggleFavorite }) {
  const cardClass = isSelected ? 'movie-card movie-card-selected' : 'movie-card'

  return (
    <article className={cardClass}>
      <button
        type="button"
        className="movie-card-poster"
        onClick={() => onSelect(movie)}
        aria-label={`Ver ${movie.title} en el banner`}
      >
        <img src={movie.image} alt={`Póster de ${movie.title}`} />
        <span className="movie-card-rating">★ {movie.rating}</span>
        {isFavorite && <span className="movie-card-favorite-badge">Favorita</span>}
      </button>
      <div className="movie-card-body">
        <h3 className="movie-card-title">{movie.title}</h3>
        <div className="movie-card-tags">
          <span className="tag tag-accent">{movie.classification}</span>
          <span className="tag">{movie.genre}</span>
          <span className="tag">{movie.duration} min</span>
        </div>
        <p className="movie-card-synopsis">{movie.synopsis}</p>
        <ul className="movie-card-showtimes">
          {movie.showtimes.map((time) => (
            <li key={time}>{time}</li>
          ))}
        </ul>
        <Button
          variant="favorite"
          pressed={isFavorite}
          onClick={() => onToggleFavorite(movie.id)}
        >
          {isFavorite ? '★ En favoritas' : '☆ Agregar a favoritas'}
        </Button>
      </div>
    </article>
  )
}

export default MovieCard
