"use client";
import Dashboard from "./Dashboard";
import Dashboard_Btn from "./Dashboard_Btn";
import { useProf } from "../ProfContext";
import { ProfContext } from "@/app/Type";
import {
  HiArrowCircleRight,
  HiOutlineBookmarkAlt,
  HiOutlineCash,
} from "react-icons/hi";
import { HiArrowCircleLeft } from "react-icons/hi";
import {
  HiOutlineCalendarDays,
  HiOutlineCog8Tooth,
  HiOutlineReceiptPercent,
  HiOutlineUserCircle,
} from "react-icons/hi2";
import { useState } from "react";

export default function SideBar() {
  const {
    handleProfile,
    isActive,
    isSlideBar,

    setIsSlideBar,
    handleWishList,
    handleMyEvents,
    handlemyTickets,
    handleSetting,
  } = useProf() as ProfContext;
  const [activeButton, setActiveButton] = useState("myProfile");

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
        <div className="flex flex-col ">
          <Dashboard_Btn
            isSlideBar={isSlideBar}
            text="My Profile"
            onClick={() => {
              handleProfile();
              setActiveButton("myProfile");
            }}
            isActive={activeButton === "myProfile"}
            icon={<HiOutlineUserCircle size={25} />}
          />
          <Dashboard_Btn
            isSlideBar={isSlideBar}
            text="Wish List"
            onClick={() => {
              handleWishList();
              setActiveButton("wishList");
            }}
            isActive={activeButton === "wishList"}
            icon={<HiOutlineBookmarkAlt size={25} />}
          />
          <Dashboard_Btn
            isSlideBar={isSlideBar}
            text="My Events"
            onClick={() => {
              handleMyEvents();
              setActiveButton("My Events");
            }}
            isActive={activeButton === "My Events"}
            icon={<HiOutlineCalendarDays size={25} />}
          />
          <Dashboard_Btn
            isSlideBar={isSlideBar}
            text="My Tickets"
            onClick={() => {
              handlemyTickets();
              setActiveButton("My Tickets");
            }}
            isActive={activeButton === "My Tickets"}
            icon={<HiOutlineCash size={25} />}
          />
          <Dashboard_Btn
            isSlideBar={isSlideBar}
            text="Settings"
            onClick={() => {
              handleSetting();
              setActiveButton("Settings");
            }}
            isActive={activeButton === "Settings"}
            icon={<HiOutlineCog8Tooth size={25} />}
          />
        </div>
      </Dashboard>
    </div>
  );
}
