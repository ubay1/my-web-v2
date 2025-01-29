import React from 'react'

interface IProps {
  color?: string
  width?: string
  height?: string
}

const ArrowRight: React.FC<IProps> = ({ color = '#fff', width = '32', height = '32' }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24">
      <path
        fill={color}
        fill-rule="evenodd"
        d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10M9.97 8.47a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06L12.44 12L9.97 9.53a.75.75 0 0 1 0-1.06"
        clip-rule="evenodd"
      />
    </svg>
  )
}

export default ArrowRight
