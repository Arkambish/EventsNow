"use client";
import Dashboard from "@/app/organization/dashboard/[id]/components/DashboardSide";
import Dashboard_Btn from "@/app/organization/dashboard/[id]/components/Dashboard_Btn";
import { useProf } from "../ProfContext";
import { ProfContext } from "@/app/Type";
import { HiArrowCircleRight } from "react-icons/hi";
import { HiArrowCircleLeft } from "react-icons/hi";

export default function SideBar() {
  const {
    handleProfile,
    isSlideBar,
    setIsSlideBar,
    handleWishList,
    handleMyEvents,
    handlemyTickets,
    handleSetting,
  } = useProf() as ProfContext;
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
        <div className="flex flex-col items-start ">
          <Dashboard_Btn
            isActive={true}
            isSlideBar={isSlideBar}
            text="My Profile"
            onClick={() => handleProfile()}
          >
            ""
          </Dashboard_Btn>
          <Dashboard_Btn
            isSlideBar={isSlideBar}

            isActive={false}

            text="Wish List"
            onClick={() => handleWishList()}
          >
            ""
          </Dashboard_Btn>
          <Dashboard_Btn
            isSlideBar={isSlideBar}

            isActive={false}

            text="My Events"
            onClick={() => handleMyEvents()}
          >
            ""
          </Dashboard_Btn>
          <Dashboard_Btn
            isSlideBar={isSlideBar}

            isActive={false}

            text="My Tickets"
            onClick={() => handlemyTickets()}
          >
            ""
          </Dashboard_Btn>
          <Dashboard_Btn
            isSlideBar={isSlideBar}

            isActive={false}

            text="Settings"
            onClick={() => handleSetting()}
          >
            ""
          </Dashboard_Btn>
        </div>
      </Dashboard>
    </div>
  );
}
