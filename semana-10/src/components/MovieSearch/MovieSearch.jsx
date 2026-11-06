import Button from '../Button/Button.jsx'
import './MovieSearch.css'

// Controlled input: the text lives in the parent state and onChange updates it.
function MovieSearch({ value, onChange, onSubmit }) {
  function handleChange(event) {
    console.log('Tecla:', event.target.value)
    onChange(event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault()
    onSubmit()
  }

  return (
    <form className="movie-search" role="search" onSubmit={handleSubmit}>
      <label className="field-label" htmlFor="movie-search-input">
        Buscar en la cartelera
      </label>
      <div className="movie-search-row">
        <input
          id="movie-search-input"
          className="field-input"
          type="search"
          placeholder="Escribe un título, por ejemplo: toy"
          value={value}
          onChange={handleChange}
        />
        <Button type="submit">Buscar</Button>
      </div>
    </form>
  )
}

export default MovieSearch
