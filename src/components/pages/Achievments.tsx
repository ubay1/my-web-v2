import WithInitialTransition from '@components/HOC/WithInitialTransition'
import type { IListAchievment } from '@typess/achievment'
import classNames from 'classnames'
import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

// import { LazyLoadImage } from 'react-lazy-load-image-component'
// import 'react-lazy-load-image-component/src/effects/blur.css'

const Achievments: React.FC<{ data: IListAchievment[] }> = ({ data }) => {
  const { t } = useTranslation()

  useEffect(() => {
    ;(document.querySelector('body') as HTMLElement).classList.remove('overflow-hidden')
  }, [])
  return (
    <motion.section exit={{ opacity: 0 }}>
      <motion.div
        animate={{
          transition: { staggerChildren: 0.1, delayChildren: 0.2 },
        }}
        className="mt-28 mb-4"
      >
        <motion.div className="gap-4 space-y-4 p-2 columns-1 sm:columns-2 lg:columns-3">
          {data.map((data, index) => (
            <motion.div
              key={`list-achievment-${index}`}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
              className="break-inside-avoid mb-4 bg-[#232325] rounded-md"
            >
              <div className="rounded-t-md relative justify-center flex flex-row flex-wrap gap-2 overflow-hidden">
                <div className="h-56 pt-8 w-full bg-[#fff] flex justify-center items-center">
                  <img
                    src={data.img}
                    alt={`img-${data.img}`}
                    className={classNames('h-56 z-10 w-auto object-contain lt-md:w-[calc(100%)]')}
                  />
                  {/* effect="blur"
                wrapperProps={{
                  style: { transitionDelay: '1s' },
                }} */}
                </div>
              </div>
              <div className="bg-[#fff] rounded-b-md text-[#232325] flex flex-col p-4">
                <div className="text-center font-bold mb-2">
                  {t('pages.achievment.title').split(',')[index]}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  )
}

export default Achievments
