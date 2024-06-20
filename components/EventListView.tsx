import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoIosSend } from "react-icons/io";
import { BiAlarm, BiCalendar, BiLocationPlus } from "react-icons/bi";
import { HiOutlineArrowSmRight } from "react-icons/hi";

type EventListViewProps = {
  id: string;
  name: string;
  location: string;
  time: string;
  date: string;
  img: string;
};

export default function EventListView({
  id,
  name,
  location,
  time,
  date,
  img,
}: EventListViewProps) {
  return (
    <div className=" flex gap-3 rounded-lg 2xl:w-2/5 xl:w-2/5 lg:w-2/5  bg-[#f0f0f0]">
      <div className="rounded-lg">
        <Image
          src={img}
          alt="event"
          height={180}
          width={230}
          className="rounded-l-lg"
        />
      </div>
      <div className="p-3 w-full  flex flex-col justify-start gap-3">
        <div className="flex justify-between sm:flex-row flex-col sm:gap-10 gap-2  mb-4">
          <div className="capitalize font-bold text-2xl	">{name}</div>
          <button className=" hover:bg-[#526595] button col-span-1 w-63  mr-4 rounded-full   text-center text-sm text-white  bg-custom-blue">
            <div className="flex  justify-center  gap-1  ">
              
              <Link  href={`/event/host/${id}`}>Info</Link>
              <HiOutlineArrowSmRight size={20} />
            </div>
          </button>
        </div>
        <div className="flex sm:flex-row flex-col   w-full  gap-3">
          <div className="flex items-center  gap-2 sm:w-1/2	w-full ">
            <BiLocationPlus size={25} className="text-slate-700" />
            {location}
          </div>
          <div className="flex items-center  gap-2 sm:w-1/2	w-full ">
            <BiAlarm size={25} className="text-slate-700" />
            {time}
          </div>
        </div>
        <div className="flex items-center  gap-2 sm:w-1/2	w-full mt-2	 ">
          <BiCalendar size={25} className="text-slate-700" />
          {date}
        </div>
      </div>
    </div>
  );
}
