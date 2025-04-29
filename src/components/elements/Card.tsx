import { motion } from 'framer-motion'
import React from 'react'

interface CardProps {
  image: string
  label?: string
}

const Card: React.FC<CardProps> = ({ image, label }) => {
  return (
    <motion.div
      className="relative overflow-hidden h-[50px] w-[50px] flex justify-center items-center"
      key={image}
    >
      <img src={image} alt={image} className="w-full h-full object-contain" title={label} />
    </motion.div>
  )
}

export default Card
