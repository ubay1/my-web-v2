import React, { useEffect, useRef, useState } from 'react'

const LazyImg: React.FC<{ alt: string; src: any }> = ({ alt, src }) => {
  const [imageSrc, setImageSrc] = useState<any>(null)
  const imgRef = useRef<any>(null)

  // useEffect(() => {
  //   console.log('src = ', src)

  //   setImageSrc(src)
  // }, [src])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0) {
            setImageSrc(src)
            observer.unobserve(imgRef.current)
          }
        })
      },
      {
        rootMargin: '0px',
        threshold: 0.1,
      },
    )
    observer.observe(imgRef.current)
    return () => {
      observer.unobserve(imgRef.current)
    }
  }, [src])

  return <img ref={imgRef} src={imageSrc} alt={alt} />
}

export default LazyImg
