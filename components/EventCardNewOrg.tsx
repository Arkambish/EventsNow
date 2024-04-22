import Image from "next/image";
import React, { useState, useEffect } from "react";
import { SlCalender } from "react-icons/sl";
import { FaClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { z } from "zod";
import Modal from "@/components/Modal";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { EventType } from "@/app/Type";
import { FetchPost } from "@/hooks/useFetch";
import { success, error } from "@/util/Toastify";

interface eventorg {
  event: EventType;
}

export default function EventCardNewOrg({ event }: eventorg) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [notificationModal, setNotificationModal] = useState<boolean>(false);

  const sendNotification = async () => {
    try {
      const data = {
        topic: "Event reminder",
        comment: `${
          event.eventName
        } will be started on ${event.eventStartDate.substring(
          0,
          10
        )}. be ready for the excitement`,
        userIds: event.registerUser,
      };

      const notifyUser = await FetchPost({
        endpoint: `notification/postNotificationById`,
        body: data,
      });
      if (!notifyUser) {
        error("error in sending notification");
      }

      success("Notification sent successfully");
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div>
      <div className=" bg-[#D9D9D9] my-4 ml-4 mr-12 rounded-xl border-spacing-1 shadow-lg grid lg:grid-cols-3 overflow-hidden">
        <div
          className="lg:rounded-l-xl overflow-hidden bg-no-repeat bg-cover bg-center h-40 "
          style={{ backgroundImage: `url(${event.dashboardImage as string})` }}
        ></div>
        <div className="lg:col-span-2 rounded-r-xl pt-1">
          <div className="  flex justify-between px-6">
            <div className=" my-2 text-[#353535] font-semibold sm:font-bold text-lg sm:text-24">
              {event.eventName}
            </div>
            <div className="flex max-sm:hidden content-center">
              <button
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
              </button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-2 mb-4">
            <div className="ml-4 flex">
              <Image
                src="/images/admin/Pin_fill_blue.svg"
                alt="calendar"
                width={35}
                height={40}
              />
              <div className="ml-2 my-auto  text-[#353C4E] text-sm font-medium">
                {event.location}
              </div>
            </div>
            <div className="flex ml-4 sm:ml-0">
              <Image
                src="/images/admin/Clock_fill_blue.svg"
                alt="calendar"
                width={31}
                height={40}
              />
              <div className="ml-2 my-auto  text-[#353C4E] text-sm font-medium">
                {event.startTime}
              </div>
            </div>
            <div className="ml-4 flex">
              <Image
                src="/images/admin/Date_range_light_blue.svg"
                alt="calendar"
                width={35}
                height={40}
              />
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
                className="text-lg font-medium leading-6 text-gray-900"
              >
                Event Details
              </Dialog.Title>
              <div className="flex flex-col h-72 overflow-y-auto px-8 py-8">
                <div className="flex flex-row gap-2 justify-center">
                  <div className="flex flex-col space-y-2 mr-4">
                    {" "}
                    <h2>Organization Name </h2>
                    <div className="font-underlined border-b border-gray-400 text-gray-300">
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
                    <div className="font-underlined border-b border-gray-400 text-gray-300">
                      {" "}
                      {event.eventStartDate}
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1">
                    {" "}
                    <h2>Location</h2>
                    <div className="font-underlined border-b border-gray-400 text-gray-300 max-w-48 overflow-ellipsis overflow-hidden">
                      {" "}
                      {event.location}
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1">
                    {" "}
                    <h2>Income</h2>
                    <div className="font-underlined border-b border-gray-400 text-gray-300">
                      {" "}
                      {event.income}
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1">
                    {" "}
                    <h2>Status</h2>
                    <div className="font-underlined border-b border-gray-400 text-gray-300">
                      {" "}
                      {event.isPublished}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
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
              onClick={() => sendNotification()}
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
