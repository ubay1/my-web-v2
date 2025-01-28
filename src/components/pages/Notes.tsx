import { Icon } from '@iconify/react/dist/iconify.js'
import React, { useEffect } from 'react'
import type { IBlogDetail } from '../../types/blog'
import WithInitialTransition from '@components/HOC/WithInitialTransition'

const Notes: React.FC<{ data: IBlogDetail }> = ({ data }) => {
  useEffect(() => {
    ;(document.querySelector('body') as HTMLElement).classList.remove('overflow-hidden')
  }, [])
  return (
    <div className="bg-black/[0.2] border border-[#393939] rounded-md m-2 break-inside-avoid cursor-pointer relative hover:bg-gray-7 hover:bg-opacity-8">
      <a href={data.url} className="text-white p-4 flex flex-col gap-4">
        <div className="w-4 h-4 bg-[#000] rounded-full">
          <Icon icon={data.frontmatter.icon} className="w-4 h-4" />
        </div>
        <div>
          <div className="break-words">{data.frontmatter.title}</div>
          <div className="text-[10px]">{data.frontmatter.date}</div>
        </div>

        {data.frontmatter.description && data.frontmatter.description !== '' && (
          <>
            <hr className="border-1 border-[#text-white]" />
            <div className="text-xs line-clamp-3">{data.frontmatter.description}</div>
          </>
        )}
      </a>
    </div>
  )
}
export default WithInitialTransition(Notes)
