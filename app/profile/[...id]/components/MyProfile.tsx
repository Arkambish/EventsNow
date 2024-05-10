import React from "react";
import ProfileDetails from "./ProfileDetails";
import { useProf } from "../ProfContext";
import { ProfContext, UserDetails } from "@/app/Type";
type Details = {
  userDeatails: UserDetails;
};
export default function MyProfile() {
  const { userDeatails } = useProf() as Details;

  return (
    <div className="flex flex-col md:flex-row rounded-lg p-0 bg-slate-100  pt-8  justify-start items-start h-full w-full">
      <div className="w-full ml-0">
        <div className="text-3xl font-semibold text-stone-600 font-IBM ml-[55px]">
          My Profile
        </div>
        <div className=" col-span-1 p-0 sm:col-span-2 lg:col-span-7 sm:block  mx-auto w-4/5">
          <ProfileDetails
            key="First Name"
            name="First Name"
            data={userDeatails.firstName}
          />
          <ProfileDetails
            key="Last Name"
            name="Last Name"
            data={userDeatails.lastName}
          />
          <ProfileDetails
            key="Email address"
            name="Email address"
            data={userDeatails.email}
          />
        </div>
      </div>
    </div>
  );
}
