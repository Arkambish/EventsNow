import React, { useState, useEffect } from "react";
import Container from "./Container";
import { EventContextType, UseEventContext } from "../EventDashContext";
import { MdArrowBack } from "react-icons/md";


import { error } from "@/util/Toastify";
import TeamMemberCard from "./TeamMemberCard";
import EmptyStateComponent from "@/components/EmptyStateComponent";
import Spinner from "@/components/Spinner";

export default function RegisteredUsersList() {
  const { setStatus,event } =
    UseEventContext() as EventContextType;
  const [allRegisteredUsers, setAllRegisteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const fetchAllRegisteredUsers = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/event/getRegisteredUsersForEvent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: event._id }),
        }
      );
      if (!res.ok) {
        error("Error in fetching data");
        return;
      }
      const data = await res.json();
      
      setAllRegisteredUsers(data);
      setLoading(false);
    }
    fetchAllRegisteredUsers();
   
    
    
  }, [event._id]);
  return (
    <Container>
      <div className="pl-10 mb-5 grid gap-2 mt-8 mr-10 pb-20">
        <button className="button mt-5" onClick={() => setStatus("campaign")}>
          <div className="text-white rounded-full bg-stone-600 p-1 w-8 flex justify-center">
            <MdArrowBack size={20} />
          </div>
        </button>
        <div className=" font-mono text-stone-600 font-medium text-3xl pb-4 ">
          REGISTERED USERS
        </div>
        <div className=" text-sm pb-4">
          You can see all user that registered for this event here
        </div>
        <div className="">
          {!loading ? <div className="grid gap-3">
            {allRegisteredUsers && allRegisteredUsers.length > 0 ? allRegisteredUsers.map((user:any) => (
              <TeamMemberCard
                key={user._id}
                name={user.userId.firstName + " " + user.userId.lastName}
                email={user.userId.email}
                />
            )) : <EmptyStateComponent message="No registered users" />} </div>: <Spinner/>}
            
          
        </div>
      </div>
    </Container>
  );
}
