import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'

import ArrowLeft from './icons/ArrowLeft'

interface CardProps {
  image: string
}

const Card: React.FC<CardProps> = ({ image }) => {
  const [showOverlay, setShowOverlay] = useState(false)

  return (
    <motion.div
      className="relative overflow-hidden h-[50px] w-[50px] flex justify-center items-center"
      key={image}
    >
      <img src={image} alt={image} className="w-full h-full object-contain" />
    </motion.div>
  )
}

export default Card
