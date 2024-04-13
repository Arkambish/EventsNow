"use client";
import React, { use, useState } from "react";

import EventDashButton from "./EventDashButton";

import { HiArrowCircleRight } from "react-icons/hi";
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
  } = UseEventContext() as EventContextType;

  return (
    <div>
      <div className=" flex flex-col  items-center shadow-3xl bg-[#FCFCFD] rounded-lg py- text-center  ">
        <div className=" grid-rows-8  gap-3 flex flex-col items-center">
          <div
            className={`mt-8 ${
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
                children={<AiOutlineHome size={23} />}
              />
              <CheckPermission
                provideGlobalPermission={["Manage Host Page"]}
                provideEventPermission={["Manage Host Page"]}
              >
                <EventDashButton
                  isSlideBar={isSideBar}
                  text="Host Page"
                  onClick={handleHostPage}
                  children={<RiPagesLine size={23} />}
                />
              </CheckPermission>
              <EventDashButton
                isSlideBar={isSideBar}
                text="My Team"
                onClick={() => handleMyteam()}
                children={<AiOutlineTeam size={23} />}
              />
              <CheckPermission
                provideGlobalPermission={["Get Reports"]}
                provideEventPermission={["Get Reports"]}
              >
                <EventDashButton
                  isSlideBar={isSideBar}
                  text="Reports"
                  onClick={() => handleReports()}
                  children={<TbReport size={23} />}
                />
              </CheckPermission>
              <CheckPermission
                provideGlobalPermission={["Manage Marketing Campaign"]}
                provideEventPermission={["Manage Marketing Campaign"]}
              >
                <EventDashButton
                  isSlideBar={isSideBar}
                  text="Campaign"
                  onClick={() => handleCampaign()}
                  children={<MdOutlinePublishedWithChanges size={23} />}
                />
              </CheckPermission>
              <CheckPermission
                provideGlobalPermission={["Manage Event", "Manage Profile"]}
                provideEventPermission={["Manage Event", "Manage Profile"]}
              >
                <EventDashButton
                  isSlideBar={isSideBar}
                  text="Settings"
                  onClick={() => handleSetting()}
                  children={<IoSettingsOutline size={23} />}
                />
              </CheckPermission>
              <CheckPermission
                provideGlobalPermission={["Manage Event", "Manage Payments"]}
                provideEventPermission={["Manage Event", "Manage Payments"]}
              >
                <EventDashButton
                  isSlideBar={isSideBar}
                  text="Tickets"
                  onClick={() => handleTicket()}
                  children={<TiTicket size={23} />}
                />
              </CheckPermission>
              <CheckPermission
                provideGlobalPermission={["Mark Attendance"]}
                provideEventPermission={["Mark Attendance"]}
              >
                <EventDashButton
                  isSlideBar={isSideBar}
                  text="QR Reader"
                  onClick={() => handleQRreader()}
                  children={<TbFileBarcode size={23} />}
                />
              </CheckPermission>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
