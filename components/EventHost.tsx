import { useProf } from "@/app/profile/[...id]/ProfContext";
import { ProfContext, EventType } from "@/app/Type";
import MyEventCard from "@/app/profile/[...id]/components/MyEventCard";
import React, { useState } from "react";
import EmptyStateComponent from "./EmptyStateComponent";
import { log } from "console";
import RegisteredEventCard from "@/app/profile/[...id]/components/RegisteredEventCard";
type RigisterEvent = {
  register: any[];
};
function ToggleButtons({ btn1, btn2 }: { btn1: string; btn2: string }) {
  const [btnState, setBtnState] = useState(1);

  const handleToggle = (selectedBtn: number) => {
    setBtnState(selectedBtn);
  };
  const { register, registerEvent } = useProf() as ProfContext;

  return (
    <div className="   font-IBM  ml-5 ">
      <div className="bg-white rounded-2xl m-4 md:w-fit flex items-center  justify-start ">
        <button
          className={`${
            btnState === 1
              ? "bg-dashBtnBlue text-white"
              : "text-dashBtnBlue"
          } rounded-2xl text-center whitespace-nowrap w-full md:w-2/3 p-1 sm:px-4 md:py-1`}
          onClick={() => handleToggle(1)}
        >
          {btn1}
        </button>
        <button
          className={`${
            btnState === 2
            ? "bg-dashBtnBlue text-white"
            : "text-dashBtnBlue"
          } rounded-2xl text-center whitespace-nowrap  w-full md:w-2/3 p-1 sm:px-4 md:py-1`}
          onClick={() => handleToggle(2)}
        >
          {btn2}
        </button>
      </div>
      {/* <div className="flex md:w-64 xl:h-14 md:h-10 rounded-3xl bg-[#F9EBE9] items-center xl:mx-16 md:mx-8 xl:my-12 md:my-8 whitespace-nowrap ">
        <button
          className={` md:text-sm  font-medium ml-2 w-fit h-fit xl:h-12 rounded-3xl whitespace-nowrap  ${
            btnState === 1
              ? "bg-[#D47151] text-white shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
              : "hover:bg-gray-200 text-[#D47151] bg-[#F9EBE9]"
          }`}
          onClick={() => handleToggle(1)}
        >
          {btn1}
        </button>
        <button
          className={` md:text-sm button cursor-pointer font-medium mr-2 w-fit h-fit xl:h-12 rounded-3xl whitespace-nowrap  ${
            btnState === 2
              ? "bg-[#D47151] text-white shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
              : "hover:bg-gray-200 text-[#D47151] bg-[#F9EBE9]"
          }`}
          onClick={() => handleToggle(2)}
        >
          {btn2}
        </button>
      </div> */}

      <div className="  font-IBM rounded-2xl   gap-4  w-full p-6  ">
        <div className="grid grid-rows-1 gap-2 justify-center w-full overflow-y-scroll sm:max-h-80 xl:max-h-96 scroll-smooth ">
          {btnState === 1 && (
            <>
              {registerEvent.length > 0 ? (
                registerEvent.map((event: EventType) => (
                  <MyEventCard
                    id={event._id}
                    key={event._id}
                    OrgName={event.eventName}
                    image={event.dashboardImage}
                    btn="Dashboard"
                  />
                ))
              ) : (
                <EmptyStateComponent message="No manage events found." />
              
              )}
            </>
          )}

          {/* {btnState === 1 &&
          (registerEvent.length > 0 ? (
            <>
            
              registerEvent.map((event)=>{ <MyEventCard
                OrgName={"Stein Studios "}
                image={"./images/reusableComponents/PictureOfPost.jpg"}
                btn="Show Details"
              />}
              )
           
            </>
          ) : (
            <EmptyStateComponent message="No manege events found." />
          ))} */}
          {btnState === 2 && (
            <>
              {register.length > 0 ? (
                register.map((e: any) => (
                  <RegisteredEventCard
                    key={e._id}
                    eventName={e.eventId.eventName}
                    regUserId={e._id}
                    eventUpdates={e.eventUpdates}
                    marketingUpdates={e.marketingUpdates}
                    eventImage={e.eventId.coverImage}
                    eventId={e.eventId._id}
                  />
                ))
              ) : (
               
                  <EmptyStateComponent message="No registered events found." />
               
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ToggleButtons;
