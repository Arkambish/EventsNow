import React, { useState, useEffect } from "react";
import Container from "./Container";
import { EventContextType, UseEventContext } from "../EventDashContext";
import { MdArrowBack } from "react-icons/md";
import { useParams } from "next/navigation";
import { UserType } from "@/app/Type";

import { error } from "@/util/Toastify";
import TeamMemberCard from "./TeamMemberCard";

export default function RegisteredUsersList() {
  const { setStatus, allRegisteredUsers } =
    UseEventContext() as EventContextType;
  const [allRegUserDetails, setAllRegUserDetails] = useState<UserType[]>([]);
  useEffect(() => {
    console.log("fuck");
    
    for (let i = 0; i < allRegisteredUsers.length; i++) {
      console.log(i);
      const getUserDetails = async (user: UserType) => {
        try {
          const response = await fetch(`/api/v1/user/getOneUserById/${user}`);
          const data = await response.json();
          
          await setAllRegUserDetails((prev) => [...prev, data]);
        } catch (e) {
          error("Error in fetching user details");
        }
      };
      getUserDetails(allRegisteredUsers[i]);
      
    }
  }, [allRegisteredUsers]);
  return (
    <Container>
      <div className="pl-10 mb-5 grid gap-2 mt-8 mr-10 pb-20">
        <button className="button mt-5" onClick={() => setStatus("campaign")}>
          <div className="text-white rounded-full bg-custom-orange p-1 w-8 flex justify-center">
            <MdArrowBack size={20} />
          </div>
        </button>
        <div className=" font-mono text-custom-orange font-medium text-3xl pb-4 ">
          REGISTERED USERS
        </div>
        <div className=" text-sm pb-4">
          You can see all user that registered for this event here
        </div>
        <div className="">
          <div className="grid gap-3">
            {allRegUserDetails.map((user: UserType) => (
              <TeamMemberCard
                key={user._id}
                name={user.firstName + " " + user.lastName}
                email={user.email}
                />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
