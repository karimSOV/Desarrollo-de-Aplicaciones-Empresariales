import './Skeleton.css'

// Gray block with a shine that takes the place of content that is still loading.
function Skeleton({ width = '100%', height = '16px', radius = '6px' }) {
  return (
    <span
      className="skeleton"
      style={{ width, height, borderRadius: radius }}
      aria-hidden="true"
    />
  )
}

export default Skeleton
