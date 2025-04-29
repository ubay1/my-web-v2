import classNames from 'classnames'
import React, { useEffect } from 'react'
// import  LazyLoadImage from 'react-lazy-load-image-component'
// import 'react-lazy-load-image-component/src/effects/blur.css'
import { Icon } from '@iconify/react'
import type { IListProject } from '@typess/project'
import WithInitialTransition from '@components/HOC/WithInitialTransition'
import { motion } from 'framer-motion'

const Projects: React.FC<{ data: IListProject[] }> = ({ data }) => {
  useEffect(() => {
    ;(document.querySelector('body') as HTMLElement).classList.remove('overflow-hidden')
  }, [])

  return (
    <motion.section exit={{ opacity: 0 }}>
      <motion.div
        animate={{
          transition: { staggerChildren: 0.1, delayChildren: 0.2 },
        }}
        className="relative z-[99] mt-28 mb-4"
      >
        <motion.div className="gap-4 space-y-4 p-4 columns-1 sm:columns-2 lg:columns-3">
          {data.map((data, index) => (
            <motion.div
              key={`list-proyek-${index}`}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
              className="break-inside-avoid mb-4 bg-[#023a37] rounded-md"
            >
              <div className="rounded-t-md relative justify-center flex flex-row flex-wrap gap-2 overflow-hidden">
                <div className="absolute z-20 top-0 right-0 text-xs p-1 rounded-lb-md bg-[#ed8b28] text-black">
                  {data.project}
                </div>

                <div className="h-56 w-full bg-[#f8ecce] flex justify-center items-center">
                  <img
                    src={data.img}
                    alt={`img-${data.label}`}
                    className={classNames('h-56 z-10 w-full p-4 object-contain', data.class)}
                  />
                  {/* effect="blur"
                wrapperProps={{
                style: { transitionDelay: '1s' },
                }} */}
                </div>
              </div>
              <div className="bg-[#f8ecce] rounded-b-md text-[#023a37] flex flex-col p-4">
                <div className="text-center font-bold mb-2">
                  {data.url ? (
                    <a
                      href={data.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 decoration-none text-[#023a37]"
                    >
                      <span>{data.label}</span>
                      <Icon icon="icon-park-outline:share" />
                    </a>
                  ) : (
                    data.label
                  )}
                </div>
                <div className="text-center text-sm">{data.stack.join(', ')}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  )
}

export default Projects
