"use client";
import Image from "next/image";
import React from "react";

interface Dashboard_Btn {
  onClick: () => void;
  text: string;
  isSlideBar: boolean;
  children: React.ReactNode;
  isActive?: boolean;
}

export default function Dashboard_Btn({
  onClick,
  isSlideBar,
  text,
  children,
  isActive,
}: Dashboard_Btn) {
  return (
    <button
      onClick={onClick}
      className={`${
        isActive && "bg-custom-orange  text-slate-700 rounded-lg"
      } h-10 my-5 w-full hover:bg-custom-orange hover:rounded-lg  hover:opacity-80 hover:text-slate-700 `}
    >
      <div className=" flex lg:gap-3 xl:gap-5 gap-5 ml-9	">
        {children}
        {isSlideBar ? (
          <div
            className={` font-sans hover:text-slate-700  text-center text-base font-semibold text-black  leading-normal ${
              isActive && "text-slate-700"
            }`}
          >
            {text}
          </div>
        ) : (
          ""
        )}
      </div>
    </button>
  );
}
