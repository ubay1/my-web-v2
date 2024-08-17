import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'

const BlogPost: React.FC<{ url: any; data: any }> = ({ url, data }) => {
  return (
    <div className="bg-black/[0.2] m-2 break-inside-avoid cursor-pointer relative rounded-lg hover:bg-gray-7 hover:bg-opacity-8">
      <a href={url} className="text-[#c2c2c2] p-4 flex flex-col gap-4">
        <div className="w-4 h-4 bg-[#000] rounded-full">
          <Icon icon={data.icon} className="w-4 h-4" />
        </div>
        <div>
          <div className="break-words">{data.title}</div>
          <div className="text-[10px]">{data.date}</div>
        </div>

        {data.description && data.description !== '' && (
          <>
            <hr className="border-1 border-[#c2c2c2]" />
            <div className="text-xs line-clamp-3">{data.description}</div>
          </>
        )}
      </a>
    </div>
  )
}
export default BlogPost
