import classNames from 'classnames'
import React from 'react'
import ImgLoader from './LazyImg/ImgLoader'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import { Icon } from '@iconify/react'

const ListProject: React.FC<{ data: any; index: number }> = ({ data, index }) => {
  return (
    <div
      key={`list-proyek-${index}`}
      className="break-inside-avoid mb-4 bg-black/[0.2] border border-[#393939] rounded-md"
    >
      <div className="rounded-t-md shadow-lg relative justify-center flex flex-row flex-wrap gap-2 overflow-hidden">
        <div className="absolute z-20 top-0 right-0 text-xs p-1 rounded-lb-md bg-orange-500 text-black">
          {data.project}
        </div>

        <div className="h-full flex justify-center w-full">
          <LazyLoadImage
            src={data.img}
            alt={`img-${data.label}`}
            width={'100%'}
            height={'100%'}
            effect="blur"
            wrapperProps={{
              style: { transitionDelay: '1s' },
            }}
          />
        </div>
      </div>
      <div className="text-[#c2c2c2] flex flex-col p-4">
        <div className="text-center font-bold mb-2">
          {data.url ? (
            <a
              href={data.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 decoration-none text-[#c2c2c2]"
            >
              <span>{data.label}</span>
              <Icon icon="icon-park-outline:share" />
            </a>
          ) : (
            data.label
          )}
        </div>
        <div className="text-center text-sm">{data.stack.join(', ')}</div>
      </div>
    </div>
  )
}

export default ListProject
