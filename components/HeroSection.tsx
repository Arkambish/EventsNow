"use client";
import animateHero from "./AnimateHero";
import React, { useEffect, useState } from "react";
// import { Carousel, Flowbite, theme, CustomFlowbiteTheme } from "flowbite-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/Carousel";
import Autoplay from "embla-carousel-autoplay";

import Image from "next/image";
// import { useSearchParams } from "next/navigation";
// import { useRouter } from "next/router";
// const customTheme: CustomFlowbiteTheme = {
//   carousel: {
//     scrollContainer: {
//       base: "flex h-full snap-mandatory overflow-hidden scroll-smooth ",
//     },
//     indicators: {
//       active: {
//         off: "bg-white hover:bg-white/50  ",
//         on: " bg-gray-800  ",
//       },
//       base: "h-3 w-3 rounded-full",
//       wrapper: "absolute bottom-5 left-1/2 flex -translate-x-1/2 space-x-3",
//     },
//   },
// };

export default function HeroSection() {
  const [search, setSearch] = useState("");
  // const router = useRouter();

  // useEffect(() => {
  //   if (search) {
  //     const url = `/home/?search=${encodeURIComponent(search)}`;
  //     router.push(url, undefined, { shallow: true });
  //   } else {
  //     router.push("/home", undefined, { shallow: true });
  //   }
  // }, [search, router]);

  const handleChange = (value: string) => {
    setSearch(value);
    // const url = `/home/?search=${encodeURIComponent(search)}`;
    // router.push(url, undefined, { shallow: true });
  };

  useEffect(() => {
    animateHero();
  }, []);

  const info = () => {
    console.log("clicked info");
  };
  return (
    <div>
      <div className="grid lg:grid-cols-2 ">
        <div className=" bg-[#D7CFC7] h-[500px] md:h-[565px] xl:h-[836px] ">
          <div
            id="quote"
            className=" text-[#906953] pb-4 text-center font-khand text-4xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-6xl md:pt-36 md:pb-10  lg:pt-36 lg:pb-8 sm:pt-32 pt-32 xl:pt-44 xl:px-12 font-semibold  md:px-6"
          >
            “Where Moments Become Memories”
          </div>
          <div className="xl:hidden md:hidden lg:grid text-[#4A4A4A] text-center font-khand text-sm sm:pt-8 sm:pb-8 font-medium px-8 pb-4 ">
            "Welcome to EVENTNOW! Discover and attend unforgettable events that
            create cherished memories. From concerts to conferences and cultural
            celebrations, we provide access to extraordinary experiences. Join
            us in embracing the joy of the moment!"
          </div>

          <div className="hidden md:grid lg:hidden xl:grid  text-[#4A4A4A] text-center font-khand text-sm  font-medium px-4  pb-10 lg:pb-4 md:px-12 lg:px-4 sm:mx-8">
            Welcome to EVENTNOW, where we believe that every event is an
            opportunity to create cherished memories. We're your dedicated
            platform for discovering and attending a wide range of exciting
            events that will leave you with lasting impressions. Whether it's a
            concert that fills your heart with music, a conference that ignites
            your passion, or a cultural celebration that brings communities
            together, our mission is to provide you with access to unforgettable
            experiences. Join us in embracing the joy of the moment and let us
            be your guide to the world of extraordinary events.
          </div>

          <div className="justify-center items-center pb-10 mx-10 flex md:py-4 xl:py-8">
            <button
              onClick={() => info()}
              className=" md:w-48 w-12 md:h-11 h-8 rounded-l-full  bg-[#D47151]  flex  "
            >
              <Image
                className="self-center  ml-4"
                src={"/images/heroSection/search.png"}
                width={15}
                height={15}
                alt="search"
              />

              <div className=" hidden md:grid font-mono  text-white text-lg text-center mx-auto my-auto">
                search events
              </div>
            </button>

            <label className="relative block">
              <input
                className="rounded-r-full outlined-none placeholder:text-slate-400 block bg-white w-full md:h-11 border py-1 sm:py-1.5 pl-9 pr-3 shadow-sm focus:outline-none focus:border-custom-orange sm:text-sm"
                placeholder="Title, Venue, Organizer..."
                type="text"
                name="search"
                value={search}
                onChange={(e) => handleChange(e.target.value)}
              />
            </label>
          </div>
        </div>

        <div className="-z-10 h-[500px] md:h-[565px] xl:h-[836px] overflow-hidden  rounded-none hidden lg:grid">
          {/* <Flowbite theme={{ theme: customTheme }}>
            <Carousel>
              <Image
                src="/images/heroSection/Frame1.png"
                alt="..."
                width={1000}
                height={2000}
                className="xl:max-2xl:w-full xl:max-2xl:h-full"
              />
              <Image
                src="/images/heroSection/Frame2.png"
                alt="..."
                width={2000}
                height={2000}
                className="xl:max-2xl:w-full xl:max-2xl:h-full "
              />
              <Image
                src="/images/heroSection/Frame3.png"
                alt="..."
                width={1000}
                height={2000}
                className="xl:max-2xl:w-full xl:max-2xl:h-full"
              />
              <Image
                src="/images/heroSection/Frame4.png"
                alt="..."
                width={1000}
                height={1000}
                className="xl:max-2xl:w-full xl:max-2xl:h-full"
              />
            </Carousel>
          </Flowbite> */}

          <Carousel
            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}
          >
            <CarouselContent>
              <CarouselItem>
                <Image
                  src="/images/heroSection/Frame1.png"
                  alt="..."
                  width={1000}
                  height={2000}
                  className="xl:max-2xl:w-full xl:max-2xl:h-full"
                />
              </CarouselItem>
              <CarouselItem>
                <Image
                  src="/images/heroSection/Frame2.png"
                  alt="..."
                  width={2000}
                  height={2000}
                  className="xl:max-2xl:w-full xl:max-2xl:h-full "
                />
              </CarouselItem>
              <CarouselItem>
                <Image
                  src="/images/heroSection/Frame3.png"
                  alt="..."
                  width={1000}
                  height={2000}
                  className="xl:max-2xl:w-full xl:max-2xl:h-full"
                />
              </CarouselItem>
              <CarouselItem>
                <Image
                  src="/images/heroSection/Frame4.png"
                  alt="..."
                  width={1000}
                  height={1000}
                  className="xl:max-2xl:w-full xl:max-2xl:h-full"
                />
              </CarouselItem>
            </CarouselContent>
            {/* <CarouselPrevious />
            <CarouselNext /> */}
          </Carousel>
        </div>
      </div>
    </div>
  );
}
