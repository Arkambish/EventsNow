import React from "react";
import Image from "next/image";

interface CoverPhoto {
  image: String;
}

export default function CoverPhoto({ image }: CoverPhoto) {
  return (
    <div className="overflow-hidden xl:w-[71rem]  md:w-[57rem] sm:w-full ">
      <Image src={`${image}`} alt="hay" width={1000} height={100} />
    </div>
  );
}
