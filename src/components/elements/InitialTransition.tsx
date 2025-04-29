import { motion } from 'framer-motion'
import React, { useEffect } from 'react'

const blackBox = {
  initial: {
    height: '100%',
    // top: 0,
    bottom: 0,
  },
  animate: {
    height: 0,
    transition: {
      when: 'afterChildren',
      duration: 1.5,
      ease: [0.87, 0, 0.13, 1],
    },
  },
}
const textContainer = {
  initial: {
    opacity: 1,
    duration: 1,
  },
  animate: {
    opacity: 0,
    transition: {
      duration: 0.5,
      when: 'afterChildren',
    },
  },
}
const text = {
  initial: {
    y: 40,
  },
  animate: {
    y: 85,
    transition: {
      duration: 1.5,
      ease: [0.87, 0, 0.13, 1],
    },
  },
}

interface InitialTransitionProps {
  onTransitionDone: () => void
}

const InitialTransition: React.FC<InitialTransitionProps> = ({ onTransitionDone }) => {
  // Add this to your existing animation's onAnimationComplete callback
  // or at the end of your transition sequence
  useEffect(() => {
    // Adjust this timeout according to your transition duration
    const timer = setTimeout(() => {
      onTransitionDone()
    }, 2000) // Adjust this value to match your transition duration

    return () => clearTimeout(timer)
  }, [onTransitionDone])

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div
        id="comp-transition"
        className="absolute z-[80] flex items-center justify-center w-full bg-[#f8ecce]"
        initial="initial"
        animate="animate"
        variants={blackBox}
        onAnimationStart={() => document.body.classList.add('overflow-hidden')}
        onAnimationComplete={() =>
          (document.querySelector('#comp-transition') as HTMLElement).classList.add('hidden')
        }
      >
        <motion.svg variants={textContainer} className="absolute z-40 flex">
          <pattern
            id="pattern"
            patternUnits="userSpaceOnUse"
            width={750}
            height={800}
            className="text-[#ed8b28]"
          >
            <rect className="w-full h-full fill-current" />
            <motion.rect variants={text} className="w-full h-full text-[#023a37] fill-current" />
          </pattern>
          <text
            className="text-4xl font-bold"
            textAnchor="middle"
            x="50%"
            y="50%"
            style={{ fill: 'url(#pattern)' }}
          >
            Ubay Dillah
          </text>
        </motion.svg>
      </motion.div>
    </div>
  )
}

export default InitialTransition
