"use client";
import React, { useState } from "react";
import { useAdmin } from "../AdminContextFile";
import SuperadminButton from "@/app/admin/dashboard/components/SuperadminButton";
import Notification from "./Notification";
import Organization from "./Organization";
import Event from "./Event";
import User from "./User";
import Payments from "./Payments";
import { HiMenu } from "react-icons/hi";
import { VscBellDot } from "react-icons/vsc";
import { BiWorld } from "react-icons/bi";
import { LiaBookSolid } from "react-icons/lia";
import { GoPeople } from "react-icons/go";
import { FiFileText } from "react-icons/fi";

import Spinner from "@/components/Spinner";
import { AdminContext } from "@/app/Type";

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

  return (
    <div className="h-full	 ">
      {isLoading ? (
        <Spinner />
      ) : (
        <div className=" md:flex lg:flex flex flex-col md:flex-row lg:flex-row h-full mt-5">
          <div className="hidden sm:flex-col md:flex lg:flex sm:w-full md:w-1/5 lg:w-1/6  ms-1 h-full rounded-lg">
            <div className="flex flex-col   shadow-3xl items-center rounded-lg ">
              <div className=" flex flex-row mt-2 h-full rounded-lg ">
                <div className="sm:w-full md:w-1/4 lg:w-1/4 xl:w-1/4 sm:hidden md:flex lg:flex justify-center rounded-lg ">
                  <div className="sm:hidden md:flex md:flex-col lg:flex lg:flex-col md:w-3/4 lg:w-3/4 sm:w-full mt-8 sm:ms-0 md:ms-0 lg:ms-0 rounded-lg bg-gray-50">
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
                  {show && <AdminDashboard />}
                </div>
              </div>
            </div>
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
        </div>
      )}
    </div>
  );
}
