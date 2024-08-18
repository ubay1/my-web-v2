import React, { useEffect, useRef, useState } from 'react'

const Image = ({ src, alt, classes, width, height }: any) => {
  const [loaded, setLoaded] = useState(false)
  const thisImage = useRef<any>(null)

  useEffect(() => {
    console.log('src = ', src)

    if (thisImage.current) {
      thisImage.current.onload = () => {
        setLoaded(true)
      }
    }
  }, [])

  return (
    <>
      {!width && !height ? (
        <img
          ref={thisImage}
          src={src}
          alt={alt}
          className={`${loaded ? 'loaded' : ''} ${classes}`}
        />
      ) : (
        <img
          ref={thisImage}
          width={width}
          height={height}
          src={src}
          alt={alt}
          className={`${loaded ? 'loaded' : ''} ${classes}`}
        />
      )}
    </>
  )
}

export default Image
