"use client";
import React from "react";

interface AdminResponsiveSideBarBtn {
  onClick?: () => void;
  text: string;
  icon: JSX.Element;
  isActive?: boolean;
}

export default function AdminResponsiveSideBarBtn({
  onClick,
  text,
  icon,
  isActive,
}: AdminResponsiveSideBarBtn) {
  return (
    <div
      className={`${
        isActive && " text-custom-orange rounded-lg"
      } flex flex-row w-52 mb-12 sm:ms-12 md:ms-20 lg:ms-12 cursor-pointer hover:text-custom-orange `}
      onClick={onClick}
    >
      <div className="mt-1">{icon}</div>

      <div
        className={` font-sans hover:text-custom-orange text-center text-lg  mx-2  leading-normal ${
          isActive && "text-custom-orange"
        }`}
      >
        {text}
      </div>
    </div>
  );
}
