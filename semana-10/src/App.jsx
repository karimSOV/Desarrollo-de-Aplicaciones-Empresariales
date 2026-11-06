import { useEffect, useState } from 'react'
import Header from './components/Header/Header.jsx'
import Hero from './components/Hero/Hero.jsx'
import MovieSearch from './components/MovieSearch/MovieSearch.jsx'
import MovieList from './components/MovieList/MovieList.jsx'
import Footer from './components/Footer/Footer.jsx'
import { useDebounce } from './hooks/useDebounce.js'
import { cinema, movies } from './data/movies.js'

const FAVORITES_KEY = 'cinelab-favorites'
const SEARCH_DELAY = 400

// Reads the saved favorites; if there is nothing valid, starts empty.
function loadFavorites() {
  try {
    const saved = JSON.parse(localStorage.getItem(FAVORITES_KEY))
    return Array.isArray(saved) ? saved : []
  } catch {
    return []
  }
}

// App owns the data and the state, and passes each child only what it needs.
function App() {
  const featuredMovie = movies.find((movie) => movie.featured)
  const [selectedMovie, setSelectedMovie] = useState(featuredMovie)
  const [favoriteIds, setFavoriteIds] = useState(loadFavorites)
  const [searchText, setSearchText] = useState('')
  const searchQuery = useDebounce(searchText, SEARCH_DELAY)

  // Save the favorites every time they change.
  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favoriteIds))
  }, [favoriteIds])

  // The billboard is filtered only when the user stops typing.
  useEffect(() => {
    if (searchQuery) {
      console.log('Filtrando la cartelera por:', searchQuery)
    }
  }, [searchQuery])

  // Adds the movie to the favorites, or removes it if it was already there.
  function handleToggleFavorite(movieId) {
    setFavoriteIds((current) =>
      current.includes(movieId)
        ? current.filter((id) => id !== movieId)
        : [...current, movieId],
    )
  }

  // A card was chosen: show it in the banner and go back to the top.
  function handleSelectMovie(movie) {
    setSelectedMovie(movie)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // The search button takes the user down to the results.
  function handleSearchSubmit() {
    document.getElementById('billboard').scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Header cinemaName={cinema.name} />
      <main>
        <Hero movie={selectedMovie}>
          <MovieSearch
            value={searchText}
            onChange={setSearchText}
            onSubmit={handleSearchSubmit}
          />
        </Hero>
        <MovieList
          movies={movies}
          searchQuery={searchQuery}
          onClearSearch={() => setSearchText('')}
          selectedId={selectedMovie.id}
          onSelectMovie={handleSelectMovie}
          favoriteIds={favoriteIds}
          onToggleFavorite={handleToggleFavorite}
        />
      </main>
      <Footer cinema={cinema} />
    </>
  )
}

export default App
