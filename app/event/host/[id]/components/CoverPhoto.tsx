import React from "react";
import Image from "next/image";

interface CoverPhoto {
  image: String;
}

export default function CoverPhoto({ image }: CoverPhoto) {
  return (
    <div className="overflow-hidden object-cover xl:w-[71rem]  md:w-[57rem]  h-[32rem] md:h-[36rem] xl:h-screen ">
      <Image
        src={`${image}`}
        alt="hay"
        width={1000}
        height={100}
        className="w-full h-screen object-cover"
      />
    </div>
  );
}
