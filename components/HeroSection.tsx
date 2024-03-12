"use client";

import React from "react";
import { Carousel, Flowbite, theme, CustomFlowbiteTheme } from "flowbite-react";

import Image from "next/image";
const customTheme: CustomFlowbiteTheme = {
  carousel: {
    scrollContainer: {
      base: "flex h-full snap-mandatory overflow-hidden scroll-smooth ",
    },
    indicators: {
      active: {
        off: "bg-white hover:bg-white/50  ",
        on: " bg-gray-800  ",
      },
      base: "h-3 w-3 rounded-full",
      wrapper: "absolute bottom-5 left-1/2 flex -translate-x-1/2 space-x-3",
    },
  },
};

export default function HeroSection() {
  const info = () => {
    console.log("clicked info");
  };
  return (
    <div>
      <div className="grid  sm:grid-cols-2  h-screen overflow-hidden ">
        <div>
          <div className="w-full bg-[#D7CFC7] xl:h-screen ">
            <div className="text-[#906953] text-center font-khand text-4xl  md:py-16  xl:px-12 font-semibold py-6 md:px-6">
              “Where Moments Become Memories”
            </div>
            <div className="text-[#4A4A4A] text-center font-khand text-sm  font-medium px-4  pb-6 md:px-12 sm:mx-8">
              Welcome to EVENTNOW, where we believe that every event is an
              opportunity to create cherished memories. We're your dedicated
              platform for discovering and attending a wide range of exciting
              events that will leave you with lasting impressions. Whether it's
              a concert that fills your heart with music, a conference that
              ignites your passion, or a cultural celebration that brings
              communities together, our mission is to provide you with access to
              unforgettable experiences. Join us in embracing the joy of the
              moment and let us be your guide to the world of extraordinary
              events.
            </div>

            <div className="justify-center items-center pb-10  md:pb-16 mx-10 flex md:py-8 xl:py-8">
              <button
                onClick={() => info()}
                className=" md:w-48 w-12 md:h-11 h-8 rounded-l-full  bg-[#D47151]  flex  "
              >
                <Image
                  className="self-center mx-auto"
                  src={"/images/heroSection/search.png"}
                  width={20}
                  height={20}
                  alt="search"
                />

                <div className=" font-mono text-white text-lg mx-1 my-auto">
                  search events
                </div>
              </button>

              <label className="relative block">
                <input
                  className=" placeholder:text-slate-400 block bg-white w-full md:h-11 border border-slate-300 py-1 sm:py-1.5 pl-9 pr-3 shadow-sm focus:outline-none focus:border-custom-orange focus:ring-sky-500 focus:ring-1 sm:text-sm"
                  placeholder="Title, Venue, Organizer..."
                  type="text"
                  name="search"
                />
              </label>
            </div>
          </div>
        </div>
        <div className="h-screen  overflow-hidden xl:block rounded-none hidden">
          <Flowbite theme={{ theme: customTheme }}>
            <Carousel>
              <Image
                src="/images/heroSection/Frame1.png"
                alt="..."
                className="h-full w-full object-cover"
                width={1000}
                height={2000}
              />
              <Image
                src="/images/heroSection/Frame2.png"
                alt="..."
                width={2000}
                height={2000}
                className="h-full w-full object-cover"
              />
              <Image
                src="/images/heroSection/Frame3.png"
                alt="..."
                width={1000}
                height={2000}
                className="h-full w-full object-cover"
              />
              <Image
                src="/images/heroSection/Frame4.png"
                alt="..."
                width={1000}
                height={1000}
                className="h-full w-full object-cover"
              />
            </Carousel>
          </Flowbite>
        </div>
      </div>
    </div>
  );
}
