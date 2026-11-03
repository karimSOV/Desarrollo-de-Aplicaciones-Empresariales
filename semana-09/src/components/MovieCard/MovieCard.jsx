import './MovieCard.css'

// One movie of the billboard: image, title, rating and showtimes.
function MovieCard({ movie, isSelected, onSelect }) {
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
      </div>
    </article>
  )
}

export default MovieCard
