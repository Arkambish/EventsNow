import React from "react";
import { useOrg } from "../OrgContext";
import EmptyStateComponent from "@/components/EmptyStateComponent";
import EventCardOrgDash from "./EventCardOrgDash";
import { OrgContext } from "@/app/Type";
import Link from "next/link";
import Image from "next/image";

export default function MyEvents() {
  const { events, isSlideBar, userPermission, id } = useOrg() as OrgContext;
  const isPermissionAvailable =
    userPermission?.globalPermission?.includes("allPermission") ||
    userPermission?.globalPermission?.includes("Manage Event");

  return (
    <div className="flex rounded-lg  md:ml-2 pl-2  bg-slate-100 pt-8 md:pl-12 flex-col justify-start items-start gap-12">
      <div className="flex justify-between w-full pr-5">
        <div className="flex flex-col gap-3 justify-start items-start ">
          <div className="text-3xl font-semibold text-stone-600 font-IBM">
            MY EVENTS
          </div>
          <div className="text-base text-[#848484] font-normal">
            You can view all your created events here
          </div>
        </div>

        {isPermissionAvailable && (
          <Link href={`/createevent/${id}`}>
            <button
              className={`bg-dashBtnBlue button  lg:m-0 m-2  h-8 rounded-lg `}
            >
              <div className="flex  flex-row ml-2 mr-2  gap-2 p-0 items-center justify-center">
                <Image
                  src={`/images/reusableComponents/createevent.svg`}
                  alt="Picture of the button"
                  width={20}
                  height={20}
                />
                <div className=" text-white text-xs lg:text-sm font-medium  ">
                  HOST EVENT
                </div>
              </div>
            </button>
          </Link>
        )}
      </div>

      <div className="  overflow-y-auto w-full grid h-96 gap-5 md:pr-16 sm:max-md:grid-cols-2 ">
        <div>
          {events.length === 0 ? (
            <EmptyStateComponent message="No event in the organization" />
          ) : (
            events.map((event) => (
              <EventCardOrgDash
                id={event._id}
                key={event._id}
                isSlideBar={isSlideBar}
                img={event.coverImage}
                location={event.selectedTab}
                time={event.startTime}
                name={event.eventName}
                date={event.eventStartDate}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
