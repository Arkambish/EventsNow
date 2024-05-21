import React from "react";
import Image from "next/image";
import Link from "next/link";

import HomeDashButton from "./HomeDashButton";

export default function HomeNavBar() {
  return (
    <div className="flex  p-10 justify-between  ">
      <div className=" max-sm:size-10">
        <Image
          src="/images/reusableComponents/nav-logo.svg"
          alt="EventNow Logo"
          width={85}
          height={85}
        />
      </div>

      <div className="flex gap-10">
        <div className=" flex  xl:mx-8 ">
          <Link
            className="transition ease-in-out duration-300 delay-50 self-center text-white  text-center font-dm-sans md:text-xl font-medium hover:text-home-blue"
            href="/"
          >
            Home
          </Link>
        </div>
        <div className="flex xl:mx-8">
          <Link
            className="transition ease-in-out duration-300 delay-50 text-white self-center text-center font-dm-sans md:text-xl font-medium hover:text-home-blue"
            href="/about"
          >
            About
          </Link>
        </div>
        <Link href={"auth/login"} className=" hidden  md:flex ml-8 ">
          <HomeDashButton
            text="LOGIN"
            image="/images/reusableComponents/Sign_in.svg"
            blueImage="/images/home/blueLogin.svg"
          />
        </Link>
        <Link href={"/auth/signup"} className="hidden  md:flex ">
          <HomeDashButton
            text="SIGN UP"
            image="/images/reusableComponents/Sign_in_squre_fill.svg"
            blueImage="/images/home/blueSignUp.svg"
          />
        </Link>
      </div>
    </div>
  );
}
