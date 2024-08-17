import { Icon } from '@iconify/react'
import Sidebar from './Sidebar'
import { usePageStore } from '../stores/page'
import React, { useState } from 'react'
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
      },
      {
        label: 'Catatan',
        path: '/catatan',
        icon: 'ph-notebook-duotone',
      },
      {
        label: 'Proyek',
        path: '/proyek',
        icon: 'ph-confetti-duotone',
      },
      {
        label: 'Pencapaian',
        path: '/pencapaian',
        icon: 'ph-medal-military-duotone',
      },
      {
        label: 'Kontak',
        path: '/kontak',
        icon: 'ph-phone-duotone',
      },
    ])
  }, [])
  return (
    <div className="w-full h-[300px] gap-4">
      {/* menu large screen */}
      <div className="hidden md:top-0 md:absolute md:z-[40] md:w-full bg-black/[0.5] backdrop-blur-sm md:flex md:justify-center md:items-center">
        {listMenu.map((item, idx) => (
          <div
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
                'hover:opacity-50':
                  item.path.split('/')[1] !== window.location.pathname.split('/')[1],
              })}
              href={item.path}
            >
              <Icon icon={item.icon} className={classNames('w-6 h-6')} />
              {item.label}
            </a>
          </div>
        ))}
      </div>
      {/* menu sidebar small screen */}
      <Sidebar listMenu={listMenu} />
      <div className="p-2 flex items-center md:hidden top-0 absolute z-[40] w-full bg-black/[0.5] backdrop-blur-sm">
        <button
          aria-label="btn-menu"
          onClick={() => setShowSidebarSmallScreen?.(!showSidebarSmallScreen)}
        >
          <Icon icon="ion-menu" className="w-10 h-10 " />
        </button>
        <div className="h-full flex-1 text-center pr-10 text-lg font-mono">Ubay Dillah</div>
      </div>
      <div className="top-0 absolute w-full h-full">
        {children}
        <div className="absolute bottom-0 right-0 flex items-center gap-2 bg-black/[0.5] p-1 rounded-t-md">
          <Icon icon="ph:info-duotone" className="hidden xs:block" />
          <div className="text-xs">Foto hanya pemanis, emang manis sih orangnya ^_^</div>
        </div>
      </div>
    </div>
  )
}
