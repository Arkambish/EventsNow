"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "@/components/Modal";
import DetailsModalContent from "@/app/admin/dashboard/components/modals/DetailsModal";
import DenyModalContent from "./modals/DenyModal";
import { OrganizationType } from "@/app/Type";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { useAdmin } from "../AdminContextFile";
import { success } from "@/util/Toastify";
import { error } from "@/util/Toastify";
import WidthChangeModal from "@/components/WidthChangeModal";
import { FetchGet, FetchPost } from "@/hooks/useFetch";

interface Data {
  organization: OrganizationType;
}

type ContextData = {
  setOrganization: React.Dispatch<React.SetStateAction<OrganizationType[]>>;
  setNotification: React.Dispatch<React.SetStateAction<OrganizationType[]>>;
  notification: OrganizationType[];
};

interface Available_Orgs {
  organization: OrganizationType;
}

export default function Available_Orgs({ organization }: Available_Orgs) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showDetailsModal, setShowDetailsModal] = useState<boolean>(false);
  const [showDenyModal, setShowDenyModal] = useState<boolean>(false);
  const [totalRegisteredUsersCount, setTotalRegisteredUsersCount] = useState(0);
  const [events, setEvents] = useState([]);
  const { setOrganization, setNotification, notification } =
    useAdmin() as ContextData;
  const handleDeny = async () => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_URL}/api/v1/organization/denyOrganization/${organization._id}`,
        {
          isActive: false,
        }
      );

      const updatedNotifications = [...notification, organization];
      success("Organization Denied successfully");
      setNotification(updatedNotifications); // Add denied organization to the notification list
      setOrganization((prev: OrganizationType[]) =>
        prev.filter((org) => org._id !== organization._id)
      ); // Remove denied organization from the organization list
    } catch (error) {
      console.error("Error updating organization:", error);
    }
  };
  const value =
    organization.fullName.length > 10
      ? "w-[250px] md:w-[250px] lg:w-[720px]"
      : "lg:w-[720px] w-72 md:w-[250px]";

  useEffect(() => {
    const getCount = async () => {
      try {
        const getEventResponse = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/v1/organization/getCount/${organization._id}`
        );
        if (!getEventResponse.ok) {
          error("Failed to fetch event data");
        }
        const data = await getEventResponse.json();
        setTotalRegisteredUsersCount(data.totalRegisteredUsersCount);
        setEvents(data.events);
      } catch (e) {
        error("Error fetching event data");
      }
    };
    getCount();
  }, [organization._id]);

  return (
    <div>
      <div
        className={`grid grid-cols-1 lg:grid-cols-11 md:grid-cols-1    ${value} h-auto md:h-auto lg:h-32 rounded-lg bg-[#D9D9D9] mt-6 ms-8 xl:ms-4 lg:ms-8 md:ms-20  shadow-3xl`}
      >
        <div className="col-span-full lg:col-span-3 md:col-span-full overflow-hidden  rounded-lg ">
          <Image
            src={organization.postImageLink}
            alt="compo4"
            width={249.65}
            height={126}
            className="sm:h-32 h-auto"
          />
        </div>

        <div className="col-span-full md:col-span-2 lg:col-span-3 flex justify-center sm:justify-start pl-8 sm:mt-0 md:mt-4 lg:mt-0">
          <div className=" justify-auto flex flex-col  md:justify-center lg:justify-around">
            <div className="flex w-full md:w-1/2  lg:w-full text-[#353535] font-sans text-2xl font-bold mt-2 leading-7  ">
              {organization.organizationName}
            </div>
            <div className="flex flex-col md:flex-col lg:flex-row gap-4 ml-0">
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  setShowDenyModal(true);
                  setIsOpen(true);
                }}
                className=" w-20 h-[30px] rounded-3xl bg-red-600 mt-2 ml-0 md:ml-12 lg:ml-0 "
              >
                <div className="flex justify-center text-white text-sans font-medium ">
                  Deny
                </div>
              </button>
              <button
                onClick={() => {
                  setShowDenyModal(false);
                  setShowDetailsModal(true);
                  setIsOpen(true);
                }}
                className=" w-20 h-[30px] rounded-3xl bg-[#4E8171] mt-2 ml-0 md:ml-12 lg:ml-0 "
              >
                <div className="flex justify-center text-white text-sans font-medium ">
                  Details
                </div>
              </button>
            </div>
          </div>
        </div>

        <div
          className={`col-span-full md:col-span-full lg:col-span-5 mr-3 mb-3 sm:mb-0 ms-3 lg:ms-0 md:ms-0 `}
        >
          <div className="lg:w-64 w-48 md:w-48 lg:h-24 h-28 md:h-28 rounded bg-[#F4F4F4] mt-2 md:mt-4 lg:mt-5 ml-0 md:ml-6 lg:ml-10 mb-0 md:mb-4 lg:mb-0 ">
            <div className="grid grid-cols-12">
              <div className="col-span-8 sm:col-span-8 m-6">
                <div className="text-[#353C4E] font-sans text-sm font-normal leading-4">
                  Number of Events
                </div>
                <div className="text-[#353C4E] font-sans text-sm font-normal leading-4 mt-3">
                  Number of Members
                </div>
              </div>

              <div className="col-span-4 sm:col-span-4 m-6">
                <div className="text-[#353C4E] font-sans text-sm font-bold leading-4 mb-8 md:mb-8 lg:mb-0">
                  {/* {organization.numberofevents} */} {events.length}
                </div>
                <div className="text-[#353C4E] font-sans text-sm font-bold leading-4 mt-6">
                  {/* {organization.numberofmembers} */}
                  {totalRegisteredUsersCount}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showDetailsModal && (
        <div>
          {" "}
          {isOpen && (
            <WidthChangeModal setIsOpen={setIsOpen} isOpen={isOpen}>
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                Organization Details
              </Dialog.Title>
              <div className="flex lg:flex-row flex-col  h-72 overflow-y-auto px-8 py-8">
                <div className="flex flex-row gap-2 justify-center">
                  <Image
                    src={organization.postImageLink}
                    alt={organization.organizationName}
                    width={200}
                    height={200}
                  />
                </div>

                <div className="flex flex-col space-y-4 ml-8 mt-4 w-96 gap-7">
                  <div className="flex md:flex-row flex-col md:gap-0 gap-4 justify-between mr-8">
                    <div className="flex flex-col space-y-2 mr-4">
                      {" "}
                      <h2 className="font-bold">Organization Name </h2>
                      <div className="font-underlined border-b border-gray-400 text-gray-800">
                        {" "}
                        {organization.organizationName}
                      </div>
                    </div>
                    <div className="flex flex-col space-y-1">
                      {" "}
                      <h2 className="font-bold">Phone number</h2>
                      <div className="font-underlined border-b border-gray-400 text-gray-800 ">
                        {" "}
                        {organization.phoneNumber}
                      </div>
                    </div>
                  </div>
                  <div className="flex md:flex-row flex-col md:gap-0 gap-4 justify-between mr-8">
                    <div className="flex flex-col space-y-1">
                      {" "}
                      <h2 className="font-bold">Address</h2>
                      <div className="font-underlined border-b border-gray-400 text-gray-800 max-w-48 overflow-ellipsis overflow-hidden ">
                        {" "}
                        {organization.address}
                      </div>
                    </div>
                    <div className="flex flex-col space-y-1">
                      {" "}
                      <h2 className="font-bold">Company Name</h2>
                      <div className="font-underlined border-b border-gray-400 text-gray-800 ">
                        {" "}
                        {organization.companyName}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1">
                    {" "}
                    <h2 className="font-bold">Founded</h2>
                    <div className="font-underlined border-b border-gray-400 text-gray-800 ">
                      {" "}
                      {organization.fullName}
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
            </WidthChangeModal>
          )}
        </div>
      )}
      {showDenyModal && (
        <div>
          {" "}
          {isOpen && (
            <Modal setIsOpen={setIsOpen} isOpen={isOpen}>
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                Confirm Denying
              </Dialog.Title>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Are you sure you want to Deny this organization ? Clicking
                  "Deny" will remove this organization from EventsNow.
                </p>
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  onClick={handleDeny}
                >
                  Deny
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
      )}
    </div>
  );
}
