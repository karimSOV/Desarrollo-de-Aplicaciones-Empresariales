import './Hero.css'

// Banner of the chosen movie. It only knows the movie it receives by props.
function Hero({ movie }) {
  const kicker = movie.featured ? 'Película destacada' : 'Película seleccionada'

  return (
    <section className="hero" id="home">
      <img className="hero-backdrop" src={movie.image} alt="" />
      <div className="hero-content">
        <span className="hero-kicker">{kicker}</span>
        <h1 className="hero-title">{movie.title}</h1>
        <div className="hero-meta">
          <span className="hero-star">★ {movie.rating}</span>
          <span className="tag tag-accent">{movie.classification}</span>
          <span className="tag">{movie.genre}</span>
          <span className="tag">{movie.duration} min</span>
        </div>
        <p className="hero-synopsis">{movie.synopsis}</p>
        <div className="hero-showtimes">
          {movie.showtimes.map((time) => (
            <span key={time} className="hero-time">
              {time}
            </span>
          ))}
        </div>
        <a className="btn btn-primary" href="#billboard">
          Ver cartelera
        </a>
      </div>
      <img className="hero-poster" src={movie.image} alt={`Póster de ${movie.title}`} />
    </section>
  )
}

export default Hero
