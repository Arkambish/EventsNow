import Image from "next/image";
import React, { useState } from "react";
import Modal from "@/components/Modal";
import DetailsModalContent from "./modals/DetailsModal";
import AllowModalContent from "./modals/AllowModal";
import DenyModalContent from "./modals/DenyModal";
import axios from "axios";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { useAdmin } from "../AdminContextFile";
import { success } from "@/util/Toastify";
import { error } from "@/util/Toastify";
import { OrganizationType } from "@/app/Type";

interface Data {
  organization: OrganizationType;
}

type ContextData = {
  setOrganization: React.Dispatch<React.SetStateAction<OrganizationType[]>>;
  setNotification: React.Dispatch<React.SetStateAction<OrganizationType[]>>;
  notification: OrganizationType[];
};

interface OrgRequestHandleProps {
  organization: OrganizationType;
}

export default function Org_RequestHandle({
  organization,
}: OrgRequestHandleProps) {
  const { setOrganization, setNotification, notification } =
    useAdmin() as ContextData;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showDetailsModal, setShowDetailsModal] = useState<boolean>(false);
  const [showAllowModal, setShowAllowModal] = useState<boolean>(false);
  const [showDenyModal, setShowDenyModal] = useState<boolean>(false);

  const handleAllow = async () => {
    try {
      const allowOrgRes = await axios.put(
        `${process.env.NEXT_PUBLIC_URL}/api/v1/organization/updateOrganization/${organization._id}`,
        {
          isActive: true,
        }
      );

      if (allowOrgRes.status !== 200) {
        error("Failed to Allow the organization");
        return;
      }

      const newNotification = notification.filter(
        (org) => org._id !== organization._id
      );

      success("Organization Allowed successfully");
      setNotification(newNotification); // Remove approved organization from the notification list
      setOrganization((prev: OrganizationType[]) => [...prev, organization]); // Add approved organization to the organization list

      const sendEmailRes = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/api/v1/organization/organizationAproveEmail`,
        {
          email: organization.email,
          name: organization.organizationName,
        }
      );

      if (sendEmailRes.status !== 200) {
        error("Failed to send email to the organization");
        return;
      }
    } catch (error) {
      console.error("Error updating......", error);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-12  m-4 w-[250px] md:w-[500px] lg:w-[679px] h-96 sm:h-32 rounded-lg bg-[#D9D9D9] shadow-3xl">
        <div className="sm:col-span-5 col-span-full overflow-hidden rounded-lg">
          <Image
            src={organization.postImageLink}
            alt="image2"
            width={249.64}
            height={126}
            className="shadow-xl  w-[300px] lg:w-[249.65px] md:w-[200px] h-[128px]"
          />
        </div>
        <div className="grid grid-rows-2 col-span-7">
          <div className="flex sm:items-center items-around sm:mt-0 mt-4">
            <div className="w-12 sm:w-48 text-[#353535] font-sans text-2xl font-bold ms-2 sm:ms-0">
              {organization.organizationName}
            </div>
            <button
              onClick={() => {
                setShowAllowModal(false);
                setShowDenyModal(false);
                setShowDetailsModal(true);
                setIsOpen(true);
              }}
              className="w-20 h-[30px] rounded-3xl bg-[#4E8171] ml-24 lg:ml-20 md:ml-3"
            >
              <div className="justify-center  text-white text-sans font-medium">
                Details
              </div>
            </button>
          </div>

          <div className="flex flex-row mt-4 sm:mt-2 sm:ms-0 md:ms-4 lg:ms-0 xl:ms-0">
            <button
              onClick={() => {
                setShowDetailsModal(false);
                setShowAllowModal(true);
                setIsOpen(true);
              }}
              className="w-20 h-[30px] rounded-3xl bg-[#3C9313] ms-2 sm:ms-0"
            >
              <div className="justify-center text-white text-sans font-medium">
                Allow
              </div>
            </button>
            <button
              onClick={() => {
                setShowDetailsModal(false);
                setShowDenyModal(true);
                setIsOpen(true);
              }}
              className="w-20 h-[30px] rounded-3xl bg-[#B63535] ml-12 sm:ml-10 "
            >
              <div className="justify-center text-white text-sans font-medium ">
                Deny
              </div>
            </button>
          </div>
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
                Organization Details
              </Dialog.Title>
              <div className="flex flex-col h-72 overflow-y-auto px-8 py-8">
                <div className="flex flex-row gap-2 justify-center">
                  <div className="flex flex-col space-y-2 mr-4">
                    {" "}
                    <h2>Organization Name </h2>
                    <div className="font-underlined border-b border-gray-400 text-gray-300">
                      {" "}
                      {organization.organizationName}
                    </div>
                  </div>

                  <Image
                    src={organization.postImageLink}
                    alt={organization.organizationName}
                    width={200}
                    height={200}
                  />
                </div>
                <div className="flex flex-col space-y-4 ml-8 mt-4 ">
                  <div className="flex flex-col space-y-1">
                    {" "}
                    <h2>Phone number</h2>
                    <div className="font-underlined border-b border-gray-400 text-gray-300">
                      {" "}
                      {organization.phoneNumber}
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1">
                    {" "}
                    <h2>Address</h2>
                    <div className="font-underlined border-b border-gray-400 text-gray-300 max-w-48 overflow-ellipsis overflow-hidden">
                      {" "}
                      {organization.address}
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1">
                    {" "}
                    <h2>Company Name</h2>
                    <div className="font-underlined border-b border-gray-400 text-gray-300">
                      {" "}
                      {organization.companyName}
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1">
                    {" "}
                    <h2>Founded</h2>
                    <div className="font-underlined border-b border-gray-400 text-gray-300">
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
            </Modal>
          )}
        </div>
      )}

      {showAllowModal && (
        <div>
          {" "}
          {isOpen && (
            <Modal setIsOpen={setIsOpen} isOpen={isOpen}>
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                Confirm Allowing
              </Dialog.Title>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Are you sure you want to allow this organization ? Clicking
                  "Allow" will give all the rights in eventsNow to this
                  organization.
                </p>
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  onClick={handleAllow}
                >
                  Allow
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
                  onClick={handleAllow}
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
