import './Header.css'

// Top bar with the cinema name, the navigation and the favorites counter.
// It receives only the number of favorites, not the list.
function Header({ cinemaName, favoriteCount }) {
  const favoritesText = favoriteCount === 1 ? 'favorita' : 'favoritas'

  return (
    <header className="header">
      <a className="header-logo" href="#home">
        {cinemaName}
      </a>
      <nav className="header-nav">
        <a href="#home">Inicio</a>
        <a href="#premieres">Estrenos</a>
        <a href="#billboard">Cartelera</a>
        <a href="#contact">Contacto</a>
      </nav>
      <a className="pill header-favorites" href="#billboard" aria-label={`${favoriteCount} películas favoritas`}>
        ★ {favoriteCount} {favoritesText}
      </a>
    </header>
  )
}

export default Header
