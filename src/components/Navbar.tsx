import React, { useEffect } from 'react'
import Home from './elements/icons/Home'
import Note from './elements/icons/Note'
import Album from './elements/icons/Album'
import Achievment from './elements/icons/Achievment'
import Lang from './elements/icons/Lang'
import { usePageStore } from '@stores/page'
import { AnimatePresence, motion } from 'framer-motion'
import WithInitialTransition from './HOC/WithInitialTransition'

const Navbar = () => {
  const { lang, pathName, setPathName, setLang } = usePageStore()
  const componentMapping: any = {
    home: Home,
    note: Note,
    album: Album,
    achievment: Achievment,
    lang: Lang,
  }
  const LIST = [
    {
      name: 'home',
      href: `/`,
      width: 24,
      height: 24,
    },
    {
      name: 'note',
      href: '/catatan',
      width: 28,
      height: 28,
    },
    // {
    //   name: 'album',
    //   href: '/proyek',
    //   width: 24,
    //   height: 24,
    // },
    // {
    //   name: 'achievment',
    //   href: '/pencapaian',
    //   width: 24,
    //   height: 24,
    // },
    {
      name: 'lang',
      href: 'none',
      width: 24,
      height: 24,
    },
  ]

  const [isShowListLang, setIsShowListLang] = React.useState(false)

  const getPath = (path: string) => (path === '/' ? path : `/${path}`)

  const getActiveColor = (href: string) => {
    if (
      href === '/' &&
      (pathName.split('/').length === 2 ||
        (pathName.split('/').length === 3 && !pathName.split('/')[2]))
    ) {
      return '#ed8b28'
    }

    // Check if current path matches navigation href
    const currentPath = pathName.split('/')[2] || ''
    if (href.slice(1) === currentPath) {
      return '#ed8b28'
    }

    return '#232325'
  }

  useEffect(() => {
    const pathName = window.location.pathname
    // console.log(pathName)
    setPathName?.(pathName)
    setLang?.(pathName.split('/')[1] as 'id' | 'en')
  }, [])
  return (
    <motion.section exit={{ opacity: 0 }}>
      <motion.div
        animate={{
          transition: { staggerChildren: 0.1, delayChildren: 1 },
        }}
        className="w-full flex justify-center"
      >
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: 0,
            type: 'spring',
            stiffness: 100,
            damping: 10,
            bounce: 0.5,
          }}
          className="fixed top-10 z-[100] rounded-full p-2 px-4 border border-[#ed8b28] bg-[#fff] flex items-center gap-4"
        >
          {LIST.map((item, index) => {
            const Component = componentMapping[item.name]
            const isLastItem = item.name === 'lang'

            return isLastItem ? (
              <button
                key={index}
                aria-label="lang"
                aria-labelledby="lang"
                className="flex items-center justify-center w-8 h-8 rounded-full"
                onClick={() => setIsShowListLang(!isShowListLang)}
              >
                <Component
                  color={getActiveColor(item.href)}
                  width={item.width}
                  height={item.height}
                />
              </button>
            ) : (
              <a
                key={index}
                href={getPath(`${lang}${item.href}`)}
                className="flex items-center justify-center w-8 h-8 rounded-full text-[#fff] text-lg font-semibold"
                title={item.name}
                aria-label={item.name}
              >
                <Component
                  color={getActiveColor(item.href)}
                  width={item.width}
                  height={item.height}
                />
              </a>
            )
          })}

          <AnimatePresence>
            {isShowListLang && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-12 right-2 bg-[#fff] border border-[#ed8b28] rounded-md shadow-md p-2 w-[100px]"
              >
                <ul className="flex flex-col items-center gap-2 ml-0 list-none">
                  <li>
                    <a href="/id" className="text-[#232325] text-[14px]" title="id" aria-label="id">
                      Indonesia
                    </a>
                  </li>
                  <li>
                    <a href="/en" className="text-[#232325] text-[14px]" title="en" aria-label="en">
                      English
                    </a>
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}

export default Navbar
