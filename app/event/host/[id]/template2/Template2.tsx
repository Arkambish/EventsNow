"use client";
import React, { useState } from "react";
import { BsPostcardFill } from "react-icons/bs";
import { FaHeart, FaTicketAlt } from "react-icons/fa";
import { FaLocationDot, FaRegistered } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { MdDateRange, MdPublish } from "react-icons/md";
import { RiTimeFill } from "react-icons/ri";
import PostTab from "../components/PostTab";
import { EventType } from "@/app/Type";
import Footer from "@/components/Footer";
import Buttons from "./Buttons";
import { formatDate } from "@/util/helper";
function Template2({
  event,
  preview,
}: {
  event: EventType;
  preview?: boolean;
}) {
  const [postBar, setPostBar] = useState(false);
  const date = `${formatDate(event.eventStartDate)} to ${formatDate(
    event.eventEndDate
  )}`;
  return (
    <div
      //   style={{
      //     backgroundColor: "#D9D9D9CC",
      //   }}
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.6) 100%), url(${event.coverImage})`,
        backgroundBlendMode: "overlay",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className=" overflow-y-auto overflow-x-hidden h-full z-0   justify-center items-center w-full   "
    >
      <div
        className="h-full w-full bg-purple-800 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-30 
                    relative  text-white  mt-12 z-10 p-6  font-sans pb-16 mb-12"
      >
        <div className=" text-white   w-full  mx-auto px-10  ">
          <div className="absolute  left-0 p-6 mx-auto xl:mx-28">
            <div className="flex space-x-2  mb-2">
              <div className="">
                <FaLocationDot size={23} />
              </div>
              <div className=" text-lg  text-left leading-tight ">Venue</div>
            </div>
            <div className="text-2xl font-bold mb-16">
              {event.eventLocation}
            </div>
            <div className="flex space-x-2  mb-2">
              <div className="">
                <MdDateRange size={23} />
              </div>
              <div className=" text-lg  text-left leading-tight ">
                Start Date
              </div>
            </div>
            <div className="text-2xl font-bold">
              {event.eventStartDate.substring(0, 10)}
            </div>
          </div>

          <div className="absolute text-white  right-0 p-6 mx-auto xl:mx-28 ">
            <div className="flex space-x-2  mb-2">
              <div className="">
                <RiTimeFill size={23} />
              </div>
              <div className=" text-lg  leading-tight ">Start Time</div>
            </div>
            <div className="text-2xl font-bold mb-16">{`${event.startTime} to ${event.endTime}`}</div>
            <div className="flex space-x-2  mb-2">
              <div className="">
                <MdDateRange size={23} />
              </div>
              <div className=" text-lg  leading-tight ">End Date</div>
            </div>
            <div className="text-2xl font-bold">
              {event.eventEndDate.substring(0, 10)}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center h-full  ">
            <div
              style={{
                backgroundImage: `url(${event.dashboardImage})`,
                backgroundBlendMode: "overlay",
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                padding: "50px",
              }}
              className="max-sm:hidden   mx-4 p-8 mt-4 text-gray-700 hover:shadow-3xl hover:bg-white border-black border-2 bg-clip-border rounded-full h-full"
            ></div>

            <h1 className="text-5xl font-bold max-sm:mt-60 text-center my-6">
              {event.eventName}
            </h1>
            <p className="mb-6  mx-auto max-sm:mx-6   text-lg text-center">
              {event.description}
            </p>
            <div className="flex flex-col sm:flex-row sm:justify-center mb-6 space-x-9">
              <Buttons
                EventName={event.eventName}
                Location={event.selectedTab}
                Time={`${event.startTime} to ${event.endTime}`}
                Date={date}
              />
            </div>
            <div
              onClick={() => setPostBar(true)}
              className="flex flex-col  sm:flex-row sm:justify-center my-6"
            >
              <a
                href="#"
                className="bg-orange-600 hover:bg-orange-700 text-white py-2 px-8 rounded-full mb-2 sm:mb-0 sm:mr-2"
              >
                <div className="flex space-x-2">
                  <div className="text-white">
                    <BsPostcardFill size={23} />
                  </div>
                  <div className="font-medium text-md text-white text-left leading-tight ">
                    See Community Posts
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {postBar && (
        <div
          style={{
            backgroundColor: "#D9D9D9CC",
          }}
          id="static-modal"
          data-modal-backdrop="static"
          aria-hidden="true"
          className="overflow-y-auto overflow-x-hidden fixed z-50 justify-center items-center w-full inset-0 max-h-full"
        >
          <div className=" flex justify-between items-center p-4 z-10">
            <div></div>
            <button
              onClick={() => setPostBar(false)}
              className="bg-slate-300 hover:bg-slate-600 w-8 h-8 rounded-full p-2 flex justify-end items-center"
            >
              <IoClose />
            </button>
          </div>
          <PostTab />
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Template2;
