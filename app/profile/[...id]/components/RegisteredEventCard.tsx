import { error, success } from "@/util/Toastify";
import { set } from "mongoose";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";
type RegisteredEventCardProps = {
  eventName: string;
  regUserId: string;
  eventUpdates: boolean;
  marketingUpdates: boolean;
  eventImage: string;
  eventId: string;
};

export default function RegisteredEventCard({
  eventName,
  regUserId,
  eventUpdates,
  marketingUpdates,
  eventImage,
  eventId,
}: RegisteredEventCardProps) {
  const [getEventUpdates, setGetEventUpdates] = useState(eventUpdates);
  const [getMarketingUpdates, setGetMarketingUpdates] =
    useState(marketingUpdates);
  const [updating, setUpdating] = useState(false);

  const registrationUpdateHandler = async () => {
    setUpdating(true);
    const res = await fetch(`/api/v1/user/updateRegistrationForEvent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        regUserId,
        eventUpdates: getEventUpdates,
        marketingUpdates: getMarketingUpdates,
      }),
    });
    setUpdating(false);
    if (!res.ok) {
      error("Failed to update registration");
      return;
    }
    success("Registration updated successfully");
  };

  return (
    <div className="rounded-lg border-2 grid gap-2 pb-2">
      <div className="  rounded-t-lg overflow-hidden">
        <Image
          alt={"event image"}
          src={eventImage}
          className="h-full w-full object-cover bg-center"
          width={300}
          height={300}
        />
      </div>

      <div className=" pl-2 pr-4 flex justify-between gap-4">
        <div className=" font-mono text-lg text-center font-semibold ">
          {eventName}
        </div>

        <Link href={`/event/host/${eventId}`}>
          <button className=" flex gap-1 items-center  hover:opacity-80 bg-custom-orange button rounded-lg  text-sm  px-2 text-white">
            <FiExternalLink />
            EVENT PAGE
          </button>
        </Link>
      </div>
      <div className="ml-2">
        <div className=" font-mono text-base text-center flex gap-2 ">
          <input
            type="checkbox"
            checked={getEventUpdates}
            className="my-auto"
            onChange={(e) => setGetEventUpdates(e.target.checked)}
          />
          get community page Updates
        </div>
        <div className=" font-mono text-base text-center flex gap-2 ">
          <input
            type="checkbox"
            checked={getMarketingUpdates}
            className="my-auto"
            onChange={(e) => setGetMarketingUpdates(e.target.checked)}
          />
          get marketing Updates
        </div>
      </div>
      {updating ? (
        <button className="border-2 button flex text-center mx-2  py-0 px-2  justify-center bg-custom-orange text-white font-semibold rounded-lg  text-base font-mono ">
          <div className="flex gap-2 justify-center items-center">
            <div> updating</div>
            <Image
              src="/images/createEvent/LoadingBtnIcon.svg"
              alt="loading btn"
              width={20}
              height={20}
            />
          </div>
        </button>
      ) : (
        <button
          onClick={registrationUpdateHandler}
          className="
      border-2 
       button rounded-lg mx-2  py-0 px-2 text-custom-orange text-base font-semibold hover:bg-custom-orange hover:text-white ease-in-500"
        >
          update Registration
        </button>
      )}
    </div>
  );
}
