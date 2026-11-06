import './Button.css'

// Reusable button: the text comes in children and the look in variant.
// With href it is drawn as a link; without it, as a button.
function Button({ children, variant = 'primary', href, type = 'button', onClick, pressed, ariaLabel }) {
  const className = `button button-${variant}`

  if (href) {
    return (
      <a className={className} href={href} aria-label={ariaLabel}>
        {children}
      </a>
    )
  }

  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      aria-pressed={pressed}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}

export default Button
