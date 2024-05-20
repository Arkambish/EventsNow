import React from 'react'
import Image from 'next/image'
interface homeButtonProps {
  filled:boolean,
  text:string,
  image:string
}

export default function HomeButton({ filled,text,image}: homeButtonProps) {
  return (
    <button className={`items-center py-3 rounded-full px-7 text-center font-bold text-lg font-dm-sans flex gap-2 ${filled?"text-home-blue bg-white":" border-2 text-white"} `} >
      {image && <Image
          src={`/images/reusableComponents/${image}`}
          alt="Picture of the button"
          width={25}
          height={25}
          className='  self-center'
        />}
      {text}
    </button>
  )
}
