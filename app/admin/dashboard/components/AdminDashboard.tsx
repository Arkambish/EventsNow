"use client";
import React, { useState } from "react";
import { useAdmin } from "../AdminContextFile";
import SuperadminButton from "@/app/admin/dashboard/components/SuperadminButton";
import Notification from "./Notification";
import Organization from "./Organization";
import Event from "./Event";
import User from "./User";
import Payments from "./Payments";
import {
  HiMenu,
  HiOutlineDocumentText,
  HiOutlineHome,
  HiOutlineServer,
} from "react-icons/hi";
import { VscBellDot } from "react-icons/vsc";
import { BiWorld } from "react-icons/bi";
import { LiaBookSolid } from "react-icons/lia";
import { GoPeople } from "react-icons/go";
import { FiFileText } from "react-icons/fi";

import Spinner from "@/components/Spinner";
import { AdminContext } from "@/app/Type";
import Image from "next/image";
import Dashboard_Btn from "@/app/organization/dashboard/[id]/components/Dashboard_Btn";
import AdminResponsiveSideBarBtn from "@/components/AdminResponsiveSideBarBtn";
import { IoIosClose } from "react-icons/io";

export default function AdminDashboard() {
  const {
    handleNotification,
    handleOrganization,
    handleEvent,
    handleUser,
    handlePayments,
    status,
    isLoading,
  } = useAdmin() as AdminContext;

  const [show, setShow] = useState(false);
  const handleClick = () => {
    setShow(!show);
  };
  const [activeButton, setActiveButton] = useState("Notification");
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  return (
    <div className="h-full	 ">
      {isLoading ? (
        <Spinner />
      ) : (
        <div className=" md:flex lg:flex flex flex-col md:flex-row lg:flex-row h-full mt-5">
          <div className="hidden sm:flex-col md:flex  sm:w-full md:w-1/5 lg:w-1/6   ms-1 h-full rounded-lg">
            <div className="flex flex-col   shadow-3xl items-center rounded-lg pt-4 xxl:p-0   lg:p-2 p-0">
              {/* <div className=" flex flex-row mt-2 h-full rounded-lg "> */}
              {/* <div className="sm:w-full md:w-1/4 lg:w-1/4 xl:w-1/4 sm:hidden md:flex lg:flex justify-center rounded-lg "> */}
              {/* <div className="sm:hidden md:flex md:flex-col  md:w-3/4 sm:w-full mt-8 sm:ms-0  rounded-lg bg-gray-50"> */}
              <SuperadminButton
                text="Notification"
                onClick={() => {
                  handleNotification();
                  setActiveButton("Notification");
                }}
                icon={<VscBellDot />}
                isActive={activeButton === "Notification"}
              />
              <SuperadminButton
                text="Organization"
                onClick={() => {
                  handleOrganization();
                  setActiveButton("Organization");
                }}
                icon={<BiWorld />}
                isActive={activeButton === "Organization"}
              />
              <SuperadminButton
                text="Event"
                icon={<LiaBookSolid />}
                onClick={() => {
                  handleEvent();
                  setActiveButton("Event");
                }}
                isActive={activeButton === "Event"}
              />
              <SuperadminButton
                text="User"
                icon={<GoPeople />}
                onClick={() => {
                  handleUser();
                  setActiveButton("User");
                }}
                isActive={activeButton === "User"}
              />

              <SuperadminButton
                text="Payments"
                icon={<FiFileText />}
                onClick={() => {
                  handlePayments();
                  setActiveButton("Payments");
                }}
                isActive={activeButton === "Payments"}
              />
            </div>
            <div
              onClick={handleClick}
              className="sm:hidden cursor-pointer pl-24"
            >
              <HiMenu size={30} />
            </div>
            {/* {show && <AdminDashboard />} */}
            {/* </div> */}
            {/* </div>
            </div> */}
          </div>
          <div className="sm:w-full  w-full overflow-hidden   mr-0 lg:mr-2 md:mr-0 h-full lg:ms-1 md:ms-1 sm:ms-0 xl:ms-1  ">
            <div>
              {status === "" && <Notification />}
              {status === "Notification" && <Notification />}
              {status === "Organization" && <Organization />}
              {status === "Event" && <Event />}
              {status === "User" && <User />}
              {status === "Payments" && <Payments />}
            </div>
          </div>

          <div
            className={`fixed 
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
          {/* responsive part */}
          <div>
            <div
              // style={{
              //   animation: `${
              //     isDashboardOpen ? Style.slideIn : Style.slideOut
              //   } 0.5s forwards`,
              // }}
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
                <AdminResponsiveSideBarBtn
                  text="Notification"
                  onClick={() => {
                    handleNotification();
                    setActiveButton("Notification");
                    setIsDashboardOpen(false);
                  }}
                  icon={<VscBellDot size={22} />}
                  isActive={activeButton === "Notification"}
                />
                <AdminResponsiveSideBarBtn
                  text="Organization"
                  onClick={() => {
                    handleOrganization();
                    setActiveButton("Organization");
                    setIsDashboardOpen(false);
                  }}
                  icon={<BiWorld size={22} />}
                  isActive={activeButton === "Organization"}
                />
                <AdminResponsiveSideBarBtn
                  text="Event"
                  icon={<LiaBookSolid size={22} />}
                  onClick={() => {
                    handleEvent();
                    setActiveButton("Event");
                    setIsDashboardOpen(false);
                  }}
                  isActive={activeButton === "Event"}
                />
                <AdminResponsiveSideBarBtn
                  text="User"
                  icon={<GoPeople size={22} />}
                  onClick={() => {
                    handleUser();
                    setActiveButton("User");
                    setIsDashboardOpen(false);
                  }}
                  isActive={activeButton === "User"}
                />

                <AdminResponsiveSideBarBtn
                  text="Payments"
                  icon={<FiFileText size={22} />}
                  onClick={() => {
                    handlePayments();
                    setActiveButton("Payments");
                    setIsDashboardOpen(false);
                  }}
                  isActive={activeButton === "Payments"}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
