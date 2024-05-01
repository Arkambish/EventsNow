import React from "react";
import Image from "next/image";
import Link from "next/link";
import { TbTimelineEventFilled } from "react-icons/tb";

interface MyEventCardProps {
  image: string;
  OrgName: string;
  btn: string;
  id: string;
}

function MyEventCard({ image, OrgName, btn, id }: MyEventCardProps) {
  return (
    <div className="max-w-lg  w-fit lg:max-w-full  lg:flex rounded-lg border border-gray-200 overflow-hidden">
      <div className="relative h-52 lg:h-auto lg:w-52">
        <Image
          alt={"event image"}
          src={image}
          className="object-cover w-full h-full"
          layout="fill"
        />
      </div>
      <div className="p-4 flex flex-col justify-between">
        <div className="mb-4">
          <div className="text-gray-900 font-bold text-xl capitalize mb-2">
            {OrgName}
          </div>
          <div className="grid grid-cols-2 gap-4">
            {btn === "Dashboard" ? (
              <Link href={`/event/dashboard/${id}`}>
                <div className="bg-custom-orange rounded-xl  leading-none flex">
                  <div className="py-2 px-1 text-white">
                    <TbTimelineEventFilled />
                  </div>
                  <div className="text-white font-semibold p-2 rounded-xl  leading-none">
                    {btn}
                  </div>
                </div>
              </Link>
            ) : (
              <Link href={`/event/host/${id}`}>
                <div className="text-white font-semibold p-2 rounded-xl bg-custom-orange leading-none">
                  {btn}
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyEventCard;
