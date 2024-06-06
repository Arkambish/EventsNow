import Image from "next/image";
import React from "react";

interface ProfileCard {
  profilePic: string;
  name: string;
  email: string;
}

function ProfCard({ profilePic, name, email }: ProfileCard) {
  console.log(profilePic);
  return (
    <div className=" flex flex-col text-gray-700   items-center  bg-clip-border  w-fit my-5  ">
      {/* <div className=" mx-4 mt-4  text-gray-700 shadow-lg bg-clip-border  h-fit"> */}
      <Image
        src={profilePic}
        width={200}
        height={200}
        alt="profile picture"
        className=" rounded-full"
      />
      {/* </div> */}
      <div className="pt-6 text-center  ">
        <h4 className="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-gray-900">
          {name}
        </h4>

        <p className="block mb-2 font-sans text-md antialiased  leading-snug tracking-normal text-black">
          {email}
        </p>
      </div>
    </div>
  );
}

export default ProfCard;
