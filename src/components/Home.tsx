import { useEffect, useRef, useState } from 'react'
import { animate, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { sortByDate } from '@utils/sortByDate'
import type { IBlogDetail } from '@typess/blog'
import { Icon } from '@iconify/react'
import { useDimensions } from '@hooks/useDimension'
import InitialTransition from './InitialTransition'

interface IProps {
  fiveBlogLatest?: any
}

const Home: React.FC<IProps> = ({ fiveBlogLatest }) => {
  const { t } = useTranslation()
  const ref = useRef(null)
  const { width } = useDimensions(ref)

  const [selectLang, setSelectLang] = useState<'id' | 'en'>('id')
  const [pathName, setPathName] = useState('')
  const [isTransitionDone, setIsTransitionDone] = useState(false)

  const getPath = (path: string) => (path === '/' ? path : `/${path}`)

  const content = {
    animate: {
      transition: { staggerChildren: 0.1, delayChildren: 2.8 },
    },
  }

  useEffect(() => {
    const pathName = window.location.pathname
    setPathName(pathName)
    setSelectLang(pathName.split('/')[1] as 'id' | 'en')

    if (width > 0 && width < 768) {
      ;(document.querySelector('body') as HTMLElement).classList.remove('overflow-hidden')
    } else {
      ;(document.querySelector('body') as HTMLElement).classList.add('overflow-hidden')
    }
  }, [width])

  return (
    <motion.section exit={{ opacity: 0 }}>
      {/* {pathName.split('/').length} */}
      <InitialTransition onTransitionDone={() => setIsTransitionDone(true)} />
      {isTransitionDone && pathName.split('/').length === 2 && (
        <motion.div
          ref={ref}
          className="relative p-2 px-4 bg-[#002522] flex justify-center items-center overflow-hidden"
          initial="initial"
          variants={content}
          animate="animate"
        >
          <div className="flex flex-col my-10 md:mt-0 md:grid md:grid-cols-6 md:grid-rows-7 gap-6 w-full h-full min-h-screen overflow-hidden">
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="relative px-4 h-40 flex flex-col justify-center items-center md:h-full md:col-span-2 md:row-start-2 md:row-span-2 bg-[#023a37] text-white rounded-xl text-center overflow-hidden"
            >
              <div
                // initial={{ x: -20, opacity: 0 }}
                // animate={{ x: 0, opacity: 1 }}
                // transition={{ duration: 0.4, ease: 'backOut' }}
                className="absolute top-[-10px] left-[-10px] z-10 h-10 w-10 rounded-full border-8 border-[#ed8b28]"
              ></div>
              <div
                // initial={{ x: 20, opacity: 0 }}
                // animate={{ x: 0, opacity: 1 }}
                // transition={{ duration: 0.4, ease: 'backOut' }}
                className="absolute bottom-[-10px] right-[-10px] z-10 h-10 w-10 rounded-full border-8 border-[#ed8b28]"
              ></div>
              <div
                // initial={{ x: 20, opacity: 0 }}
                // animate={{ x: 0, opacity: 1 }}
                // transition={{ duration: 0.4, ease: 'backIn' }}
                className="absolute top-[-10px] right-[-10px] z-10 h-8 w-8 border-8 border-[#ed8b28]"
              ></div>
              <img
                src="/waveline2.png"
                alt=""
                // initial={{ x: -20, opacity: 0 }}
                // animate={{ x: 0, opacity: 1 }}
                // transition={{ duration: 0.4, ease: 'backIn' }}
                className="absolute h-7 bottom-[0px] left-[-10px] z-0"
              />
              <div
                // initial={{ x: -40, opacity: 0 }}
                // animate={{ x: 0, opacity: 1 }}
                // transition={{ duration: 0.4, ease: 'backIn' }}
                className="text-[#f8ecce] text-xs"
              >
                {t('profil.greeting.who')}
              </div>
              <div
                // initial={{ x: -40, opacity: 0 }}
                // animate={{ x: 0, opacity: 1 }}
                // transition={{ duration: 1, ease: 'backIn' }}
                className="flex justify-center items-center text-[#f8ecce] text-base font-bold relative z-10"
              >
                {t('profil.greeting.role')}
              </div>
              <div
                // initial={{ y: 20, opacity: 0 }}
                // animate={{ y: 0, opacity: 1 }}
                // transition={{ duration: 1.6, ease: 'backIn' }}
                className="text-[#f8ecce] text-[14px] relative z-10"
              >
                {t('profil.greeting.jobdesc')}
              </div>
            </motion.div>
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="relative overflow-hidden h-56 flex flex-col justify-start items-center md:h-full md:col-span-2 md:row-span-3 md:col-start-1 md:row-start-4 bg-[#F8ECCE] text-black rounded-xl"
            >
              <div className="flex flex-wrap items-center justify-center gap-2 p-4">
                <div
                  //   initial={{ x: 40, opacity: 0 }}
                  //   animate={{ x: 0, opacity: 1 }}
                  //   transition={{ duration: 1.6, ease: 'backIn' }}
                  className="bg-[#023a37] text-[#fff] p-1 px-2 rounded-full  text-xs"
                >
                  Professional Frontend Engineer
                </div>
              </div>
              <div className="px-4 flex flex-row justify-center md:flex-col md:justify-center items-center mt-4 gap-4">
                <div className="flex flex-col items-center">
                  <div
                    // initial={{ y: 20, opacity: 0 }}
                    // animate={{ y: 0, opacity: 1 }}
                    // transition={{ duration: 1, ease: 'backIn' }}
                    className="text-[#023a37] font-bold text-center text-2xl md:text-3xl"
                  >
                    Ubay Dillah
                  </div>
                  <div
                    // initial={{ y: 20, opacity: 0 }}
                    // animate={{ y: 0, opacity: 1 }}
                    // transition={{ duration: 1.6, ease: 'backIn' }}
                    className="text-[#023a37] text-[14px] text-center"
                  >
                    {t('profil.experience')}
                  </div>
                </div>
                <img
                  src="/people.webp"
                  alt=""
                  //   initial={{ y: 40, opacity: 0 }}
                  //   animate={{ y: 0, opacity: 1 }}
                  //   transition={{ duration: 1, delay: 1, ease: 'backIn' }}
                  className="w-24 md:w-28 z-0"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.6 }}
              className="relative overflow-hidden h-auto p-4 md:h-full md:row-start-2 md:col-span-2 md:row-span-5 md:col-start-3 bg-[#ed8b28] text-white rounded-xl"
            >
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.4, ease: 'backOut' }}
                className="absolute bottom-[-10px] right-[-10px] z-10 h-10 w-10 rounded-full border-8 border-[#F8ECCE]"
              ></motion.div>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.4, ease: 'backOut' }}
                className="absolute bottom-[-10px] left-[-10px] z-10 h-10 w-10 rounded-full border-8 border-[#F8ECCE]"
              ></motion.div>
              <div className="text-xl font-bold text-[#023a37]">{t('blog.title')}</div>
              <div className="flex flex-col gap-2 mt-4">
                {fiveBlogLatest.sort(sortByDate).map((post: IBlogDetail) => (
                  <a
                    key={`${post.frontmatter.title}`}
                    href={post.url}
                    className="bg-[#F8ECCE] p-2 rounded-lg grid grid-cols-[auto_16px] gap-2"
                  >
                    <div className="font-semibold text-[#023a37] text-sm truncate">
                      {post.frontmatter.title}
                    </div>
                    <Icon icon={post.frontmatter.icon} className="w-4 h-4" />
                  </a>
                ))}
              </div>
              <div className="mt-4 relative z-10 text-right">
                <a
                  className="font-bold text-[#023a37] border-b-2 border-dotted border-[#023a37]"
                  href={getPath(`${selectLang}/catatan`)}
                >
                  {t('blog.all')}
                </a>
              </div>
            </motion.div>
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.8 }}
              className="h-52 md:h-full md:col-span-2 md:row-span-3 md:col-start-5 md:row-start-2 bg-[#F8ECCE] text-black rounded-xl"
            ></motion.div>
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 2 }}
              className="h-40 md:h-full md:col-span-2 md:row-span-2 md:col-start-5 md:row-start-5 lg:col-span-2 lg:row-span-2 lg:col-start-5 lg:row-start-5 bg-[#023a37] text-white rounded-xl"
            >
              5
            </motion.div>
          </div>
        </motion.div>
      )}
      {isTransitionDone &&
        pathName.split('/').length === 3 &&
        pathName.search('catatan') !== -1 && <div>Hallo</div>}
    </motion.section>
  )
}

export default Home
