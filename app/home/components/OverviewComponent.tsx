import React from 'react'

export default function OverviewComponent() {
  return (
    <div className='h-screen grid content-center'>
      
      <div className=" text-center text-white  mx-56">
        <div className=" grid  ">
        <div className="text-[80px] font-bai-jamjuree font-bold mb-5">
        1000+ Customer
        </div>
        <div className=" font-roboto text-base font-normal mb-10 w-7/12 text-center justify-self-center  ">
            Join a thriving community of satisfied users who trust us for their event management needs. With over 1000 customers benefiting from our seamless event hosting and ticketing solutions, we are dedicated to making your event planning experience smooth and successful. Be part of our growing success story!
        </div>
        <div className="grid grid-cols-4 border-y-2  w-full">
            <div className=" h-52 content-center grid gap-2"
            >
                <div className=" font-Inter font-medium tracking-[6.4px]">
                ORGANIZATIONS
                </div>
                <div className=" text-[24px] font-medium font-roboto tracking-wide">
                10,0000+ 
                </div>

            </div>
            <div className=" h-52 content-center grid gap-2 border-x-2">
                <div className="font-Inter font-medium tracking-[6.4px]">
                EVENTS
                </div>
                <div className="text-[24px] font-medium font-roboto tracking-wide">
                45600 
                </div>

            </div>
            <div className=" h-52 content-center grid gap-2 border-r-2">
                <div className="font-Inter font-medium tracking-[6.4px]">
                SALES
                </div>
                <div className="text-[24px] font-medium font-roboto tracking-wide">
                576864
                </div>

            </div>
            <div className=" h-52 content-center grid gap-2">
                <div className="font-Inter font-medium tracking-[6.4px]">
                CUSTOMERS
                </div>
                <div className="text-[24px] font-medium font-roboto tracking-wide">
                947444
                </div>

            </div>
        </div>

      </div>
      </div>
    </div>

  )
}
