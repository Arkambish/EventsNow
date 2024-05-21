import React from "react";
import Image from "next/image";
import Link from "next/link";
import HomeButton from "./HomeButton";

export default function HomeNavBar() {
  return (
    <div className=" p-10">
      <div className=""><Image
        src="/images/reusableComponents/nav-logo.svg"
        alt="EventNow Logo"
        width={85}
        height={85}
      /></div>

      <div className="">
        <Link href="/">
            Home
        </Link>
        <Link href="/about">
            Events
        </Link>
        <HomeButton
        filled={false}
        text="LOGIN"
        image="/images/reusableComponents/Sign_in.svg"

        />
        <HomeButton
        filled={false}
        text="SIGN UP"
        image="/images/reusableComponents/Sign_in_squre_fill.svg"

        />

      </div>
    </div>
  );
}
