"use client";

import { ChildrenType } from "@/app/Type";
import React from "react";

export default function Dashboard({ children }: ChildrenType) {
  return (
    <div className="min-h-96 flex flex-col  items-center shadow-3xl bg-[#FCFCFD] rounded-lg py- text-center  ">
      <div className="w-full grid-rows-8 mt-5 gap-3 flex flex-col items-center">
        {children}
      </div>
    </div>
  );
}
