"use client";
import React from "react";
import SideBar from "./SideBar";
import Content from "./Content";
import { useOrg } from "../OrgContext";
import Image from "next/image";

import OrganizationRequestPending from "@/components/OrganizationRequestPending";
import Dashboard_Btn from "@/app/organization/dashboard/[id]/components/Dashboard_Btn";
import Spinner from "@/components/Spinner";
import Style from "./../../../../navbar.module.css";
import {
  HiOutlineHome,
  HiOutlineServer,
  HiOutlineDocumentText,
  HiOutlineUsers,
  HiOutlineCog,
} from "react-icons/hi";

import Profile from "./Profile";
import { OrgContext } from "@/app/Type";
import ResponsiveSideBarButton from "@/components/ResponsiveSideBarButton";
import { IoIosClose } from "react-icons/io";

export default function CheckActive() {
  const {
    isSlideBar,
    handleDashboard,
    handleMyEvent,
    handleMyTeam,
    handleReport,
    isDashboardOpen,
    setIsDashboardOpen,
    handleSetting,
    isLoading,
    isActive,
    status,
    editedName,
    team,
    events,
    organizationImage,
  } = useOrg() as OrgContext;

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          {isActive ? (
            <div className="flex justify-center">
              <div className="grid max-w-[1500px]   grid-cols-12 gap-5 md:gap-2 lg:gap-2 xl:gap-5">
                <div
                  className={`lg:col-span-2 rounded-lg bg-slate-100  md:block hidden ${
                    isSlideBar
                      ? "md:col-span-3 md:ml-2  col-span-4"
                      : "md:col-span-1  col-span-2"
                  }`}
                >
                  <SideBar />
                </div>

                <div
                  className={`lg:col-span-7 rounded-lg col-span-12 h-full bg-slate-100   ${
                    isSlideBar ? "md:col-span-6 " : "md:col-span-8 "
                  }`}
                >
                  <Content />
                </div>
                <div
                  className={`lg:col-span-3 md:block hidden
                ${isSlideBar ? "md:col-span-3 md:mr-2 " : "md:col-span-1  "}`}
                >
                  <Profile />
                </div>
              </div>

              <div
                className={` absolute 
            -left-14
            top-40`}
              >
                <button onClick={() => setIsDashboardOpen(!isDashboardOpen)}>
                  <div className="  mr-5 h-10  md:hidden  flex justify-center items-center rounded-full   ">
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
              <div>
                <div
                  style={{
                    animation: `${
                      isDashboardOpen ? Style.slideIn : Style.slideOut
                    } 0.5s forwards`,
                  }}
                  className={
                    isDashboardOpen
                      ? "absolute shadow-2xl flex flex-col  left-0 top-0 w-[55%] sm:hidden h-full overflow-hidden bg-[#ecf0fc]  ease-in duration-50"
                      : "fixed left-[100%] top-0 p-10 ease-in duration-50"
                  }
                >
                  <button onClick={() => setIsDashboardOpen(false)}>
                    <div className="mx-2 text-black my-2 w-fit p-1 mb-3 ">
                      <IoIosClose size={30} />
                    </div>
                  </button>
                  <div className=" flex flex-col mx-5">
                    <ResponsiveSideBarButton
                      isActive={status === "dashboard"}
                      isSlideBar={isSlideBar}
                      text="Dashboard"
                      onClick={() => handleDashboard()}
                    >
                      <HiOutlineHome size={23} />
                    </ResponsiveSideBarButton>

                    <ResponsiveSideBarButton
                      isActive={status === "myEvents"}
                      isSlideBar={isSlideBar}
                      text="Events"
                      onClick={() => handleMyEvent()}
                    >
                      <HiOutlineServer size={23} />
                    </ResponsiveSideBarButton>
                    <ResponsiveSideBarButton
                      isActive={status === "report"}
                      isSlideBar={isSlideBar}
                      text="Report"
                      onClick={() => handleReport()}
                    >
                      <HiOutlineDocumentText size={23} />
                    </ResponsiveSideBarButton>
                    <ResponsiveSideBarButton
                      isActive={status === "myTeam"}
                      isSlideBar={isSlideBar}
                      text="Team"
                      onClick={() => handleMyTeam()}
                    >
                      <HiOutlineUsers size={23} />
                    </ResponsiveSideBarButton>
                    <ResponsiveSideBarButton
                      isActive={status === "setting"}
                      isSlideBar={isSlideBar}
                      text="Setting"
                      onClick={() => handleSetting()}
                    >
                      <HiOutlineCog size={23} />
                    </ResponsiveSideBarButton>
                  </div>
                  <div className=" border-t-2 pb-5 pt-5 bg-slate-200 rounded-md w-100 h-100  flex flex-col items-center gap-2 mx-5">
                    <div>
                      <Image
                        src={organizationImage}
                        width={70}
                        height={50}
                        alt="organization pic"
                        className="rounded-lg"
                      />
                    </div>

                    <div className="flex flex-col items-start">
                      <h4 className="block mb-2 font-sans lg:text-2xl text-base antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                        {editedName}
                      </h4>

                      <div className="md:text-sm lg:text-base font-medium	 flex justify-center items-center  gap-2">
                        <Image
                          src="/images/organization/TeamOfUsers.svg"
                          alt="user count"
                          width={30}
                          height={30}
                        />
                        User Count -{team.length}
                      </div>
                      <div className="md:text-sm lg:text-base font-medium	 flex justify-center items-center gap-3">
                        <Image
                          src="/images/organization/Bookmark_light.svg"
                          alt="user count"
                          width={26}
                          height={26}
                        />
                        Event Count -{events.length}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <OrganizationRequestPending />
          )}
        </div>
      )}
    </div>
  );
}
