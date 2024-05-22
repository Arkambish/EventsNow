import Image from 'next/image'
import React from 'react'

export default function SocialButton({image}:{image:string}) {
  return (
    <button className=' grid  size-11 rounded-full border-2'>
        <Image
            src={`/images/home/${image}.svg`}
            alt="Picture of the button"
            width={image=="facebook"? 10 : 15 }
            height={10}
            quality={100}
            className='  place-self-center'
        />
      
    </button>
  )
}
