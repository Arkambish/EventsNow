"use client";
import React, { use, useState } from "react";
import Dashboard from "@/app/organization/dashboard/[id]/components/DashboardSide";
import Dashboard_Btn from "@/app/organization/dashboard/[id]/components/Dashboard_Btn";
import { useOrg } from "../OrgContext";
import {
  HiOutlineHome,
  HiArrowCircleRight,
  HiArrowCircleLeft,
  HiOutlineServer,
  HiOutlineDocumentText,
  HiOutlineUsers,
  HiOutlineCog,
} from "react-icons/hi";

import { PermissionType, voidFunc } from "@/app/Type";

interface contextProps {
  handleDashboard: voidFunc;
  isSlideBar: boolean;
  setIsSlideBar: (value: boolean) => void;
  handleMyEvent: voidFunc;
  handleReport: voidFunc;
  handleMyTeam: voidFunc;
  handleSetting: voidFunc;
  status: string;
  userPermission: PermissionType;
}

export default function SideBar() {
  const {
    handleDashboard,
    isSlideBar,
    setIsSlideBar,
    handleMyEvent,
    handleReport,
    handleMyTeam,
    handleSetting,
    status,
    userPermission,
  } = useOrg() as contextProps;

  const isAllPermissionAvailable =
    userPermission?.globalPermission?.includes("allPermission");
  return (
    <div className="">
      <Dashboard>
        <div>
          <button
            className="lg:hidden block"
            onClick={() => setIsSlideBar(!isSlideBar)}
          >
            <div className="flex items-end  ">
              {isSlideBar ? (
                <HiArrowCircleLeft size={40} />
              ) : (
                <HiArrowCircleRight size={40} />
              )}
            </div>
          </button>
        </div>
        <div className="flex flex-col items-start    w-full">
          {isAllPermissionAvailable && (
            <Dashboard_Btn
              isActive={status === "dashboard"}
              isSlideBar={isSlideBar}
              text="Dashboard"
              onClick={() => handleDashboard()}
            >
              <HiOutlineHome size={23} />
            </Dashboard_Btn>
          )}

          <Dashboard_Btn
            isActive={status === "myEvents"}
            isSlideBar={isSlideBar}
            text="Events"
            onClick={() => handleMyEvent()}
          >
            <HiOutlineServer size={23} />
          </Dashboard_Btn>

          {isAllPermissionAvailable && (
            <Dashboard_Btn
              isActive={status === "report"}
              isSlideBar={isSlideBar}
              text="Report"
              onClick={() => handleReport()}
            >
              <HiOutlineDocumentText size={23} />
            </Dashboard_Btn>
          )}

          {isAllPermissionAvailable && (
            <Dashboard_Btn
              isActive={status === "myTeam"}
              isSlideBar={isSlideBar}
              text="Team"
              onClick={() => handleMyTeam()}
            >
              <HiOutlineUsers size={23} />
            </Dashboard_Btn>
          )}
          {isAllPermissionAvailable && (
            <Dashboard_Btn
              isActive={status === "setting"}
              isSlideBar={isSlideBar}
              text="Setting"
              onClick={() => handleSetting()}
            >
              <HiOutlineCog size={23} />
            </Dashboard_Btn>
          )}
        </div>
      </Dashboard>
    </div>
  );
}
