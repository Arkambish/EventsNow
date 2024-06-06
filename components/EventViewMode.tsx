"use client";
import React, { useState, useEffect, useRef } from "react";
import { HiOutlineViewGrid, HiOutlineViewList } from "react-icons/hi";
import EventCard from "@/components/EventCard";
import Pagination from "@mui/material/Pagination";
import { formatDate } from "@/util/helper";
import EventListView from "./EventListView";
import { useIntersection } from "react-use";
import gsap from "gsap";
import { EventType } from "@/app/Type";
import {
  HiOutlineLocationMarker,
  HiOutlinePencil,
  HiOutlineLibrary,
  HiOutlineCalendar,
} from "react-icons/hi";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Select";

import { useSearchParams } from "next/navigation";
import EmptyStateComponent from "./EmptyStateComponent";

const EventViewMode = ({ event }: { event: EventType[] }) => {
  const [eventarr, setEventarr] = useState<EventType[]>(event);
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [eventsPerPage, setEventsPerPage] = useState(2);

  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  const scrollPosition = useRef(0);

  useEffect(() => {
    const filterEvents = (searchQuery: string | null) => {
      if (searchQuery) {
        const filteredEvents = event.filter((e) =>
          e.eventName.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setEventarr(filteredEvents);
      } else {
        setEventarr(event); // Reset to all events if there's no search query
      }
    };

    filterEvents(search);
  }, [search, event]);

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

  const handleSortByChange = (e: string) => {
    scrollPosition.current = window.scrollY;

    const selectedSortBy = e;
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

    window.scrollTo(0, scrollPosition.current);
  };
  const handleViewChange = (mode: React.SetStateAction<string>) => {
    scrollPosition.current = window.scrollY;

    setViewMode(mode);
    window.scrollTo(0, scrollPosition.current);
  };
  const paginate = (event: any, pageNumber: React.SetStateAction<number>) =>
    setCurrentPage(pageNumber);

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = eventarr.slice(indexOfFirstEvent, indexOfLastEvent);

  return (
    <div>
      <div className="mt-8 mb-10 flex flex-col md:flex-row lg:flex-row  sm:items-center items-start justify-between">
        <div className=" font-bold text-[30px] md:text-[40px] lg:text-5xl text-[#906953] drop-shadow-lg  ms-8">
          Upcoming Events
        </div>
        <div className="ms-12 sm:ms-0 justify-center items-center flex flex-col md:flex-col lg:flex-row gap-2 md:gap-2 lg:gap-6 mr-0 md:mr-20 lg:mr-20 text-gray-600 ">
          <div className=" mt-2 md:mt-6 lg:mt-10 flex flex-row">
            <div className=" sm:ml-4">
              <Select onValueChange={handleSortByChange}>
                <SelectTrigger
                  // onChange={(e) => handleEventChange(e)}
                  // value={selectedEvent}
                  className="w-[150px] ring-0 ring-slate-100 h-8 font-semibold"
                >
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent className="bg-white text-black">
                  <SelectItem value="location">
                    <div className=" flex gap-2 justify-center items-center">
                      <HiOutlineLocationMarker size={18} />
                      <div>Location</div>
                    </div>
                  </SelectItem>
                  <SelectItem value="name">
                    <div className="flex gap-2">
                      <HiOutlinePencil size={18} />
                      <div>Name</div>
                    </div>
                  </SelectItem>
                  <SelectItem value="organization">
                    <div className="flex gap-2 justify-center items-center">
                      <HiOutlineLibrary size={18} />
                      <div>Organization</div>
                    </div>
                  </SelectItem>
                  <SelectItem value="date">
                    <div className=" flex gap-2 justify-center items-center">
                      <HiOutlineCalendar size={18} />
                      <div>Date</div>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div
            className="mt-2 md:mt-2 
          font-semibold text-md lg:mt-10 lg:flex hidden flex-row gap-4 sm:mr-20"
          >
            View As
            <div className="mt-1 flex flex-row gap-3 cursor-pointer">
              <HiOutlineViewGrid
                size={20}
                className={`cursor-pointer hover:text-custom-orange   ${
                  viewMode === "grid" ? "" : ""
                }`}
                onClick={() => handleViewChange("grid")}
              />
              <HiOutlineViewList
                size={20}
                className={`cursor-pointer hover:text-custom-orange ${
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
        {currentEvents.length > 0 ? (
          currentEvents.map((event, index) =>
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
          )
        ) : (
          <EmptyStateComponent message="no event found" />
        )}
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
