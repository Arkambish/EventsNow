"use client";
import Image from "next/image";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

import Link from "next/link";

import { MdOutlineDeleteSweep } from "react-icons/md";
import { success } from "@/util/Toastify";
import { error } from "@/util/Toastify";
import { useOrg } from "../OrgContext";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { HiOutlineHome } from "react-icons/hi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { BiMapPin, BiCalendar, BiAlarm } from "react-icons/bi";

import axios from "axios";
import { EventType } from "@/app/Type";
import Modal from "@/components/Modal";
import { FetchPost } from "@/hooks/useFetch";
import { useParams } from "next/navigation";

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
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
    <div className="  w-full border-2 my-4  max-sm:mr-24 rounded-xl  shadow-lg grid lg:grid-cols-6 ">
      <div
        className="lg:rounded-l-xl max-lg:rounded-t-xl overflow-hidden bg-no-repeat bg-cover lg:col-span-2 bg-center h-40 lg:h-full"
        style={{ backgroundImage: `url(${img as string})` }}
      ></div>
      <div className="lg:col-span-4 rounded-r-xl pt-1 justify-start items-start">
        <div className="  flex justify-between px-6 mt-2 mb-1">
          <div className="  text-[#353535] font-semibold sm:font-bold text-lg sm:text-24">
            {name}
          </div>
          <div className="flex flex-col gap-3">
            <div className=" text-right">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex w-full justify-center rounded-full  px-3 py-2 text-xl font-medium text-black hover:bg-slate-100 focus:outline-none">
                    <HiOutlineDotsVertical />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                    <div className="px-1 py-1 ">
                      <Link href={`/event/dashboard/${id}`}>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active
                                  ? "bg-slate-200 text-black"
                                  : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              {active ? (
                                <EditActiveIcon
                                  className="mr-2 h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <EditInactiveIcon
                                  className="mr-2 h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                              Dashboard
                            </button>
                          )}
                        </Menu.Item>
                      </Link>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => setIsOpen(true)}
                            className={`${
                              active
                                ? "bg-slate-200 text-black"
                                : "text-gray-900"
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            {active ? (
                              <DeleteActiveIcon
                                className="mr-2 h-5 w-5 "
                                aria-hidden="true"
                              />
                            ) : (
                              <DeleteInactiveIcon
                                className="mr-2 h-5 w-5 "
                                aria-hidden="true"
                              />
                            )}
                            Delete
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>

        <div className="grid  gap-2 pl-6 pb-6">
          <div className=" flex  items-center">
            <BiMapPin size={22} />
            <div className="ml-2 my-auto  text-[#353C4E] text-sm font-medium">
              {location}
            </div>
          </div>
          <div className="flex   items-center ">
            <BiAlarm size={22} />
            <div className="ml-2 my-auto  text-[#353C4E] text-sm font-medium">
              {time}
            </div>
          </div>
          <div className=" flex  items-center">
            <BiCalendar size={22} />
            <div className=" ml-2 my-auto  text-[#353C4E] text-sm font-medium">
              {date.substring(0, 10)}
            </div>
          </div>
        </div>
        {/* <div className="flex sm:hidden content-center ">
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
          </button>
        </div> */}
      </div>
      {isOpen && (
        <Modal setIsOpen={setIsOpen} isOpen={isOpen}>
          <Dialog.Title
            as="h3"
            className="text-lg font-medium leading-6 text-gray-900"
          >
            Confirm Deletion
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Are you sure you want to delete this item?By clicking "Delete,"
              you will permanently remove the selected data in your account.
            </p>
          </div>

          <div className="mt-4 flex gap-2">
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              onClick={handleDelete}
            >
              Delete
            </button>
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default EventCardOrgDash;

function EditInactiveIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#fff"
        stroke="#000000"
        strokeWidth="2"
      />
    </svg>
  );
}

function EditActiveIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#fff"
        stroke="#000000"
        strokeWidth="2"
      />
    </svg>
  );
}

function DeleteInactiveIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="6"
        width="10"
        height="10"
        fill="#fff"
        stroke="#000000"
        strokeWidth="2"
      />
      <path d="M3 6H17" stroke="#000000" strokeWidth="2" />
      <path d="M8 6V4H12V6" stroke="#000000" strokeWidth="2" />
    </svg>
  );
}

function DeleteActiveIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="6"
        width="10"
        height="10"
        fill="#fff"
        stroke="#000000"
        strokeWidth="2"
      />
      <path d="M3 6H17" stroke="#000000" strokeWidth="2" />
      <path d="M8 6V4H12V6" stroke="#000000" strokeWidth="2" />
    </svg>
  );
}
