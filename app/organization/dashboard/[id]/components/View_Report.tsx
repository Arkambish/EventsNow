"use client";
import Image from "next/image";
function print() {}
import React from "react";

interface View_Report {
  discription1: String;
  img: String;
  isSlideBar: boolean;
  eventName: String;
}

export default function View_Report({
  discription1,
  isSlideBar,
  img,
  eventName,
}: View_Report) {
  return (
    <div
      className={`md:grid ${
        isSlideBar ? " md:w-11/12" : " md:w-11/12"
      } flex items-center justify-between  2xl:w-3/4 gap-3 w-11/12  md:grid-cols-12 md:h-32 rounded-[10px] bg-white border-2 `}
    >
      <div className="md:col-span-4 my-3 md:ml-5 lg:ml-14 overflow-hidden">
        <Image
          src={`/images/organization/${img}`}
          alt="compo5"
          width={80}
          height={80}
        />
      </div>

      <div className="md:col-span-5 text-start">
        <div className="text-[#666] font-sans md:text-xl text-lg font-normal">
          {eventName}
        </div>
        <div className="text-[#353535] font-sans text-sm	lg:text-base   font-bold ">
          {discription1}
        </div>
      </div>

      <div className="md:col-span-3 lg:my-10 md:my-5  ">
        <button
          onClick={() => print()}
          className="lg:w-[116px] lg:p-1 md:p-1 md:mr-2 rounded-md bg-dashBtnBlue"
        >
          <div className="flex gap-2 justify-center items-center">
            <div className="lg:block  ">
              <Image
                src="/images/organization/Print.svg"
                alt="print"
                width={24}
                height={24}
              />
            </div>

            <div className=" md:p-0 p-1 judtify-center text-white font-sans text-base font-medium mr-3 ">
              Print
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
