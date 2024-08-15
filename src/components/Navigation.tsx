import { Icon } from '@iconify/react'
import Sidebar from './Sidebar'
import { usePageStore } from '../stores/page'
import React, { useState } from 'react'
import Banner from '@images/banner.webp'
import classNames from 'classnames'

export default function Navigation({ children }: any) {
  const { pageActive, showSidebarSmallScreen, setPageActive, setShowSidebarSmallScreen } =
    usePageStore()

  const [listMenu, setListMenu] = useState<any[]>([])

  React.useEffect(() => {
    const pathName = window.location.pathname
    setListMenu([
      {
        label: 'Profil',
        path: '/',
        icon: 'ph-user-duotone',
        isActive: pathName === '/' ? true : false,
      },
      {
        label: 'Catatan',
        path: '/about',
        icon: 'ph-notebook-duotone',
        isActive: pathName === '/about' ? true : false,
      },
      {
        label: 'Proyek',
        path: '/proyek',
        icon: 'ph-confetti-duotone',
        isActive: pathName === '/proyek' ? true : false,
      },
      {
        label: 'Pencapaian',
        path: '/pencapaian',
        icon: 'ph-medal-military-duotone',
        isActive: pathName === '/pencapaian' ? true : false,
      },
      {
        label: 'Kontak',
        path: '/kontak',
        icon: 'ph-phone-duotone',
        isActive: pathName === '/kontak' ? true : false,
      },
    ])
  }, [])
  return (
    <div className="w-full h-[300px] gap-4">
      {/* menu large screen */}
      <div className="hidden md:top-0 md:absolute md:z-[40] md:w-full bg-black/[0.5] backdrop-blur-sm md:flex md:justify-center md:items-center">
        {listMenu.map((item, idx) => (
          <li
            key={`icon-${idx}`}
            aria-current={
              item.path.split('/')[1] === window.location.pathname.split('/')[1]
                ? 'page'
                : undefined
            }
            className={'list-none relative'}
          >
            <a
              className={classNames('flex items-center gap-1 p-4 ', {
                'hover:opacity-50': !item.isActive,
              })}
              href={item.path}
            >
              <Icon icon={item.icon} className={classNames('w-6 h-6')} />
              {item.label}
            </a>
          </li>
        ))}
      </div>
      {/* menu sidebar small screen */}
      <Sidebar listMenu={listMenu} />
      <div className="p-2 md:hidden top-0 absolute z-[40] w-full bg-black/[0.5] backdrop-blur-sm">
        <button onClick={() => setShowSidebarSmallScreen?.(!showSidebarSmallScreen)}>
          <Icon icon="ion-menu" className="w-10 h-10 " />
        </button>
      </div>
      <div className="top-0 absolute w-full h-full">{children}</div>
    </div>
  )
}
