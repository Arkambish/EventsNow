"use client";
import Image from "next/image";
import React from "react";

interface Dashboard_Btn {
  onClick: () => void;
  text: string;
  children: React.ReactNode;
  isSlideBar: boolean;
}

export default function EventDashButton({
  onClick,
  isSlideBar,
  text,
  children,
}: Dashboard_Btn) {
  return (
    <button onClick={onClick} className="  hover:opacity-80  my-12 mt-2">
      <div className=" flex lg:gap-3 xl:gap-5 gap-5 hover:text-custom-orange	">
        {children}

        {isSlideBar ? (
          <div className=" font-sans hover:text-custom-orange  text-center text-base font-semibold text-black  leading-normal">
            {text}
          </div>
        ) : (
          ""
        )}
      </div>
    </button>
  );
}
