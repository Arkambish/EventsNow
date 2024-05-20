import Image from 'next/image'
import React from 'react'
import HomeButton from './HomeButton'


export default function BookticketSection() {
  return (
    <div className="h-screen  overflow-hidden grid grid-cols-2	bg-[url('/images/home/Rectangle12.png')] bg-no-repeat bg-cover  bg-center bg-black
    ">
        <div className="  items-end  justify-center flex  ">
            <Image src="/images/home/image-area.png" alt="Picture of the author" style={{height:"80vh",
            width:"auto"
            }} width={2000} height={2000} quality={100}  />
            {/* <div className="bg-[url('/images/home/image-area.png')] bg-no-repeat h-full  bg-center bg-black">

            </div> */}
            

        </div>
        <div className=" p-10 flex ">
            <div className="  content-center px-28 grid gap-3">
              <div className=" font-monoton text-start font-normal text-white text-[40px]">Book Your Next Adventure Today!</div>
              <div className="text-start font-dm-sans text-lg font-normal text-white">Discover and Book Amazing Events Near You. Experience Unforgettable Moments with Just a Click.</div>
              <div className="flex gap-3">  
              <HomeButton 
              filled={true}
              text={"Book Tickets"}
              image={""}
              />
              <HomeButton
              filled={false}
              text={"Learn More"}
              image={""}
              />
              </div>
            </div>

        </div>
      
    </div>
  )
}
