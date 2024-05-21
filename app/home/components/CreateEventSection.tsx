import Image from "next/image";
import React from "react";
import Link from "next/link";

export default function CreateEventSection() {
  return (
    <div className="h-screen grid  items-center py-10 ">
      <div className="w-full h-2/3 sm:h-2/5 bg-[#DFE4FF] lg:grid grid-cols-2 px-10">
        <div className="  hidden lg:grid justify-center relative ">
          <Image
            className="absolute  -top-24 sm:-top-28 xl:left-1/4 "
            src="/images/home/partyImage.png"
            alt="Picture of the author"
            height={450}
            width={450}
            quality={100}
          />
        </div>
        <div className=" grid items-center justify-center h-full   ">
          <div className="  mbb-10  ">
            <div className=" lg:text-left text-center  text-2xl sm:text-[34px] font-dm-sans font-bold text-black mb-2 max-sm:mb-6">
              Make your own Event
            </div>
            <div className="  text-[#272727] text-center lg:text-left text-sm sm:text-lg font-normal font-dm-sans sm:pr-10 ">
              Bring your event to life with our easy-to-use platform. Create,
              manage, and promote effortlessly while reaching a wider audience.
              We provide all the tools for a successful and memorable event.
              Start today!
            </div>
            <div className="
             max-lg:flex max-lg:justify-center max-sm:mt-16
            ">
                <Link href={"/createorganization"}>
                <button className=" transition ease-in-out duration-300 delay-50 bg-home-blue text-white font-dm-sans text-center sm:text-lg text-base font-bold sm:px-20 px-10 py-3 rounded-full mt-5 hover:text-home-blue hover:bg-white  ">
              Create Event
            </button>
                </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
