import React from 'react'

export default function OverviewComponent() {
  return (
    <div className='h-screen grid content-center  p-10'>
      
      <div className=" text-center text-white  2xl:mx-56">
        <div className=" grid  ">
        <div className=" text-2xl lg:text-[80px] md:text-5xl font-bai-jamjuree font-bold mb-5">
        1000+ Customer
        </div>
        <div className=" font-roboto lg:text-base text-sm font-normal mb-10 sm:w-3/4 xl:w-7/12 text-center justify-self-center  ">
            Join a thriving community of satisfied users who trust us for their event management needs. With over 1000 customers benefiting from our seamless event hosting and ticketing solutions, we are dedicated to making your event planning experience smooth and successful. Be part of our growing success story!
        </div>
        <div className="sm:flex md:grid md:grid-cols-4 border-y-2 gap-5 w-full sm:max-md:justify-center">
            <div className="h-20 sm:h-52 content-center grid gap-2"
         >
                <div className=" font-Inter sm:text-xs lg:text-base  font-medium tracking-[6.4px]">
                ORGANIZATIONS
                </div>
                <div className=" text-sm lg:text-[24px] font-medium font-roboto tracking-wide">
                10,0000+ 
                </div>

            </div>
            <div className="h-20 sm:h-52 sm:text-xs lg:text-base content-center grid gap-2 md:border-x-2 max-sm:border-l-2">
                <div className="font-Inter font-medium tracking-[6.4px]">
                EVENTS
                </div>
                <div className="text-sm lg:text-[24px] font-medium font-roboto tracking-wide">
                45600 
                </div>

            </div>
            <div className="h-20 sm:h-52 content-center grid gap-2 sm:border-0 border-r-2 md:border-r-2">
                <div className="font-Inter sm:text-xs lg:text-base font-medium tracking-[6.4px]">
                SALES
                </div>
                <div className="text-sm lg:text-[24px] font-medium font-roboto tracking-wide">
                576864
                </div>

            </div>
            <div className="h-20 sm:h-52 sm:text-xs lg:text-base content-center grid gap-2">
                <div className="font-Inter font-medium tracking-[6.4px]">
                CUSTOMERS
                </div>
                <div className="text-sm lg:text-[24px] font-medium font-roboto tracking-wide">
                947444
                </div>

            </div>
        </div>

      </div>
      </div>
    </div>

  )
}
