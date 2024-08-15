import React from 'react'
import { usePageStore } from '../stores/page'
import classNames from 'classnames'
import { Icon } from '@iconify/react'

const Sidebar: React.FC<{ listMenu: { label: string; path: string; icon: string }[] }> = ({
  listMenu,
}) => {
  const { pageActive, showSidebarSmallScreen, setPageActive, setShowSidebarSmallScreen } =
    usePageStore()

  React.useEffect(() => {
    console.log(window.location)
  }, [])

  return (
    <div className="block md:hidden">
      <div
        className={classNames(
          `top-0 left-0 w-full sm:w-[320px] bg-[#1e1e1e]  text-white fixed h-screen z-[120]  ease-in-out duration-300 `,
          {
            'translate-x-0': showSidebarSmallScreen,
            '-translate-x-full': !showSidebarSmallScreen,
          },
        )}
      >
        <button
          className="bg-red-500 absolute right-2 top-4 p-2 rounded-full"
          onClick={() => setShowSidebarSmallScreen?.(!showSidebarSmallScreen)}
        >
          <Icon icon="ion-close" className="w-4 h-4 " />
        </button>
        {/* list menu */}
        <div className="p-4 flex flex-col gap-4 mt-8 h-full pb-36 overflow-auto">
          {listMenu.map((menu, idx) => (
            <a
              key={`${menu.path}-${idx}`}
              className="flex gap-2"
              href={menu.path}
              onClick={() => setShowSidebarSmallScreen?.(!showSidebarSmallScreen)}
            >
              <Icon icon={menu.icon} className="w-[20px] h-[20px]" />
              <div>{menu.label}</div>
            </a>
          ))}
        </div>
      </div>
      {/* backdrop */}
      <div
        className={classNames(
          'fixed z-[100] bg-black/[0.4] backdrop-blur-md w-full h-screen left-0 top-0',
          {
            block: showSidebarSmallScreen,
            hidden: !showSidebarSmallScreen,
          },
        )}
      ></div>
    </div>
  )
}

export default Sidebar
