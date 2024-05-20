import Image from 'next/image'
import React from 'react'

export default function CreateEventSection() {
  return (
    <div className='h-screen grid  items-center'>
        <div className="w-full h-1/3 bg-[#DFE4FF] grid grid-cols-2">
            <div className=" grid justify-center relative ">
                <Image className='absolute -top-32 left-1/4' src="/images/home/partyImage.png" alt="Picture of the author" height={500} width={500} quality={100}  />
            </div>
            <div className=" grid items-center justify-start">
                <div className="">
                <div className=" text-left text-[34px] font-dm-sans font-bold text-black mb-2">
                Make your own Event 
                </div>
                <div className="  text-[#272727] text-lg font-normal font-dm-sans pr-10 ">Bring your event to life with our easy-to-use platform. Create, manage, and promote effortlessly while reaching a wider audience. We provide all the tools for a successful and memorable event. Start today!</div>
                <button className='bg-home-blue text-white font-dm-sans text-centert text-lg font-bold px-20 py-3 rounded-full mt-5'>
                    Create Event
                </button>
                </div>

            </div>
        </div>
      
    </div>
  )
}
