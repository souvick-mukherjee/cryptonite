import Link from 'next/link'
import React from 'react'
import { MdSunnySnowing } from 'react-icons/md'

const IMAGE_BANNER = '/assets/imgs/pexels-dio-hasbi-saniskoro-3280130.jpg'
const Banner: React.FC<{ mine?: boolean }> = ({ mine }) => {
  return (
    <div
      style={{ backgroundImage: 'url(' + IMAGE_BANNER + ')' }}
      className="relative w-full h-[44rem] flex items-center justify-center text-white
      bg-no-repeat bg-cover bg-center"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-75"></div>
      <div className="flex flex-col justify-end text-white p-8 space-y-8 relative z-10 h-80">
        {!mine ? (
          <h1 className="text-7xl text-center font-semibold">
            By the Community. <br /> For the Community.
          </h1>
        ) : (
          <h1 className="text-7xl text-center font-semibold">
            By the Community. <br /> For the Community.
          </h1>
        )}
        <Link
          href={'/donations/create'}
          className="bg-white text-purple-600 px-4 space-x-1
        flex justify-center items-center rounded-full text-center py-3
        transition duration-300 ease-in-out hover:bg-purple-600 hover:text-white"
        >
          
          <span>Explore Web 3.0 Events</span>
        </Link>
      </div>
    </div>
  )
}

export default Banner
