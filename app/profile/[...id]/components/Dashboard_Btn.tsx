"use client";
import React from "react";

interface Dashboard_Btn {
  onClick: () => void;
  text: string;
  isSlideBar: boolean;
  isActive?: boolean;
  hover?: boolean;
  icon: JSX.Element;
}

export default function Dashboard_Btn({
  onClick,
  isSlideBar,
  text,
  isActive,
  hover,
  icon,
}: Dashboard_Btn) {
  return (
    <div>
      {/* <button
      onClick={onClick}
      className={`${
        isActive && " text-custom-orange rounded-lg text-3xl"
      } h-10 my-5 w-full  hover:rounded-lg  hover:opacity-80  `}
    > */}
      <div
        className={`${
          isActive && " text-custom-orange rounded-lg"
        } flex flex-row w-52 mb-12 sm:ms-8 md:ms-8 lg:ms-8 cursor-pointer hover:text-custom-orange `}
        onClick={onClick}
      >
        <div className="mr-1">{icon}</div>

        {isSlideBar ? (
          <div
            className={` font-sans hover:text-custom-orange text-center text-base font-semibold   leading-normal ${
              isActive && "text-custom-orange"
            }`}
          >
            {text}
          </div>
        ) : (
          ""
        )}
      </div>
      {/* </button> */}
    </div>
  );
}
