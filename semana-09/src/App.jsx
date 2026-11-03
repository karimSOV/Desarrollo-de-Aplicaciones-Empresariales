import { useState } from 'react'
import Header from './components/Header/Header.jsx'
import Hero from './components/Hero/Hero.jsx'
import MovieList from './components/MovieList/MovieList.jsx'
import Footer from './components/Footer/Footer.jsx'
import { cinema, movies } from './data/movies.js'

// App owns the data and passes each child only what it needs.
function App() {
  const featuredMovie = movies.find((movie) => movie.featured)
  const [selectedMovie, setSelectedMovie] = useState(featuredMovie)

  // A card was chosen: show it in the banner and go back to the top.
  function handleSelectMovie(movie) {
    setSelectedMovie(movie)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <Header cinemaName={cinema.name} />
      <main>
        <Hero movie={selectedMovie} />
        <MovieList
          movies={movies}
          selectedId={selectedMovie.id}
          onSelectMovie={handleSelectMovie}
        />
      </main>
      <Footer cinema={cinema} />
    </>
  )
}

export default App
