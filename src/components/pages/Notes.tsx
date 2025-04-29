import { Icon } from '@iconify/react/dist/iconify.js'
import React, { useEffect } from 'react'
import type { IBlogDetail } from '../../types/blog'
import WithInitialTransition from '@components/HOC/WithInitialTransition'
import { motion } from 'framer-motion'
import { sortByDate } from '@utils/sortByDate'

const Notes: React.FC<{ data: IBlogDetail[]; withBtnBack?: boolean }> = ({ data, withBtnBack }) => {
  useEffect(() => {
    ;(document.querySelector('body') as HTMLElement).classList.remove('overflow-hidden')
  }, [])
  return (
    <motion.section exit={{ opacity: 0 }}>
      {withBtnBack && (
        <motion.button
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.2, delay: 1 }}
          className="absolute top-28 left-4 z-50 flex items-center gap-1 bg-[#f8ecce] rounded-full p-2 border border-[#ed8b28]"
          onClick={() => window.history.back()}
        >
          <Icon icon="mdi:arrow-left" color="#023a37" className="w-8 h-8 " />
        </motion.button>
      )}
      <motion.div
        animate={{
          transition: { staggerChildren: 0.1, delayChildren: 2.8 },
        }}
        className={`${withBtnBack ? 'mt-40' : 'mt-28'} mb-4`}
      >
        <motion.div className="gap-4 space-y-4 p-2 columns-1 md:columns-2 lg:columns-4">
          {data.sort(sortByDate).map((item, idx) => (
            <motion.div
              key={item.url}
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 1 }}
              className="bg-[#f8ecce] rounded-md m-2 break-inside-avoid cursor-pointer relative hover:bg-gray-7 hover:bg-opacity-8"
            >
              <a href={item.url} className="text-[#023a37] p-4 flex flex-col gap-4">
                <div className="w-5 h-5 bg-[#fff] rounded-full flex justify-center items-center">
                  <Icon icon={item.frontmatter.icon} className="w-4 h-4 rounded-full" />
                </div>
                <div>
                  <div className="break-words">{item.frontmatter.title}</div>
                  <div className="text-[10px]">{item.frontmatter.date}</div>
                </div>

                {item.frontmatter.description && item.frontmatter.description !== '' && (
                  <>
                    <hr className="border-[1px] border-[#023a37]" />
                    <div className="text-xs">{item.frontmatter.description}</div>
                  </>
                )}
              </a>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  )
}
export default WithInitialTransition(Notes)
