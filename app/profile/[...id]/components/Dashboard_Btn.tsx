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
    <div className="grid justify-start px-10">
      {/* <button
      onClick={onClick}
      className={`${
        isActive && " text-custom-orange rounded-lg text-3xl"
      } h-10 my-5 w-full  hover:rounded-lg  hover:opacity-80  `}
    > */}
      <div
        className={`${
          isActive && " text-custom-orange rounded-lg"
        } flex gap-7 mb-12 sm:ms-8 md:ms-8 lg:ms-0 cursor-pointer hover:opacity-70`}
        onClick={onClick}
      >
        <div className="">{icon}</div>

        {isSlideBar ? (
          <div
            className={` font-sans text-center text-base font-semibold   leading-normal ${
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
