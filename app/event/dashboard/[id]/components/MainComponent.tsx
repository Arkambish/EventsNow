"use client";
import React, { useState, useEffect, useRef } from "react";
import SideBar from "./SideBar";
import MidContent from "./MidContent";
import { UseEventContext, EventContextType } from "../EventDashContext";
import Image from "next/image";
import EventDashButton from "./EventDashButton";
import Event from "../components/Event";
import SelectTemplate from "@/app/event/host/[id]/SelectTemplate";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import Build from "./pageBuilder/Build";
import Spinner from "@/components/Spinner";
import { HiOutlineDocumentText, HiOutlineUsers } from "react-icons/hi";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { TiTicket } from "react-icons/ti";
import { TbFileBarcode } from "react-icons/tb";
import { AiOutlineHome } from "react-icons/ai";
import { RiPagesLine } from "react-icons/ri";

import { AuthContext, useAuth } from "@/app/AuthContext";
import ResponsiveSideBarButton from "@/components/ResponsiveSideBarButton";
import { IoIosClose } from "react-icons/io";

export default function MainComponent() {
  const {
    handleOverview,
    handleHostPage,
    handleMyteam,
    handleReports,
    handleCampaign,
    handleSetting,
    handleTicket,
    isSideBar,
    setIsSideBar,
    eventname,
    eventLocation,
    eventDate,
    eventStartTime,
    eventDashboardImage,
    event,
    endTime,
    eventEndDate,
    isPreview,
    setIsPreview,
    setIsPageBuilder,
    handleQRreader,
    isPageBuilder,
    isLoading,
  } = UseEventContext() as EventContextType;
  const { eventPublish, setEventPublish } = useAuth() as AuthContext;
  const [isDashboardOpen, setIsDashboardOpen] = useState<boolean>(false);

  const menuBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuBarRef.current &&
        !menuBarRef.current.contains(event.target as Node)
      ) {
        // Clicked outside of modal, so close it
        setIsDashboardOpen(false);
      }
    };

    // Add event listener when the modal is open
    if (isDashboardOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      // Remove event listener when the modal is closed
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup function to remove event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDashboardOpen]);

  console.log("isloading", isLoading);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <div>
        {isPreview ? (
          <div className=" ">
            <button
              onClick={() => setIsPreview(false)}
              className=" bg-custom-orange w-full flex justify-center items-center gap-3 text-white text-lg font-bold"
            >
              <IoArrowBackCircleOutline size={22} />
              Back
            </button>
            <SelectTemplate event={event} preview={true} />
          </div>
        ) : isPageBuilder ? (
          <div className=" ">
            <button
              onClick={() => setIsPageBuilder(false)}
              className=" bg-custom-orange w-full flex justify-center items-center gap-3 text-white text-lg font-bold"
            >
              <IoArrowBackCircleOutline size={22} />
              Back
            </button>
            <Build />
          </div>
        ) : (
          <div>
            <div
              className={`fixed 
        -left-14
        top-40`}
            >
              <button onClick={() => setIsDashboardOpen(!isDashboardOpen)}>
                <div className="  mr-5 h-10  md:hidden  flex justify-center items-center rounded-full   ">
                  {/* {isDashboardOpen ? (
              <BiArrowFromRight size={25} />
            ) : (
              <BiArrowFromLeft size={25} />
            )} */}
                  <div className="bg-slate-400 w-[100px] h-[55px] flex items-center   rounded-full">
                    <div className="bg-slate-300 w-[95px] h-[46px] flex justify-end pr-3 rounded-full">
                      <Image
                        src="/images/reusableComponents/responsiveMenuBar.svg"
                        alt="menu bar"
                        width={20}
                        height={20}
                      />
                    </div>
                  </div>
                </div>
              </button>
            </div>

            <>
              <div
                className={
                  isDashboardOpen
                    ? "absolute z-10 shadow-2xl flex flex-col  left-0 top-0 w-[55%] sm:hidden h-full bg-[#ecf0fc]  ease-in duration-50"
                    : "fixed left-[100%] top-0 p-10 ease-in duration-50"
                }
                ref={menuBarRef}
              >
                <button onClick={() => setIsDashboardOpen(false)}>
                  <div className="mx-2 text-black my-2 w-fit p-1 mb-3 ">
                    <IoIosClose size={30} />
                  </div>
                </button>
                <div className=" flex flex-col mx-5">
                  <ResponsiveSideBarButton
                    isSlideBar={isSideBar}
                    text="Overview"
                    onClick={() => {
                      handleOverview();
                      setIsDashboardOpen(false);
                    }}
                  >
                    <AiOutlineHome size={23} />
                  </ResponsiveSideBarButton>

                  <ResponsiveSideBarButton
                    isSlideBar={isSideBar}
                    text="Host Page"
                    onClick={() => {
                      handleHostPage();
                      setIsDashboardOpen(false);
                    }}
                  >
                    <RiPagesLine size={23} />
                  </ResponsiveSideBarButton>
                  <ResponsiveSideBarButton
                    isSlideBar={isSideBar}
                    text="My Team"
                    onClick={() => {
                      handleMyteam();
                      setIsDashboardOpen(false);
                    }}
                  >
                    <HiOutlineUsers size={23} />
                  </ResponsiveSideBarButton>
                  <ResponsiveSideBarButton
                    isSlideBar={isSideBar}
                    text="Reports"
                    onClick={() => {
                      handleReports();
                      setIsDashboardOpen(false);
                    }}
                  >
                    <HiOutlineDocumentText size={23} />
                  </ResponsiveSideBarButton>
                  <ResponsiveSideBarButton
                    isSlideBar={isSideBar}
                    text="Campaign"
                    onClick={() => {
                      handleCampaign();
                      setIsDashboardOpen(false);
                    }}
                  >
                    <MdOutlinePublishedWithChanges size={23} />
                  </ResponsiveSideBarButton>
                  <ResponsiveSideBarButton
                    isSlideBar={isSideBar}
                    text="Settings"
                    onClick={() => {
                      handleSetting();
                      setIsDashboardOpen(false);
                    }}
                  >
                    <IoSettingsOutline size={23} />
                  </ResponsiveSideBarButton>

                  <ResponsiveSideBarButton
                    isSlideBar={isSideBar}
                    text="Tickets"
                    onClick={() => {
                      handleTicket();
                      setIsDashboardOpen(false);
                    }}
                  >
                    <TiTicket size={23} />
                  </ResponsiveSideBarButton>

                  <ResponsiveSideBarButton
                    isSlideBar={isSideBar}
                    text="QR Reader"
                    onClick={() => {
                      handleQRreader();
                      setIsDashboardOpen(false);
                    }}
                  >
                    {" "}
                    <TbFileBarcode size={23} />
                  </ResponsiveSideBarButton>
                </div>
              </div>
              {isLoading ? (
                <Spinner />
              ) : (
                <div className="grid grid-cols-12 gap-5 md:gap-2 lg:gap-2 xl:gap-5 mt-5 px-2 h-full overflow-hidden">
                  <div
                    className={` md:block hidden ${
                      isSideBar
                        ? "md:col-span-3 md:ml-2  col-span-4 lg:col-span-2 "
                        : "md:col-span-1   "
                    }`}
                  >
                    <SideBar />
                  </div>
                  <div
                    className={`lg:col-span-7 col-span-12  ${
                      isSideBar ? "md:col-span-5 " : "md:col-span-7 "
                    }`}
                  >
                    <MidContent />
                  </div>
                  <div
                    className={`   lg:col-span-3 md:block hidden
             ${isSideBar ? "md:col-span-4 md:mr-2 " : "md:col-span-3  "}`}
                  >
                    {eventname && eventLocation && eventStartTime && eventDate && eventEndDate && eventDashboardImage && endTime && eventPublish && (
                      <Event
                      EventName={eventname}
                      Location={eventLocation}
                      Time={eventStartTime}
                      endTime={endTime}
                      endDate={eventEndDate.substring(0, 10)}
                      Date={eventDate.substring(0, 10)}
                      eventCover={eventDashboardImage}
                      setIsPreview={setIsPreview}
                      isPublished={eventPublish}
                    />
                    )}
                    
                  </div>
                </div>
              )}
            </>
          </div>
        )}
      </div>
    </div>
  );
}
