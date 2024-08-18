import React, { useRef, useEffect, useState } from 'react'

const ImgIntersect = ({
  once = false,
  top = 0,
  bottom = 0,
  left = 0,
  right = 0,
  classes = null,
  children,
}: any) => {
  const container = useRef<any>(null)
  const [intersecting, setIntersecting] = useState(false)

  useEffect(() => {
    if (typeof IntersectionObserver !== 'undefined') {
      const rootMargin = `${bottom}px ${left}px ${top}px ${right}px`
      const observer = new IntersectionObserver(
        (entries) => {
          console.log('entries = ', entries)

          setIntersecting(entries[0].isIntersecting)
          if (entries[0].isIntersecting && once) {
            observer.unobserve(container.current)
          }
        },
        {
          rootMargin,
        },
      )
      observer.observe(container.current)
      return () => observer.unobserve(container.current)
    }
  }, [])

  return (
    <div ref={container} className={classes || undefined}>
      {children(true)}
    </div>
  )
}

export default ImgIntersect
