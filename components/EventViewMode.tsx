"use client";
import React, { useState, useEffect } from "react";
import { HiOutlineViewGrid, HiOutlineViewList } from "react-icons/hi";
import EventCard from "@/components/EventCard";
import Pagination from "@mui/material/Pagination";
import { formatDate } from "@/util/helper";
import EventListView from "./EventListView";
import { EventType } from "@/app/Type";

const EventViewMode = ({ event }: { event: EventType[] }) => {
  const [eventarr, setEventarr] = useState<EventType[]>(event);
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [eventsPerPage, setEventsPerPage] = useState(2);

  useEffect(() => {
    const handleResize = () => {
      if (document.documentElement.clientWidth >= 1448) {
        setEventsPerPage(4);
      } else if (document.documentElement.clientWidth >= 1024) {
        setEventsPerPage(3); // Large screens
      } else if (document.documentElement.clientWidth >= 768) {
        setEventsPerPage(2); // Medium screens
      } else {
        setEventsPerPage(1); // Small screens
      }
    };
    handleResize();
  }, []);

  const handleSortByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSortBy = e.target.value;
    setSortBy(selectedSortBy);
    if (selectedSortBy === "name") {
      const sortedEvents = [...eventarr].sort((a, b) =>
        a.eventName.localeCompare(b.eventName)
      );
      setEventarr(sortedEvents);
    } else if (selectedSortBy === "location") {
      const sortedEvents = [...eventarr].sort((a, b) =>
        a.selectedTab.localeCompare(b.selectedTab)
      );
      setEventarr(sortedEvents);
    } else if (selectedSortBy === "date") {
      const sortedEvents = [...eventarr].sort((a, b) =>
        a.eventStartDate.localeCompare(b.eventStartDate)
      );
      setEventarr(sortedEvents);
    }
  };
  const handleViewChange = (mode: React.SetStateAction<string>) => {
    setViewMode(mode);
  };
  const paginate = (event: any, pageNumber: React.SetStateAction<number>) =>
    setCurrentPage(pageNumber);

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = eventarr.slice(indexOfFirstEvent, indexOfLastEvent);

  return (
    <div>
      <div className="flex flex-col md:flex-row lg:flex-row items-center justify-between mt-4">
        <div className="font-bold text-[30px] md:text-[40px] lg:text-5xl text-[#906953] drop-shadow-lg ms-4 md:ms-12 lg:ms-12 ">
          Upcoming Events
        </div>
        <div className=" justify-between items-center flex flex-row gap-4 md:gap-2 lg:gap-6 mr-0 md:mr-0 lg:mr-20 text-gray-600 ml-2 md:ml-8 lg:ml-8">
          <div className=" mt-2 md:mt-4 lg:mt-6 flex flex-row border border-[#906953] p-1  rounded-lg text-white shadow-normalComponent ">
            <div className="sm:ms-2 ms-0 hidden lg:flex text-[#906953]">
              {" "}
              Sort By
            </div>

            <div className="relative ml-0 lg:ml-4 text-gray-800 cursor-pointer ">
              <select
                className="border border-[#906953] px-4 py-1 rounded-md shadow-sm text-sm focus:outline-none  items-center"
                value={sortBy}
                onChange={handleSortByChange}
              >
                <option value="location">Location</option>
                <option value="name">Name</option>
                <option value="organization">Organization</option>
                <option value="date">Date</option>
              </select>
            </div>
          </div>
          <div className="mt-2 md:mt-4 lg:mt-6 flex flex-row gap-4 sm:mr-12 mr-0 border border-[#906953] p-1 rounded-lg text-white shadow-normalComponent  ">
            <div className="ms-2 hidden md:flex lg:flex text-[#906953]">
              {" "}
              View As
            </div>
            <div className="mt-1 flex flex-row sm:gap-3 gap-6 cursor-pointer mr-2 p-1">
              <HiOutlineViewGrid
                className={`cursor-pointer text-[#906953] hover:text-black   ${
                  viewMode === "grid" ? "" : ""
                }`}
                onClick={() => handleViewChange("grid")}
              />
              <HiOutlineViewList
                className={`cursor-pointer text-[#906953] hover:text-black ${
                  viewMode === "list" ? "" : ""
                }`}
                onClick={() => handleViewChange("list")}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className={`flex ${
          viewMode === "grid"
            ? "flex-wrap ml-1 justify-center items-center"
            : " flex-col gap-3 justify-center items-center"
        }  `}
      >
        {/* <EventListView /> */}
        {currentEvents.map((event, index) =>
          viewMode === "grid" ? (
            <EventCard
              id={event._id}
              key={index}
              name={event.eventName}
              img={event.dashboardImage}
              location={event.selectedTab}
              date={formatDate(event.eventStartDate)}
              time={event.startTime}
            />
          ) : (
            <EventListView
              id={event._id}
              key={index}
              name={event.eventName}
              img={event.dashboardImage}
              location={event.selectedTab}
              date={formatDate(event.eventStartDate)}
              time={event.startTime}
            />
          )
        )}{" "}
      </div>

      {/* Pagination */}
      {eventarr.length > eventsPerPage && (
        <Pagination
          count={Math.ceil(eventarr.length / eventsPerPage)}
          variant="outlined"
          shape="rounded"
          onChange={paginate}
          className="flex justify-center mt-4"
        />
      )}
    </div>
  );
};

export default EventViewMode;
