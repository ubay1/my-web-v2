import React, { FC, useEffect } from 'react'
import { usePageStore } from '../stores/page'
import classNames from 'classnames'
import { Icon } from '@iconify/react'

const Sidebar: FC<{ listMenu: { label: string; path: string; icon: string }[] }> = ({
  listMenu,
}) => {
  const { pageActive, showSidebarSmallScreen, setPageActive, setShowSidebarSmallScreen } =
    usePageStore()

  useEffect(() => {
    console.log(window.location)
  }, [])

  return (
    <div className="block sm:hidden">
      <div
        className={classNames(
          `top-0 left-0 w-[90%] xs:w-[300px] bg-primary  text-white fixed h-full z-[100]  ease-in-out duration-300 `,
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
        {/* separator */}
        <hr className="border-b border-extra3" />
        {/* list menu */}
        <div className="p-4 flex flex-col gap-4 mt-4 h-full pb-36 overflow-auto">
          {listMenu.map((menu) => (
            <a
              key={menu.path}
              className="flex gap-2"
              href={menu.path}
              onClick={() => setShowSidebarSmallScreen?.(!showSidebarSmallScreen)}
            >
              <img src={menu.icon} alt={`icon-${menu.label}`} className="w-[20px] h-[20px]" />
              <div>{menu.label}</div>
            </a>
          ))}
        </div>
      </div>
      {/* backdrop */}
      <div
        className={classNames(
          'fixed z-40 bg-tint/[0.8] backdrop-blur-md w-full h-full left-0 top-0',
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
