import { useEffect } from 'react'

export const ScrollToTopOnMount = () => {
  useEffect(() => {
    // Disable scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    // Force scroll to top
    const scrollToTop = () => {
      window.scrollTo(0, 0)
    }

    // Scroll to top immediately
    scrollToTop()

    // Scroll to top after a short delay
    setTimeout(scrollToTop, 100)

    // Also scroll to top when the page becomes visible
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        scrollToTop()
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return null
} 