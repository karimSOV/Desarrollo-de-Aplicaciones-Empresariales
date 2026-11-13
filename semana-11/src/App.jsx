import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import Header from './components/Header/Header.jsx'
import Hero from './components/Hero/Hero.jsx'
import MovieSearch from './components/MovieSearch/MovieSearch.jsx'
import PremieresSection from './components/PremieresSection/PremieresSection.jsx'
import MovieList from './components/MovieList/MovieList.jsx'
import Footer from './components/Footer/Footer.jsx'
import { useDebounce } from './hooks/useDebounce.js'
import { adaptMovies } from './adapters/movieAdapter.js'
import { billboardResponse, cinema } from './data/movies.js'

const FAVORITES_KEY = 'cinelab-favorites'
const SEARCH_DELAY = 400

// The billboard data goes through the adapter before the app uses it.
const movies = adaptMovies(billboardResponse)

// Reads the saved favorites; if there is nothing valid, starts empty.
function loadFavorites() {
  try {
    const saved = JSON.parse(localStorage.getItem(FAVORITES_KEY))
    return Array.isArray(saved) ? saved : []
  } catch {
    return []
  }
}

// App is the common ancestor: it owns the state that its children share.
function App() {
  const featuredMovie = movies.find((movie) => movie.featured)
  const [selectedMovie, setSelectedMovie] = useState(featuredMovie)
  const [favoriteIds, setFavoriteIds] = useState(loadFavorites)
  const [searchText, setSearchText] = useState('')
  const debouncedText = useDebounce(searchText, SEARCH_DELAY)
  // An empty search applies at once; typing waits for the delay.
  const searchQuery = searchText === '' ? '' : debouncedText

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

  // Adds the movie to the favorites, or removes it, and shows a toast.
  // MovieCard only calls this function: it does not know about the toast.
  function handleToggleFavorite(movieId) {
    const movie = movies.find((item) => item.id === movieId)
    if (favoriteIds.includes(movieId)) {
      setFavoriteIds(favoriteIds.filter((id) => id !== movieId))
      toast(`Quitaste «${movie.title}» de favoritas`, { icon: '☆' })
    } else {
      setFavoriteIds([...favoriteIds, movieId])
      toast.success(`«${movie.title}» se agregó a favoritas`)
    }
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

  // Empties the filter: the input and the billboard change together.
  function handleClearSearch() {
    setSearchText('')
  }

  return (
    <>
      <Header cinemaName={cinema.name} favoriteCount={favoriteIds.length} />
      <main>
        <Hero movie={selectedMovie}>
          <MovieSearch
            value={searchText}
            onChange={setSearchText}
            onSubmit={handleSearchSubmit}
            onClear={handleClearSearch}
          />
        </Hero>
        <PremieresSection />
        <MovieList
          movies={movies}
          searchQuery={searchQuery}
          onClearSearch={handleClearSearch}
          selectedId={selectedMovie.id}
          onSelectMovie={handleSelectMovie}
          favoriteIds={favoriteIds}
          onToggleFavorite={handleToggleFavorite}
        />
      </main>
      <Footer cinema={cinema} />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: { fontFamily: 'Inter, sans-serif', background: '#1f1f26', color: '#f3f3f5', border: '1px solid #33333d' },
          success: { iconTheme: { primary: '#1f6fff', secondary: '#ffffff' } },
        }}
      />
    </>
  )
}

export default App
