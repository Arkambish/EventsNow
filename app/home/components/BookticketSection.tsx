import Image from "next/image";
import React from "react";
import HomeButton from "./HomeButton";
import Link from "next/link";

export default function BookticketSection() {
  return (
    <div
      className="h-screen  overflow-hidden grid lg:grid-cols-2	bg-[url('/images/home/Rectangle12.png')] bg-no-repeat bg-cover  bg-center
    "
    >
      <div className="  hidden items-end  justify-center lg:flex ">
        <Image
          src="https://res.cloudinary.com/dpk9utvby/image/upload/v1716571573/uyhe5akzqz0bh1syhs5w.png"
          alt="Picture of the author"
          style={{ height: "80vh", width: "auto" }}
          width={2000}
          height={2000}
          quality={100}
        />
        {/* <div className="bg-[url('/images/home/image-area.png')] bg-no-repeat h-full  bg-center bg-black">

            </div> */}
      </div>
      <div className=" p-10  flex ">
        <div className="  content-center md:px-28 lg:px-12 xl:px-32 grid gap-3">
          <div className=" font-monoton text-start font-normal text-white text-[30px] sm:text-[40px] ">
            Book Your Next Adventure Today!
          </div>
          <div className="text-start font-dm-sans sm:text-lg font-normal text-white">
            Discover and Book Amazing Events Near You. Experience Unforgettable
            Moments with Just a Click.
          </div>
          <div className="flex gap-3">
            <Link href="/">
              <HomeButton filled={true} text={"Book Tickets"} />
            </Link>
            <Link href="/about">
              <HomeButton filled={false} text={"Learn More"} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
