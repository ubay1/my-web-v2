import React, { useState } from 'react'
import InitialTransition from '../elements/InitialTransition'

const WithInitialTransition = (WrappedComponent: React.ComponentType<any>) => {
  return (props: any) => {
    const [isTransitionDone, setIsTransitionDone] = useState(false)

    return (
      <>
        <InitialTransition onTransitionDone={() => setIsTransitionDone(true)} />
        {isTransitionDone && <WrappedComponent {...props} />}
      </>
    )
  }
}

export default WithInitialTransition
