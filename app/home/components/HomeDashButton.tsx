import React from 'react'
import Image from 'next/image'
import { useState } from 'react'

export default function HomeDashButton({ text, image,blueImage}: {text:string, image:string ,blueImage:string }) {
  const [hover, setHover] = useState(false)
  return (
    <button className={` self-center transition ease-in-out duration-300 delay-50 items-center  py-2 rounded-full px-4 sm:px-5 lg:px-6 xl:px-5 2xl:px-5 text-center font-medium  font-dm-sans flex gap-2  border-2 text-white hover:text-home-blue hover:border-home-blue `}
    onMouseEnter={() => setHover(true)}
    onMouseLeave={() => setHover(false)}
    >
      {hover?
      <Image
      src={ blueImage}
      alt="Picture of the button"
      width={25}
      height={25}
      className='  self-center'
    />
      :
      <Image
          src={ image}
          alt="Picture of the button"
          width={25}
          height={25}
          className='  self-center'
        />
      }

      
      
      {text}
    </button>
  )
}
