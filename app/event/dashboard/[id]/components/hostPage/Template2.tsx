"use client";
import React, { useState } from "react";
import { BsPostcardFill } from "react-icons/bs";
import { FaHeart, FaTicketAlt } from "react-icons/fa";
import { FaLocationDot, FaRegistered } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import PostTab from "./PostTab";
import { MdDateRange, MdPublish } from "react-icons/md";
import { RiTimeFill } from "react-icons/ri";
import { useParams } from "next/navigation";
import { error, success } from "@/util/Toastify";
import { AuthContext, useAuth } from "@/app/AuthContext";
import { UseEventContext, EventContextType } from "../../EventDashContext";
type Props = {
  setIsTemplate2: React.Dispatch<React.SetStateAction<boolean>>;
};
function Template2({ setIsTemplate2 }: Props) {
  const { allTickets } = UseEventContext() as EventContextType;
  // const [postBar, setPostBar] = useState(false);
  const { setEventPublish } = useAuth() as AuthContext;

  const params = useParams<{ id: string }>();

  async function publishEvent() {
    const res = await fetch(`/api/v1/event/publishTemplate`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: params.id,
        template: "template2",
        hostPageType: "template",
      }),
    });
    const data = await res.json();

    if (data.message === "Please complete your organization details") {
      error("Please complete your organization bank details");
      return;
    }

    if (data.message === "No event found") {
      error("There was an error publishing the event");
      return;
    }
    setEventPublish(true);
    success("Event published successfully");
    setIsTemplate2(false);
  }
  return (
    <div
      //   style={{
      //     backgroundColor: "#D9D9D9CC",
      //   }}
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.6) 100%), url(/images/ReusableComponents/eventTemp.jpg)",
        backgroundBlendMode: "overlay",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      id="static-modal"
      data-modal-backdrop="static"
      aria-hidden="true"
      className="overflow-y-auto overflow-x-hidden fixed z-40  justify-center items-center w-full inset-0 max-h-full"
    >
      <div className=" flex justify-between items-center p-4 z-50">
        <div className="text-white text-xl">Template 2</div>
        <button
          onClick={() => setIsTemplate2(false)}
          className="bg-slate-300 hover:bg-slate-00 w-8 h-8 rounded-full p-2 flex justify-center items-center"
        >
          <IoClose />
        </button>
      </div>
      <div className="backdrop-blur-md text-white h-screen relative font-sans">
        <div className="absolute inset-0">
          {/* <img
            src="/images/ReusableComponents/eventTemp.jpg"
            alt="Background"
            className="w-full h-full object-cover opacity-60"
          /> */}
        </div>

        <div className="relative  z-10 w-full max-w-screen-xl mx-auto px-4 pt-1 ">
          <div className="absolute  left-0 p-4">
            <div className="flex space-x-2  mb-2">
              <div className="text-white">
                <FaLocationDot size={23} />
              </div>
              <div className=" text-lg text-white text-left leading-tight ">
                Venue
              </div>
            </div>
            <div className="text-2xl font-bold mb-16">Matara</div>
            <div className="flex space-x-2  mb-2">
              <div className="text-white">
                <MdDateRange size={23} />
              </div>
              <div className=" text-lg text-white text-left leading-tight ">
                Start Date
              </div>
            </div>
            <div className="text-2xl font-bold">21th April 2020</div>
          </div>

          <div className="absolute  right-0 p-4 ">
            <div className="flex space-x-2  mb-2">
              <div className="text-white">
                <RiTimeFill size={23} />
              </div>
              <div className=" text-lg text-white  leading-tight ">
                Start Time
              </div>
            </div>
            <div className="text-2xl font-bold mb-16">4.00pm to 6.00pm</div>
            <div className="flex space-x-2  mb-2">
              <div className="text-white">
                <MdDateRange size={23} />
              </div>
              <div className=" text-lg text-white  leading-tight ">
                End Date
              </div>
            </div>

            <div className="text-2xl font-bold">11th May 2020</div>
          </div>

          <div className="flex flex-col items-center justify-center h-full mt-60">
            <h1 className="text-5xl font-bold my-6">Nadagama</h1>
            <p className="mb-6  mx-auto text-lg text-center">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English. Many desktop
              publishing packages and web page editors now use Lorem Ipsum as
              their default model text, and a search for 'lorem ipsum' will
              uncover many web sites still in their infancy. Various versions
              have evolved over the years, sometimes by accident, sometimes on
              purpose (injected humour and the like).
            </p>
            <div className="flex flex-col sm:flex-row sm:justify-center mb-6">
              <a
                href="#"
                className="bg-orange-600 hover:bg-orange-700 text-white py-2 px-6 rounded-full mb-2 sm:mb-0 sm:mr-2"
              >
                <div className="flex space-x-2">
                  <div className="text-white">
                    <FaRegistered size={23} />
                  </div>
                  <div className="font-medium text-md text-white text-left leading-tight ">
                    Register
                  </div>
                </div>
              </a>

              <a
                href="#"
                className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-6 rounded-full mr-3"
              >
                <div className="flex space-x-2">
                  <div className="text-white">
                    <FaHeart size={21} />
                  </div>
                  <div className="font-medium text-md text-white text-left leading-tight ">
                    Wish List
                  </div>
                </div>
              </a>
              {allTickets && allTickets.length > 0 && (
                <a
                  href="#"
                  className="bg-orange-600 hover:bg-orange-700 text-white py-2 px-6 rounded-full mb-2 sm:mb-0 sm:mr-2"
                >
                  <div className="flex space-x-2">
                    <div className="text-white">
                      <FaTicketAlt size={23} />
                    </div>
                    <div className="font-medium text-md text-white text-left leading-tight">
                      Buy Tickets
                    </div>
                  </div>
                </a>
              )}
            </div>
            <div
              // onClick={() => setPostBar(true)}
              className="flex flex-col  sm:flex-row sm:justify-center mb-6"
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

      {/* {postBar && (
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
            <div className="text-white text-xl">Template 2</div>
            <button
              // onClick={() => setIsTemplate2(false)}
              className="bg-slate-300 hover:bg-slate-00 w-8 h-8 rounded-full p-2 flex justify-center items-center"
            >
              <IoClose />
            </button>
          </div>
          <PostTab />
        </div>
      )} */}
      <div className="flex justify-end">
        <button onClick={publishEvent} className="button">
          <div className="bg-orange-600 hover:bg-orange-700 flex gap-3 w-fit rounded-xl p-2 m-2 text-white ">
            <MdPublish size={25} />
            Publish the Event
          </div>
        </button>
      </div>
    </div>
  );
}

export default Template2;
