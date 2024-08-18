import React, { useState } from 'react'
import IntersectionImage from './ImgIntersecting'
import Image from './Image'

const ImgLoader = ({
  src,
  alt,
  classes,
  width = null,
  height = null,
  classIntersect = null,
}: any) => {
  const [nativeLoading, setNativeLoading] = useState(false)

  // console.log('src = ', src)

  return (
    <IntersectionImage once={true} classes={classIntersect}>
      {({ intersecting }: any) => {
        console.log('intersecting = ', intersecting)

        return (
          (intersecting || nativeLoading) && (
            <Image alt={alt} src={src} width={width} height={height} classes={classes} />
          )
        )
      }}
    </IntersectionImage>
  )
}

export default ImgLoader
