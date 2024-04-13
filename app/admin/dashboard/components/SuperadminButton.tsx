"use client";
import React from "react";

interface Dashboard_Btn {
  onClick?: () => void;
  text: string;
  icon: JSX.Element;
}

export default function Dashboard_Btn({ onClick, text, icon }: Dashboard_Btn) {
  return (
    <div
      className="flex flex-row w-52 mb-12 sm:ms-12 md:ms-20 lg:ms-12 cursor-pointer text-custom-orange "
      onClick={onClick}
    >
      <div className="mt-1">{icon}</div>

      <div className="sm:flex font-mono lg:text-base md:text-sm text-sm font-semibold text-custom-orange leading-normal ml-2 hover:text-myBrown">
        {text}
      </div>
    </div>
  );
}
