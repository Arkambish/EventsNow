import React, { useEffect, useState } from "react";
import Container from "./Container";
import Image from "next/image";
import CreatePost from "./post/CreatePost";
import { getSession } from "next-auth/react";
import { EventContextType, UseEventContext } from "../EventDashContext";
import { MdArrowBack } from "react-icons/md";
import GeneralUpdate from "./GeneralUpdate";

export default function SendEmail() {
  const [generalUpdate, setGenaralUpdate] = useState(false);
  const { setStatus } = UseEventContext() as EventContextType;

  return (
    <Container>
      <button className="button mt-5" onClick={() => setStatus("campaign")}>
        <div className="text-white rounded-full bg-custom-orange p-1 w-8 flex justify-center">
          <MdArrowBack size={20} />
        </div>
      </button>
      <div className="lg:pl-10 mb-5 grid gap-2  md:mr-10 pb-8">
        <div className="  gap-3 flex text-custom-orange font-medium text-3xl ">
          Email Campaign
        </div>
        <div className=" text-[#455273]  mr-8">
          You can send the emails to registerd users.
        </div>
      </div>
      <div className="h-[20rem] overflow-auto">
        <div className="xl:pr-64 2xl:pr-32 grid place-content-center text-center ">
          <div className="text-lg py-2 font-semibold">General update.</div>
          <div className=" text-sm pb-4">
            You can use this page for send email for registers to the event
          </div>
          <button
            onClick={() => setGenaralUpdate(true)}
            className="bg-dashBtnBlue rounded-md py-1 m-auto text-white  text-base font-normal pr-7 drop-shadow-md flex "
          >
            <Image
              className="my-auto mx-2"
              src="/images/eventDash/Subtract.svg"
              alt="print"
              width={20}
              height={20}
            />
            general update
          </button>
        </div>
        <div className="xl:pr-64 mt-6 2xl:pr-32 grid place-content-center text-center ">
          <div className="text-lg py-2 font-semibold">
            Event changes and updates.
          </div>
          <div className=" text-sm pb-4">
            You can use this page for send email for registers to inform about
            event changing and updates
          </div>
          <button
            onClick={() => setGenaralUpdate(true)}
            className="bg-dashBtnBlue rounded-md py-1 m-auto text-white  text-base font-normal pr-7 drop-shadow-md flex "
          >
            <Image
              className="my-auto mx-2"
              src="/images/eventDash/Subtract.svg"
              alt="print"
              width={20}
              height={20}
            />
            Event changes
          </button>
        </div>
        {generalUpdate && (
          <GeneralUpdate
            generalUpdate={generalUpdate}
            setGenaralUpdate={setGenaralUpdate}
          />
        )}
      </div>
    </Container>
  );
}
