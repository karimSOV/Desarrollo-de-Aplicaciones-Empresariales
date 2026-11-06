import { useEffect, useState } from 'react'

// Returns the value only after it stops changing for `delay` milliseconds.
export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    // A new key press cancels the previous wait.
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}
