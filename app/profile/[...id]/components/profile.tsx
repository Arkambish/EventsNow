"use client";
import React from "react";

import ProfCard from "./ProfCard";
import { useProf } from "../ProfContext";
import { UserDetails } from "@/app/Type";
type Details = {
  userDeatails: UserDetails;
  fname: string;
  lname: string;
  userImage: string;
};
export default function Profile() {
  const { userDeatails, fname, lname, userImage } = useProf() as Details;

  return (
    <div className=" p-4 xl:col-span-3 col-span-1 sm:col-span-2 flex   items-start justify-center  rounded-xl h-full bg-slate-100 ">
      <ProfCard
        profilePic={userImage}
        name={`${fname} ${lname}`}
        email={userDeatails.email}
      />
    </div>
  );
}
