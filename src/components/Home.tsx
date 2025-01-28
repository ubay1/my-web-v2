import { useEffect } from 'react'
import { animate, motion } from 'framer-motion'

export default function Home() {
  useEffect(() => {
    // const body = document.querySelector('body')
    // if (body) {
    //   body.classList.add('overflow-hidden')
    // }
  }, [])

  const marqueeVariants = {
    animate: {
      x: [0, -400],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: 'loop',
          duration: 10,
          ease: 'linear',
        },
      },
    },
  }

  return (
    <div className="relative p-2 px-4 bg-[#002522] flex justify-center items-center overflow-hidden">
      <div className="flex flex-col my-10 md:mt-0 md:grid md:grid-cols-6 md:grid-rows-7 gap-6 w-full h-full min-h-screen overflow-hidden">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0 }}
          className="relative h-40 flex flex-col justify-center items-center md:h-full md:col-span-2 md:row-start-2 md:row-span-2 bg-[#023a37] text-white rounded-xl text-center overflow-hidden"
        >
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: 'backOut' }}
            className="absolute top-[-10px] left-[-10px] z-10 h-10 w-10 rounded-full border-8 border-[#ed8b28]"
          ></motion.div>
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: 'backOut' }}
            className="absolute bottom-[-10px] right-[-10px] z-10 h-10 w-10 rounded-full border-8 border-[#ed8b28]"
          ></motion.div>
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: 'backIn' }}
            className="absolute top-[-10px] right-[-10px] z-10 h-8 w-8 border-8 border-[#ed8b28]"
          ></motion.div>
          {/* <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'backIn' }}
            className="absolute bottom-[-10px] left-[-10px] z-10 h-8 w-8 border-8 border-[#ed8b28]"
          ></motion.div> */}
          <motion.img
            src="/waveline2.png"
            alt=""
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: 'backIn' }}
            className="absolute h-7 bottom-[0px] left-[-10px] z-0"
          />
          {/* <motion.img
            src="/idea.png"
            alt=""
            initial={{ y: 20, opacity: 0, rotate: -20 }}
            animate={{ y: 0, opacity: 0.7, rotate: -20 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute h-28 -bottom-3 -right-6 z-0"
          /> */}
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: 'backIn' }}
            className="text-[#f8ecce] text-xs"
          >
            Who am i ?
          </motion.div>
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: 'backIn' }}
            className="flex justify-center items-center text-[#f8ecce] text-lg font-bold relative z-10"
          >
            I'm a Software Engineer
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.6, ease: 'backIn' }}
            className="text-[#f8ecce] relative z-10"
          >
            focus on interface development
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="relative h-56 flex flex-col justify-start items-center md:h-full md:col-span-2 md:row-span-3 md:col-start-1 md:row-start-4 bg-[#F8ECCE] text-black rounded-xl"
        >
          <motion.div className="flex flex-wrap items-center justify-center gap-2 p-4">
            <motion.div
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, ease: 'backIn' }}
              className="bg-[#023a37] text-[#fff] p-1 px-2 rounded-full  text-xs"
            >
              #1 The Best
            </motion.div>
            <motion.div
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.6, ease: 'backIn' }}
              className="bg-[#023a37] text-[#fff] p-1 px-2 rounded-full  text-xs"
            >
              Professional Frontend Engineer
            </motion.div>
          </motion.div>
          <div className="px-4 flex flex-row justify-center md:flex-col md:justify-center items-center mt-4 gap-4">
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: 'backIn' }}
                className="text-[#023a37] font-bold text-center text-2xl md:text-3xl"
              >
                Ubay Dillah
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.6, ease: 'backIn' }}
                className="text-[#023a37] text-[14px] text-center"
              >
                Over 5+ years expereience
              </motion.div>
            </div>
            <motion.img
              src="/people.webp"
              alt=""
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 1, ease: 'backIn' }}
              className="w-24 md:w-28 z-0"
            />
          </div>
        </motion.div>
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="h-64 md:h-full md:col-span-4 md:row-span-3 md:col-start-3 md:row-start-2 lg:row-start-2 lg:col-span-2 lg:row-span-5 lg:col-start-3 bg-[#ed8b28] text-white rounded-xl"
        >
          3
        </motion.div>
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="h-52 md:h-full md:col-span-2 md:row-span-2 md:col-start-3 md:row-start-5 lg:col-span-2 lg:row-span-3 lg:col-start-5 lg:row-start-2 bg-[#F8ECCE] text-black rounded-xl"
        >
          4
        </motion.div>
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.6 }}
          className="h-40 md:h-full md:col-span-2 md:row-span-2 md:col-start-5 md:row-start-5 lg:col-span-2 lg:row-span-2 lg:col-start-5 lg:row-start-5 bg-[#023a37] text-white rounded-xl"
        >
          5
        </motion.div>
      </div>
    </div>
  )
}
