import Button from '../Button/Button.jsx'
import PremiereCarousel from '../PremiereCarousel/PremiereCarousel.jsx'
import Skeleton from '../Skeleton/Skeleton.jsx'
import { usePremieres } from '../../hooks/usePremieres.js'
import { useWindowSize } from '../../hooks/useWindowSize.js'
import './PremieresSection.css'

// Premieres section: shows each state of the request (loading, error, data).
function PremieresSection() {
  const { status, premieres, error, retry } = usePremieres()
  const { width } = useWindowSize()

  let cardsPerView = 5
  if (width < 700) {
    cardsPerView = 2
  } else if (width < 1100) {
    cardsPerView = 3
  }

  return (
    <section className="premieres" id="premieres" aria-busy={status === 'loading'}>
      <p className="eyebrow">Próximamente</p>
      <h2 className="section-title">Estrenos en CineLab</h2>

      {status === 'loading' && (
        <div role="status">
          <p className="text-muted premieres-message">Cargando estrenos…</p>
          <div className="premieres-skeletons" style={{ gridTemplateColumns: `repeat(${cardsPerView}, 1fr)` }}>
            {Array.from({ length: cardsPerView }, (_, index) => (
              <div key={index} className="premieres-skeleton-card">
                <div className="premieres-skeleton-art">
                  <Skeleton height="100%" radius="10px 10px 0 0" />
                </div>
                <div className="premieres-skeleton-body">
                  <Skeleton width="80%" height="16px" />
                  <Skeleton width="55%" height="13px" />
                  <Skeleton width="35%" height="20px" radius="999px" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="premieres-error" role="alert">
          <h3 className="premieres-error-title">No se pudieron cargar los estrenos</h3>
          <p className="text-muted">{error}</p>
          <Button onClick={retry}>Reintentar</Button>
        </div>
      )}

      {status === 'success' && <PremiereCarousel premieres={premieres} cardsPerView={cardsPerView} />}
    </section>
  )
}

export default PremieresSection
