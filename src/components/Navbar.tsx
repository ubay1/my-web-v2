import React, { useEffect } from 'react'
import Home from './elements/icons/Home'
import Note from './elements/icons/Note'
import Album from './elements/icons/Album'
import Achievment from './elements/icons/Achievment'
import { usePageStore } from '@stores/page'

const Navbar = () => {
  const { lang, pathName, setPathName, setLang } = usePageStore()
  const componentMapping: any = {
    home: Home,
    note: Note,
    album: Album,
    achievment: Achievment,
  }
  const LIST = [
    {
      name: 'home',
      href: `/`,
    },
    {
      name: 'note',
      href: '/catatan',
    },
    {
      name: 'album',
      href: '/proyek',
    },
    {
      name: 'achievment',
      href: '/pencapaian',
    },
  ]

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

    return '#023a37'
  }

  useEffect(() => {
    const pathName = window.location.pathname
    // console.log(pathName)
    setPathName?.(pathName)
    setLang?.(pathName.split('/')[1] as 'id' | 'en')
  }, [])
  return (
    <div className="w-full flex justify-center">
      <div className="fixed top-10 z-[100] rounded-full p-2 px-4 border border-[#ed8b28] bg-[#f8ecce] flex items-center gap-4">
        {LIST.map((item, index) => {
          const Component = componentMapping[item.name]
          return (
            <a
              key={index}
              href={getPath(`${lang}${item.href}`)}
              className="flex items-center justify-center w-8 h-8 rounded-full  text-[#f8ecce] text-lg font-semibold"
              title={item.name}
              aria-label={item.name}
            >
              <Component color={getActiveColor(item.href)} width="24" height="24" />
            </a>
          )
        })}
      </div>
    </div>
  )
}

export default Navbar
