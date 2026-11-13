import { useEffect, useState } from 'react'
import { adaptMovies } from '../adapters/movieAdapter.js'
import { premieresResponse } from '../data/premieres.js'

const FAKE_DELAY = 1500

// Simulates the request of the premieres, with three states:
// 'loading', 'success' (with data) and 'error' (with a message).
// With ?estrenos=error in the address, the first attempt fails on purpose.
export function usePremieres() {
  const [status, setStatus] = useState('loading')
  const [premieres, setPremieres] = useState([])
  const [error, setError] = useState('')
  const [attempt, setAttempt] = useState(1)

  useEffect(() => {
    const failOnPurpose = new URLSearchParams(window.location.search).get('estrenos') === 'error'

    const timer = setTimeout(() => {
      if (failOnPurpose && attempt === 1) {
        setError('El servidor de estrenos no respondió (error 503). Revisa tu conexión e inténtalo otra vez.')
        setStatus('error')
      } else {
        setPremieres(adaptMovies(premieresResponse))
        setStatus('success')
      }
    }, FAKE_DELAY)

    return () => clearTimeout(timer)
  }, [attempt])

  // A new attempt starts in 'loading' again.
  function retry() {
    setStatus('loading')
    setAttempt((current) => current + 1)
  }

  return { status, premieres, error, retry }
}
