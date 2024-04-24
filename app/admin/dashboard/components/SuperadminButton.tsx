"use client";
import React from "react";

interface Dashboard_Btn {
  onClick?: () => void;
  text: string;
  icon: JSX.Element;
  isActive?: boolean;
}

export default function Dashboard_Btn({
  onClick,
  text,
  icon,
  isActive,
}: Dashboard_Btn) {
  return (
    <div
      className={`${
        isActive && " text-custom-orange rounded-lg"
      } flex flex-row w-52 mb-12 sm:ms-12 md:ms-20 lg:ms-12 cursor-pointer hover:text-custom-orange `}
      onClick={onClick}
    >
      <div className="mt-1">{icon}</div>

      <div
        className={` font-sans hover:text-custom-orange text-center text-base font-semibold mx-2  leading-normal ${
          isActive && "text-custom-orange"
        }`}
      >
        {text}
      </div>
    </div>
  );
}
