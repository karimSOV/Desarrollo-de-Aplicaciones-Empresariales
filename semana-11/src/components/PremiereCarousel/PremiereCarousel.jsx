import { useRef } from 'react'
import Button from '../Button/Button.jsx'
import './PremiereCarousel.css'

// "2026-11-19" -> "19 de noviembre"
function formatDate(date) {
  return new Date(`${date}T00:00:00`).toLocaleDateString('es-PE', { day: 'numeric', month: 'long' })
}

// Horizontal carousel of premieres; cardsPerView says how many fit at once.
function PremiereCarousel({ premieres, cardsPerView }) {
  const trackRef = useRef(null)

  // Moves the track one full view to the left (-1) or to the right (1).
  function move(direction) {
    const track = trackRef.current
    track.scrollBy({ left: direction * track.clientWidth, behavior: 'smooth' })
  }

  const gap = 16
  const columnWidth = `calc((100% - ${(cardsPerView - 1) * gap}px) / ${cardsPerView})`

  return (
    <div className="carousel">
      <div className="carousel-track" ref={trackRef} style={{ gridAutoColumns: columnWidth }}>
        {premieres.map((movie) => (
          <article key={movie.id} className="premiere-card">
            <div className="premiere-card-art" style={{ '--hue': (movie.id * 47) % 360 }}>
              <span>{movie.title}</span>
            </div>
            <div className="premiere-card-body">
              <h3 className="premiere-card-title">{movie.title}</h3>
              <p className="premiere-card-date">Estreno: {formatDate(movie.releaseDate)}</p>
              <span className="tag">{movie.genre}</span>
            </div>
          </article>
        ))}
      </div>
      <div className="carousel-controls">
        <Button variant="soft" onClick={() => move(-1)} ariaLabel="Estrenos anteriores">
          ‹
        </Button>
        <Button variant="soft" onClick={() => move(1)} ariaLabel="Más estrenos">
          ›
        </Button>
      </div>
    </div>
  )
}

export default PremiereCarousel
