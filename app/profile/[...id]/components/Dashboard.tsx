"use client";

import { ChildrenType } from "@/app/Type";
import React from "react";

export default function Dashboard({ children }: ChildrenType) {
  return (
    <div className=" flex flex-col  items-center rounded-lg bg-slate-100  text-center w-full h-full ">
      <div className="w-full grid-rows-8 mt-5 gap-3 flex flex-col items-center ">
        {children}
      </div>
    </div>
  );
}
