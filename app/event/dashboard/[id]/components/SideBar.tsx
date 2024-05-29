"use client";
import React, { use, useState } from "react";

import EventDashButton from "./EventDashButton";

import {
  HiArrowCircleRight,
  HiOutlineDocumentText,
  HiOutlineUsers,
} from "react-icons/hi";
import { HiArrowCircleLeft } from "react-icons/hi";
import Container from "./Container";
import { UseEventContext, EventContextType } from "../EventDashContext";
import CheckPermission from "./CheckPermission";
import { AiOutlineHome } from "react-icons/ai";
import { RiPagesLine } from "react-icons/ri";
import { AiOutlineTeam } from "react-icons/ai";
import { TbReport } from "react-icons/tb";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { TiTicket } from "react-icons/ti";
import { TbFileBarcode } from "react-icons/tb";
import Spinner from "@/components/Spinner";

export default function SideBar() {
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
    handleQRreader,
    globalPermission,
    eventPermission,
    isLoading,
    status,
  } = UseEventContext() as EventContextType;

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          <div className=" flex flex-col  items-center  bg-slate-100 rounded-lg py- text-center h-full overflow-hidden  ">
            <div className=" grid-rows-8   flex flex-col items-center">
              <div
                className={`mt-4 ${
                  isSideBar
                    ? "md:col-span-3 md:ml-2  col-span-4"
                    : "md:col-span-1  col-span-2"
                }`}
              >
                <div>
                  <button
                    className="md:hidden block"
                    onClick={() => setIsSideBar(!isSideBar)}
                  >
                    <div className="flex items-end  ">
                      {isSideBar ? (
                        <HiArrowCircleLeft size={40} />
                      ) : (
                        <HiArrowCircleRight size={40} />
                      )}
                    </div>
                  </button>
                </div>
                <div
                  className={`flex flex-col  ${
                    isSideBar ? "items-start" : "items-center"
                  } `}
                >
                  <EventDashButton
                    isSlideBar={isSideBar}
                    text="Overview"
                    onClick={() => handleOverview()}
                    isActive={status === "overview"}
                  >
                    <AiOutlineHome size={23} />
                  </EventDashButton>
                  <CheckPermission
                    provideGlobalPermission={["Manage Host Page"]}
                    provideEventPermission={["Manage Host Page"]}
                  >
                    <EventDashButton
                      isSlideBar={isSideBar}
                      text="Host Page"
                      onClick={handleHostPage}
                      isActive={status === "hostpage"}
                    >
                      <RiPagesLine size={23} />
                    </EventDashButton>
                  </CheckPermission>
                  <EventDashButton
                    isSlideBar={isSideBar}
                    text="My Team"
                    onClick={() => handleMyteam()}
                    isActive={status === "myteam"}
                  >
                    <HiOutlineUsers size={23} />
                  </EventDashButton>
                  <CheckPermission
                    provideGlobalPermission={["Get Reports"]}
                    provideEventPermission={["Get Reports"]}
                  >
                    <EventDashButton
                      isSlideBar={isSideBar}
                      text="Reports"
                      onClick={() => handleReports()}
                      isActive={status === "reports"}
                    >
                      <HiOutlineDocumentText size={23} />
                    </EventDashButton>
                  </CheckPermission>
                  <CheckPermission
                    provideGlobalPermission={["Manage Marketing Campaign"]}
                    provideEventPermission={["Manage Marketing Campaign"]}
                  >
                    <EventDashButton
                      isSlideBar={isSideBar}
                      text="Campaign"
                      onClick={() => handleCampaign()}
                      isActive={status === "campaign"}
                    >
                      <MdOutlinePublishedWithChanges size={23} />
                    </EventDashButton>
                  </CheckPermission>
                  <CheckPermission
                    provideGlobalPermission={["Manage Event", "Manage Profile"]}
                    provideEventPermission={["Manage Event", "Manage Profile"]}
                  >
                    <EventDashButton
                      isSlideBar={isSideBar}
                      text="Settings"
                      onClick={() => handleSetting()}
                      isActive={status === "settings"}
                    >
                      <IoSettingsOutline size={23} />
                    </EventDashButton>
                  </CheckPermission>
                  <CheckPermission
                    provideGlobalPermission={[
                      "Manage Event",
                      "Manage Payments",
                    ]}
                    provideEventPermission={["Manage Event", "Manage Payments"]}
                  >
                    <EventDashButton
                      isSlideBar={isSideBar}
                      text="Tickets"
                      onClick={() => handleTicket()}
                      isActive={status === "tickets"}
                    >
                      <TiTicket size={23} />
                    </EventDashButton>
                  </CheckPermission>
                  <CheckPermission
                    provideGlobalPermission={["Mark Attendance"]}
                    provideEventPermission={["Mark Attendance"]}
                  >
                    <EventDashButton
                      isSlideBar={isSideBar}
                      text="Mark Attendance"
                      onClick={() => handleQRreader()}
                      isActive={status === "qrreader"}
                    >
                      <TbFileBarcode size={23} />
                    </EventDashButton>
                  </CheckPermission>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
