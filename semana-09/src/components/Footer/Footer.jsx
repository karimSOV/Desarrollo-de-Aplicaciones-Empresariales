import './Footer.css'

// Contact data and general information of the cinema.
function Footer({ cinema }) {
  return (
    <footer className="footer" id="contact">
      <div className="footer-inner">
        <div>
          <p className="footer-logo">{cinema.name}</p>
          <p className="footer-text">
            Cartelera de práctica del curso Desarrollo de Aplicaciones Empresariales.
          </p>
        </div>
        <div>
          <h3 className="footer-title">Contacto</h3>
          <p className="footer-text">{cinema.address}</p>
          <p className="footer-text">{cinema.phone}</p>
          <p className="footer-text">{cinema.email}</p>
        </div>
        <div>
          <h3 className="footer-title">Información</h3>
          <p className="footer-text">{cinema.hours}</p>
          <p className="footer-text">Clasificación: APT (apta para todos) y +14.</p>
        </div>
      </div>
      <p className="footer-copy">© 2026 {cinema.name} · Laboratorio 9 · Karim Sovero</p>
    </footer>
  )
}

export default Footer
