"use client";
import Image from "next/image";
import Link from "next/link";

import { MdOutlineDeleteSweep } from "react-icons/md";
import { success } from "@/util/Toastify";
import { error } from "@/util/Toastify";
import { useOrg } from "../OrgContext";

import axios from "axios";
import { EventType } from "@/app/Type";

interface EventCardOrgDash {
  img: string;
  name: string;
  location: string;
  date: string;
  time: string;
  isSlideBar: boolean;
  id: string;
}

type ContextData = {
  setEvents: React.Dispatch<React.SetStateAction<EventType[]>>;
  events: EventType[];
};

function eventDashboardHandler() {}

function EventCardOrgDash({
  img,
  name,
  location,
  date,
  time,
  isSlideBar,
  id,
}: EventCardOrgDash) {
  const { events, setEvents } = useOrg() as ContextData;

  const handleDelete = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/api/v1/event/deleteAnEvent`,
        {
          _id: id,
        }
      );

      if (res.status !== 200) {
        error("Failed to delete the event");
        return;
      }
      const newEvents = events.filter((event) => event._id !== id);

      setEvents(newEvents);
      success("Event deleted successfully");
      setEvents((prev: EventType[]) =>
        prev.filter((event) => event._id !== id)
      );
    } catch (error) {
      console.error("Error deleting......", error);
    }
  };
  return (
    <div className=" w-full  bg-[#D9D9D9] my-4  max-sm:mr-24 rounded-xl  shadow-lg grid lg:grid-cols-6 ">
      <div
        className="lg:rounded-l-xl max-lg:rounded-t-xl overflow-hidden bg-no-repeat bg-cover lg:col-span-2 bg-center h-40 lg:h-full"
        style={{ backgroundImage: `url(${img as string})` }}
      ></div>
      <div className="lg:col-span-4 rounded-r-xl pt-1 ">
        <div className="  flex justify-between px-6 my-2">
          <div className="  text-[#353535] font-semibold sm:font-bold text-lg sm:text-24">
            {name}
          </div>
          <Link href={`/event/dashboard/${id}`}>
            <button className="button max-sm:hidden text-center hide flex gap-2 bg-[#D47151] text-white rounded-2xl px-2 my-auto py-1 ml-4 font-IBM ">
              <svg
                width="21"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Filter">
                  <path
                    id="Vector 7"
                    d="M4.375 10L4.375 3.33333"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <path
                    id="Vector 9"
                    d="M16.1919 16.667L16.1919 15.0003"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <path
                    id="Vector 8"
                    d="M4.375 16.667L4.375 13.3337"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <path
                    id="Vector 10"
                    d="M16.1919 10L16.1919 3.33333"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <path
                    id="Vector 11"
                    d="M10.2837 5.83301L10.2837 3.33301"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <path
                    id="Vector 12"
                    d="M10.2837 16.667L10.2837 10.0003"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <ellipse
                    id="Ellipse 36"
                    cx="4.37514"
                    cy="11.6667"
                    rx="1.68813"
                    ry="1.66667"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <ellipse
                    id="Ellipse 37"
                    cx="10.2833"
                    cy="7.49967"
                    rx="1.68813"
                    ry="1.66667"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <ellipse
                    id="Ellipse 38"
                    cx="16.192"
                    cy="12.4997"
                    rx="1.68813"
                    ry="1.66667"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </g>
              </svg>
              Dashboard
            </button>
          </Link>
          <Link href="">
            {" "}
            <button
              onClick={handleDelete}
              className="button max-sm:hidden text-center hide flex gap-2 bg-rose-900 text-white rounded-2xl px-2 my-auto py-1 ml-4 font-IBM  "
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                height="1em"
                width="1em"
                className="mt-1"
              >
                <path d="M20.37 8.91l-1 1.73-12.13-7 1-1.73 3.04 1.75 1.36-.37 4.33 2.5.37 1.37 3.03 1.75M6 19V7h5.07L18 11v8a2 2 0 01-2 2H8a2 2 0 01-2-2m2 0h8v-6.8L10.46 9H8v10z" />
              </svg>
              Delete
            </button>
          </Link>
        </div>

        <div className="grid  gap-2 pl-4 pb-4">
          <div className=" flex">
            <Image
              src="/images/admin/Pin_fill_blue.svg"
              alt="calendar"
              width={35}
              height={40}
            />
            <div className="ml-2 my-auto font-mono text-[#353C4E] text-sm font-medium">
              {location}
            </div>
          </div>
          <div className="flex  ">
            <Image
              src="/images/admin/Clock_fill_blue.svg"
              alt="calendar"
              width={31}
              height={40}
            />
            <div className="ml-2 my-auto font-mono text-[#353C4E] text-sm font-medium">
              {time}
            </div>
          </div>
          <div className=" flex">
            <Image
              src="/images/admin/Date_range_light_blue.svg"
              alt="calendar"
              width={35}
              height={40}
            />
            <div className=" ml-2 my-auto font-mono text-[#353C4E] text-sm font-medium">
              {date.substring(0, 10)}
            </div>
          </div>
        </div>
        <div className="flex sm:hidden content-center ">
          <button className="button text-center mb-8 flex gap-2 bg-[#D47151] text-white rounded-2xl px-2 my-auto py-1 ml-4 font-IBM ">
            <svg
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Filter">
                <path
                  id="Vector 7"
                  d="M4.375 10L4.375 3.33333"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <path
                  id="Vector 9"
                  d="M16.1919 16.667L16.1919 15.0003"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <path
                  id="Vector 8"
                  d="M4.375 16.667L4.375 13.3337"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <path
                  id="Vector 10"
                  d="M16.1919 10L16.1919 3.33333"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <path
                  id="Vector 11"
                  d="M10.2837 5.83301L10.2837 3.33301"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <path
                  id="Vector 12"
                  d="M10.2837 16.667L10.2837 10.0003"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <ellipse
                  id="Ellipse 36"
                  cx="4.37514"
                  cy="11.6667"
                  rx="1.68813"
                  ry="1.66667"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <ellipse
                  id="Ellipse 37"
                  cx="10.2833"
                  cy="7.49967"
                  rx="1.68813"
                  ry="1.66667"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <ellipse
                  id="Ellipse 38"
                  cx="16.192"
                  cy="12.4997"
                  rx="1.68813"
                  ry="1.66667"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </g>
            </svg>
            d
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventCardOrgDash;
