import { useEffect, useRef, useState } from 'react'
import { animate, motion, useMotionValue } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { sortByDate } from '@utils/sortByDate'
import type { IBlogDetail } from '@typess/blog'
import { Icon } from '@iconify/react'
import { useDimensions } from '@hooks/useDimension'
import WithInitialTransition from '@components/HOC/WithInitialTransition'
import Card from '@components/elements/Card'
import { usePageStore } from '@stores/page'
import useMeasure from 'react-use-measure'

interface IProps {
  fiveBlogLatest?: any
}

const Home: React.FC<IProps> = ({ fiveBlogLatest }) => {
  const { t } = useTranslation()
  const ref = useRef(null)
  const { width } = useDimensions(ref)

  const { lang } = usePageStore()

  const getPath = (path: string) => (path === '/' ? path : `/${path}`)

  useEffect(() => {
    if (width > 0 && width < 768) {
      ;(document.querySelector('body') as HTMLElement).classList.remove('overflow-hidden')
    } else {
      window.scrollTo({ top: 0 })
      // remove karena ada bug di windows
      ;(document.querySelector('body') as HTMLElement).classList.remove('overflow-hidden')
    }
  }, [width])

  const images = [
    { img: '/tech/js.svg', text: 'JavaScript' },
    { img: '/tech/ts.svg', text: 'TypeScript' },
    { img: '/tech/next.svg', text: 'Next' },
    { img: '/tech/react.svg', text: 'React' },
    { img: '/tech/zustand.svg', text: 'Zustand' },
    { img: '/tech/tanstack.svg', text: 'Tanstack' },
    { img: '/tech/nuxt.svg', text: 'Nuxt' },
    { img: '/tech/vue.svg', text: 'Vue' },
    { img: '/tech/pinia.svg', text: 'Pinia' },
    { img: '/tech/svelte.svg', text: 'Svelte' },
    { img: '/tech/astro.svg', text: 'Astro' },
    { img: '/tech/tailwind.svg', text: 'Tailwind' },
    { img: '/tech/uno.svg', text: 'Uno' },
    { img: '/tech/express.svg', text: 'Express' },
  ]
  const FAST_DURATION = 25
  const SLOW_DURATION = 75

  const [duration, setDuration] = useState(FAST_DURATION)
  let [refMeasure, { width: widthMeasure }] = useMeasure()

  const xTranslation = useMotionValue(0)

  const [mustFinish, setMustFinish] = useState(false)
  const [rerender, setRerender] = useState(false)

  useEffect(() => {
    let controls
    let finalPosition = -widthMeasure / 2 - 8

    if (mustFinish) {
      controls = animate(xTranslation, [xTranslation.get(), finalPosition], {
        ease: 'linear',
        duration: duration * (1 - xTranslation.get() / finalPosition),
        onComplete: () => {
          setMustFinish(false)
          setRerender(!rerender)
        },
      })
    } else {
      controls = animate(xTranslation, [0, finalPosition], {
        ease: 'linear',
        duration: duration,
        repeat: Infinity,
        repeatType: 'loop',
        repeatDelay: 0,
      })
    }

    return controls?.stop
  }, [rerender, xTranslation, duration, widthMeasure])

  return (
    <motion.section exit={{ opacity: 0 }}>
      <motion.div
        ref={ref}
        className="relative p-2 px-4 flex justify-center items-center overflow-hidden"
        initial="initial"
        animate={{
          transition: { staggerChildren: 0.1, delayChildren: 2.8 },
        }}
      >
        <div className="flex flex-col mt-28 my-10 md:mt-0 md:grid md:grid-cols-6 md:grid-rows-7 gap-6 w-full h-full min-h-screen overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="relative px-4 h-40 flex flex-col justify-center items-center md:h-full md:col-span-2 md:row-start-2 md:row-span-2 bg-[#023a37] text-white rounded-xl text-center overflow-hidden"
          >
            <div className="absolute top-[-10px] left-[-10px] z-10 h-10 w-10 rounded-full border-8 border-[#ed8b28]"></div>
            <div className="absolute bottom-[-10px] right-[-10px] z-10 h-10 w-10 rounded-full border-8 border-[#ed8b28]"></div>
            <div className="absolute top-[-10px] right-[-10px] z-10 h-8 w-8 border-8 border-[#ed8b28]"></div>
            <img
              src="/waveline2.png"
              alt="icon-waveline"
              width={96}
              height={28}
              className="absolute bottom-[0px] left-[-10px] z-0"
            />
            <div className="text-[#f8ecce] text-xs">{t('pages.home.profil.greeting.who')}</div>
            <div className="flex justify-center items-center text-[#f8ecce] text-base font-bold relative z-10">
              {t('pages.home.profil.greeting.role')}
            </div>
            <div className="text-[#f8ecce] text-[14px] relative z-10">
              {t('pages.home.profil.greeting.jobdesc')}
            </div>
          </motion.div>
          {/* profil */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative overflow-hidden h-56 flex flex-col justify-start items-center md:h-full md:col-span-2 md:row-span-3 md:col-start-1 md:row-start-4 bg-[#F8ECCE] text-black rounded-xl"
          >
            <div className="p-4">
              <div className="bg-[#023a37] text-[#fff] p-1 px-2 rounded-full  text-xs">
                Professional Frontend Engineer
              </div>
            </div>
            <div className="px-4 flex flex-row justify-center md:flex-col md:justify-center items-center mt-4 gap-4">
              <div className="flex flex-col items-center">
                <div className="text-[#023a37] font-bold text-center text-2xl md:text-3xl">
                  Ubay Dillah
                </div>
                <div className="text-[#023a37] text-[14px] text-center">
                  {t('pages.home.profil.experience')}
                </div>
              </div>
              <img
                src="/people.webp"
                alt="img-people"
                width={0}
                height={0}
                className="w-24 md:w-28 z-0"
              />

              <div className="flex flex-col gap-2 mb-4">
                <a
                  href={t('pages.home.profil.link_portfolio')}
                  className="text-center text-sm font-bold text-[#023a37]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('pages.home.profil.download_portfolio')}
                </a>
                <a
                  href={t('pages.home.profil.link_cv')}
                  className="text-center text-sm font-bold text-[#023a37]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('pages.home.profil.download_cv')}
                </a>
              </div>
            </div>
          </motion.div>
          {/* 10 latest notes */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative z-[99] overflow-hidden h-auto p-4 md:h-full md:row-start-2 md:col-span-2 md:row-span-5 md:col-start-3 bg-[#ed8b28] text-white rounded-xl"
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
            <div className="text-xl font-bold text-[#023a37]">{t('pages.home.blog.title')}</div>
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
                  {/* <Icon icon={post.frontmatter.icon} className="w-4 h-4" /> */}
                  {typeof post.frontmatter.icon !== 'string' ? (
                    <Icon icon={post.frontmatter.icon[0]} className="w-4 h-4" />
                  ) : (
                    <Icon icon={post.frontmatter.icon} className="w-4 h-4" />
                  )}
                </a>
              ))}
            </div>
            <div className="mt-4 relative z-10 text-right">
              <a
                className="font-bold text-[#023a37] border-b-2 border-dotted border-[#023a37]"
                href={getPath(`${lang}/catatan`)}
              >
                {t('pages.home.blog.all')}
              </a>
            </div>
          </motion.div>
          {/* latest achievment */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="relative overflow-hidden h-80 md:h-full md:col-span-2 md:row-span-3 md:col-start-5 md:row-start-2 bg-[#F8ECCE] text-black rounded-xl"
          >
            <div className="p-4 flex flex-col items-center justify-start gap-4">
              <div className="bg-[#023a37] max-w-[200px] text-center text-[#fff] p-1 px-2 rounded-full  text-xs">
                {t('pages.home.achievment.title')}
              </div>
              <div className="flex flex-col items-center gap-1">
                <img
                  src="/pencapaian/identik-asik.webp"
                  alt="identik-asik"
                  width={0}
                  height={0}
                  className="w-[300px] md:w-[270px] md:h-[200px] object-contain"
                />
                <div className="text-xs text-center text-[#023a37]">
                  {t('pages.home.achievment.desc')}
                </div>
              </div>
            </div>
          </motion.div>
          {/* tech */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="relative overflow-hidden p-4 h-52 md:h-full md:col-span-2 md:row-span-2 md:col-start-5 md:row-start-5 lg:col-span-2 lg:row-span-2 lg:col-start-5 lg:row-start-5 bg-[#023a37] text-white rounded-xl"
          >
            <div className="absolute top-[-10px] left-[-10px] z-10 h-10 w-10 rounded-full border-8 border-[#ed8b28]"></div>
            <div className="absolute bottom-[-10px] right-[-10px] z-10 h-10 w-10 rounded-full border-8 border-[#ed8b28]"></div>
            <div className="absolute top-[-10px] right-[-10px] z-10 h-8 w-8 border-8 border-[#ed8b28]"></div>
            <img
              src="/waveline2.png"
              alt=""
              className="absolute h-7 bottom-[0px] left-[-10px] z-0"
            />
            <div className=" text-center mt-2 mb-8 font-bold text-[#F8ECCE]">
              {t('pages.home.tech.title')}
            </div>
            <motion.div
              className="absolute left-4 top-[40%] flex gap-10"
              style={{ x: xTranslation }}
              ref={refMeasure}
              onHoverStart={() => {
                setMustFinish(true)
                setDuration(SLOW_DURATION)
              }}
              onHoverEnd={() => {
                setMustFinish(true)
                setDuration(FAST_DURATION)
              }}
            >
              {[...images, ...images].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center justify-center">
                  <Card image={`${item?.img}`} label={item?.text} />
                  <div className="text-white text-sm">{item?.text}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
      {/* )} */}
    </motion.section>
  )
}

export default Home
