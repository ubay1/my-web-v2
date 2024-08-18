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
        <div className="h-56 w-full bg-[#232323] flex justify-center items-center">
          <LazyLoadImage
            src={data.img}
            alt={`img-${data.id}`}
            effect="blur"
            className={classNames(
              'h-56 z-10 w-auto object-contain lt-md:w-[calc(100%)]',
              data.class,
            )}
            wrapperProps={{
              style: { transitionDelay: '1s' },
            }}
          />
        </div>
      </div>
      <div className="text-[#c2c2c2] flex flex-col p-4">
        <div className="text-center font-bold mb-2">{data.title}</div>
      </div>
    </div>
  )
}

export default ListProject
