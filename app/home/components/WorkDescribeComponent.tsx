import Image from "next/image";
import React from "react";

interface WorkDescribeProps {
  fillColor: string;
  image: string;
  headerText: string;
  text: string;
}
export default function WorkDescribeComponent({
  fillColor,
  image,
  headerText,
  text,
}: WorkDescribeProps) {
  return (
    <div className="grid   lg:w-60 gap-4">
      <div
        className={` grid justify-self-center place-content-center size-12 sm:size-16 md:size-24 rounded-3xl border-2 border-[#2F2F2F]  sm:mb-8`}
        style={{ backgroundColor: fillColor }}
      >
        <Image
          src={`/images/home/${image}`}
          alt="temp icon"
          height={55}
          width={55}
        />
      </div>
      <div className="text-center font-semibold text-lg md:text-[22px] text-white font-manrope">
        {headerText}
      </div>
      <div className="text-center text-white font-normal text-sm md:text-base font-roboto">
        {text}
      </div>
    </div>
  );
}
