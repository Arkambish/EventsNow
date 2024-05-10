"use client";
import Image from "next/image";
import React from "react";

interface ResponsiveSideBarButton {
  onClick?: () => void;
  text: string;
  isSlideBar?: boolean;
  children: React.ReactNode;
  isActive?: boolean;
}

export default function ResponsiveSideBarButton({
  onClick,
  isSlideBar,
  text,
  children,
  isActive,
}: ResponsiveSideBarButton) {
  return (
    <button
      onClick={onClick}
      className={`${
        isActive && " text-custom-orange rounded-lg"
      } h-10 my-3 w-full  hover:rounded-lg  hover:opacity-80  `}
    >
      <div className="hover:text-custom-orange flex lg:gap-3 xl:gap-5 gap-5 ml-5	">
        <div className="text-gray-700">{children}</div>
        {isSlideBar ? (
          <div
            className={`  hover:text-custom-orange text-center text-lg  text-black  leading-normal ${
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
