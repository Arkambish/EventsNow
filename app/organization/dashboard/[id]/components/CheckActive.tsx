"use client";
import React from "react";
import SideBar from "./SideBar";
import Content from "./Content";
import { useOrg } from "../OrgContext";
import Image from "next/image";

import OrganizationRequestPending from "@/components/OrganizationRequestPending";
import Dashboard_Btn from "@/app/organization/dashboard/[id]/components/Dashboard_Btn";
import Spinner from "@/components/Spinner";

import {
  HiOutlineHome,
  HiOutlineServer,
  HiOutlineDocumentText,
  HiOutlineUsers,
  HiOutlineCog,
} from "react-icons/hi";

import Profile from "./Profile";
import { OrgContext } from "@/app/Type";

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
  } = useOrg() as OrgContext;

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          {isActive ? (
            <div className="2xl:flex 2xl:justify-center">
              <div className="grid max-w-[1500px]   grid-cols-12 gap-5 md:gap-2 lg:gap-2 xl:gap-5">
                <div
                  className={`lg:col-span-2   md:block hidden ${
                    isSlideBar
                      ? "md:col-span-3 md:ml-2  col-span-4"
                      : "md:col-span-1  col-span-2"
                  }`}
                >
                  <SideBar />
                </div>

                <div
                  className={`lg:col-span-7 col-span-12  ${
                    isSlideBar ? "md:col-span-6 " : "md:col-span-8 "
                  }`}
                >
                  <Content />
                </div>
                <div
                  className={`lg:col-span-3 md:block hidden
             ${isSlideBar ? "md:col-span-3 md:mr-2 " : "md:col-span-3  "}`}
                >
                  <Profile />
                </div>
              </div>

              <div
                className={`fixed 
            -left-14
            top-40`}
              >
                <button onClick={() => setIsDashboardOpen(!isDashboardOpen)}>
                  <div className="  mr-5 h-10  md:hidden  flex justify-center items-center rounded-full   ">
                    <div className="bg-myBrown w-[100px] h-[55px] flex items-center   rounded-full">
                      <div className="bg-custom-orange w-[95px] h-[46px] flex justify-end pr-3 rounded-full">
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
                  className={
                    isDashboardOpen
                      ? "absolute shadow-2xl flex flex-col  left-0 top-20 w-[65%] sm:hidden h-100vh bg-[#ecf0fc]  ease-in duration-50"
                      : "fixed left-[100%] top-0 p-10 ease-in duration-50"
                  }
                >
                  <button onClick={() => setIsDashboardOpen(false)}>
                    <div className="mx-2 my-2 w-fit p-1 mb-3 ">
                      <Image
                        src="/images/reusableComponents/close.svg"
                        alt="close"
                        width={29}
                        height={29}
                      />
                    </div>
                  </button>
                  <div className=" flex flex-col mx-5">
                    <Dashboard_Btn
                      isActive={status === "dashboard"}
                      isSlideBar={isSlideBar}
                      text="Dashboard"
                      onClick={() => handleDashboard()}
                    >
                      <HiOutlineHome size={23} />
                    </Dashboard_Btn>

                    <Dashboard_Btn
                      isActive={status === "myEvents"}
                      isSlideBar={isSlideBar}
                      text="Events"
                      onClick={() => handleMyEvent()}
                    >
                      <HiOutlineServer size={23} />
                    </Dashboard_Btn>
                    <Dashboard_Btn
                      isActive={status === "report"}
                      isSlideBar={isSlideBar}
                      text="Report"
                      onClick={() => handleReport()}
                    >
                      <HiOutlineDocumentText size={23} />
                    </Dashboard_Btn>
                    <Dashboard_Btn
                      isActive={status === "myTeam"}
                      isSlideBar={isSlideBar}
                      text="Team"
                      onClick={() => handleMyTeam()}
                    >
                      <HiOutlineUsers size={23} />
                    </Dashboard_Btn>
                    <Dashboard_Btn
                      isActive={status === "setting"}
                      isSlideBar={isSlideBar}
                      text="Setting"
                      onClick={() => handleSetting()}
                    >
                      <HiOutlineCog size={23} />
                    </Dashboard_Btn>
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
