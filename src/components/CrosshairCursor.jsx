import { useEffect, useRef } from 'react'

/**
 * CrosshairCursor
 * Full-screen crosshair that tracks the mouse using CSS variables.
 * Performance-safe: zero React re-renders on mouse move.
 * pointer-events: none so it never blocks clicks.
 */
export default function CrosshairCursor() {
  const containerRef = useRef(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const onMove = (e) => {
      el.style.setProperty('--mouse-x', `${e.clientX}px`)
      el.style.setProperty('--mouse-y', `${e.clientY}px`)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div ref={containerRef} className="crosshair-root" aria-hidden="true">
      {/* Horizontal line */}
      <div className="crosshair-h" />
      {/* Vertical line */}
      <div className="crosshair-v" />
    </div>
  )
}
