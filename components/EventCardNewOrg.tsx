import Image from "next/image";
import React, { useState, useEffect,Fragment } from "react";
import { SlCalender } from "react-icons/sl";
import { FaClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { z } from "zod";
import Modal from "@/components/Modal";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { EventType } from "@/app/Type";
import { FetchPost } from "@/hooks/useFetch";
import { success, error } from "@/util/Toastify";
import { GrLocationPin } from "react-icons/gr";
import {
  IoCalendarNumberOutline,
  IoLocationOutline,
  IoTimerOutline,
} from "react-icons/io5";
import { MdDateRange } from "react-icons/md";
import { RxClock } from "react-icons/rx";
import { HiOutlineDotsVertical } from "react-icons/hi"
import {  AiTwotoneInfoCircle } from "react-icons/ai";
import { TbSend } from "react-icons/tb";
import { MdCancel } from "react-icons/md";

interface eventorg {
  event: EventType;
}

export default function EventCardNewOrg({ event }: eventorg) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [notificationModal, setNotificationModal] = useState<boolean>(false);

  // const sendNotification = async () => {
  //   try {
  //     const data = {
  //       topic: "Event reminder",
  //       comment: `${
  //         event.eventName
  //       } will be started on ${event.eventStartDate.substring(
  //         0,
  //         10
  //       )}. be ready for the excitement`,
  //       userIds: event.registerUser,
  //     };

  //     const notifyUser = await FetchPost({
  //       endpoint: `notification/postNotificationById`,
  //       body: data,
  //     });
  //     if (!notifyUser) {
  //       error("error in sending notification");
  //     }

  //     success("Notification sent successfully");
  //   } catch (error) {
  //     console.error("Error", error);
  //   }
  // };

  return (
    <div>
      <div className=" bg-[#ffffff] my-4 ml-4 mr-12 rounded-xl border-2 border-spacing-1 shadow-lg grid lg:grid-cols-3 overflow-hidden">
        <div
          className="lg:rounded-l-xl overflow-hidden bg-no-repeat bg-cover bg-center"
          style={{ backgroundImage: `url(${event.dashboardImage as string})` }}
        ></div>
        <div className="lg:col-span-2 rounded-r-xl pt-1">
          <div className="  flex justify-between px-6">
            <div className=" my-2 text-[#353535] font-semibold sm:font-bold text-lg sm:text-24 capitalize ">
              {event.eventName}
            </div>
            <div className="flex max-sm:hidden content-center  ">
              {/* <button
                onClick={() => setNotificationModal(true)}
                className=" text-center  bg-[#4E8171] text-white rounded-2xl px-2 my-auto py-1 ml-4 font-IBM "
              >
                send notification
              </button>
              <button
                onClick={() => {
                  setShowDetailsModal(true);
                  setIsOpen(true);
                }}
                className=" text-center bg-[#4E8171] text-white rounded-2xl px-2 py-1 my-auto ml-4 font-IBM "
              >
                details
              </button> */}

<Menu as="div" className="relative inline-block text-left  content-center">
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
                  <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none font-Inter font-semibold">
                    <div className="px-1 py-1 ">
                      
                        <Menu.Item>
                        <button
                onClick={() => setNotificationModal(true)}
                className=" group flex w-full text-stone-600 gap-3 hover:bg-slate-100 items-center rounded-md px-2 py-2 text-sm "
              >
               <TbSend size={21} /> Send notification
              </button>
                        </Menu.Item>
                      
                      <Menu.Item>
                      <button
                onClick={() => {
                  setShowDetailsModal(true);
                  setIsOpen(true);
                }}
                className=" group flex text-stone-600 w-full items-center rounded-md px-2 py-2 text-sm hover:bg-slate-100 gap-3"
              >
                <AiTwotoneInfoCircle size={22}/>Details
              </button>
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>

          <div className=" sm:grid-cols-2 gap-2 ">
            {/* <div className="ml-4 flex">
              <div>
                <GrLocationPin size={23} />
              </div>
              <div className="ml-2 my-auto  text-[#353C4E] text-sm font-medium">
                {event.eventLocation}
              </div>
            </div> */}
            <div className=" ml-4 flex my-3  items-center">
              <IoLocationOutline size={23} />
              <div className="ml-2 my-auto  text-[#353C4E] text-sm font-medium capitalize">
                {event.eventLocation}
              </div>
            </div>
            <div className="flex ml-4 my-3 ">
              <RxClock size={23} />
              <div className="ml-2 my-auto  text-[#353C4E] text-sm font-medium">
                {event.startTime}
              </div>
            </div>
            <div className="ml-4 flex my-3">
              <IoCalendarNumberOutline size={23} />

              <div className=" ml-2 my-auto  text-[#353C4E] text-sm font-medium">
                {event.eventStartDate.substring(0, 10)}
              </div>
            </div>
            {/* <div className="flex">
            <Image
              src="/images/admin/Line_up_blue.svg"
              alt="calendar"
              width={35}
              height={40}
            />
            <div className="my-auto  text-[#353C4E] text-sm font-medium">
              {}
            </div>
          </div> */}
          </div>
        </div>

        <div className="flex sm:hidden content-center mb-6">
          <button
            onClick={() => setNotificationModal(true)}
            className=" text-center  bg-[#4E8171] text-white text-sm rounded-2xl px-2 my-auto py-1 ml-4 font-IBM "
          >
            send notification
          </button>
          <button
            onClick={() => {
              setShowDetailsModal(true);
              setIsOpen(true);
            }}
            className=" text-center bg-[#4E8171] text-white text-sm rounded-2xl px-2 py-1 my-auto ml-4 font-IBM "
          >
            details
          </button>
        </div>
      </div>

      {showDetailsModal && (
        <div>
          {" "}
          {isOpen && (
            <Modal setIsOpen={setIsOpen} isOpen={isOpen}>
              <Dialog.Title
                as="h3"
                className="text-lg font-medium flex justify-between leading-6 text-gray-900"
              >
                Event Details
                
              <MdCancel size={24} className="hover:cursor-pointer mr-3" onClick={() => setIsOpen(false)}/>
              </Dialog.Title>
              <div className="flex flex-col h-72 overflow-y-auto px-8 py-8">
                <div className="flex flex-row gap-2 justify-center">
                  <div className="flex flex-col space-y-2 mr-4">
                    {" "}
                    <h2>Organization Name </h2>
                    <div className="font-underlined border-b border-gray-400 text-gray-500">
                      {" "}
                      {event.eventName}
                    </div>
                  </div>

                  <Image
                    src={event.dashboardImage as string}
                    alt={event.eventName}
                    width={200}
                    height={200}
                  />
                </div>
                <div className="flex flex-col space-y-4 ml-8 mt-4 ">
                  <div className="flex flex-col space-y-1">
                    {" "}
                    <h2>Start Date</h2>
                    <div className="font-underlined border-b border-gray-400 text-gray-500">
                      {" "}
                      {event.eventStartDate}
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1">
                    {" "}
                    <h2>Location</h2>
                    <div className="font-underlined border-b border-gray-400 text-gray-500 max-w-48 overflow-ellipsis overflow-hidden">
                      {" "}
                      {event.location}
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1">
                    {" "}
                    <h2>Income</h2>
                    <div className="font-underlined border-b border-gray-400 text-gray-500">
                      {" "}
                      {event.income}
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1">
                    {" "}
                    <h2>Status</h2>
                    <div className="font-underlined border-b border-gray-400 text-gray-500">
                      {" "}
                      {event.isPublished}
                    </div>
                  </div>
                </div>
              </div>

              
            </Modal>
          )}
        </div>
      )}
      {notificationModal && (
        <Modal setIsOpen={setNotificationModal} isOpen={notificationModal}>
          <Dialog.Title
            as="h3"
            className="text-lg font-medium leading-6 text-gray-900"
          >
            Send Notification
          </Dialog.Title>
          <div className="flex flex-col h-fit">
            Do you want to send notifications to registerd users?
          </div>

          <div className="mt-4 flex gap-2">
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              Send notification
            </button>
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              onClick={() => setNotificationModal(false)}
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
