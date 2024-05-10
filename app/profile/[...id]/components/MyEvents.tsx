import React, { useState } from "react";

import EventHost from "@/components/EventHost";
export default function MyEvents() {
  const [manageEventsContent, setManageEventsContent] =
    useState("MANAGE EVENTS");
  const [manage, setManage] = useState(true);

  const handleManageEventsContent = () => {
    if (manage) {
      //setManageEventsContent("MANAGE EVENTS");
      setManage(!manage);
    } else {
      //setManageEventsContent("REGISTERED EVENTS");
    }
  };
  return (
    <div className=" md:flex-row rounded-lg   bg-slate-100 pt-8 justify-start items-start   ">
      <div className="grid ml-0  ">
        <div className=" text-3xl font-semibold text-stone-600 font-IBM ml-[55px]">
          My Events
        </div>
        <div className=" ">
          <EventHost btn1={"Manage Events "} btn2={"Registered events"} />
        </div>
      </div>
    </div>
  );
}
