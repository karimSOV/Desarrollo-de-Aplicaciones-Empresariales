import './Header.css'

// Top bar with the cinema name and the page navigation.
function Header({ cinemaName }) {
  return (
    <header className="header">
      <a className="header-logo" href="#home">
        {cinemaName}
      </a>
      <nav className="header-nav">
        <a href="#home">Inicio</a>
        <a href="#billboard">Cartelera</a>
        <a href="#contact">Contacto</a>
      </nav>
    </header>
  )
}

export default Header
