"use client";
import React from "react";
interface ContainerProps {
  children: React.ReactNode;
}
export default function Container({ children }: ContainerProps) {
  return (
    <div className=" flex flex-col  px-8  bg-slate-100 rounded-lg h-full">
      <div className=" grid-rows-8 gap-3 flex flex-col ">{children}</div>
    </div>
  );
}
