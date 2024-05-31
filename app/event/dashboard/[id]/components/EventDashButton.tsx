"use client";
import Image from "next/image";
import React from "react";

interface Dashboard_Btn {
  onClick?: () => void;
  text: string;
  isSlideBar?: boolean;
  children: React.ReactNode;
  isActive?: boolean;
}

export default function EventDashButton({
  onClick,
  isSlideBar,
  text,
  children,
  isActive,
}: Dashboard_Btn) {
  return (
    <button
      onClick={onClick}
      className={`hover:text-custom-orange ${
        isActive && " text-custom-orange rounded-lg"
      } h-10 w-full  hover:rounded-lg  hover:opacity-80  `}
    >
      <div className="hover:text-custom-oange flex lg:gap-3 xl:gap-5 gap-5 ml-5	">
        {children}
        {isSlideBar ? (
          <div
            className={` font-sans  text-center text-base font-semibold  leading-normal ${
              isActive && "text-custom-orange"
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
