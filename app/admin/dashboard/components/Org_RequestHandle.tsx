import Image from "next/image";
import React, { Fragment, useState } from "react";
import Modal from "@/components/Modal";
import DetailsModalContent from "./modals/DetailsModal";
import AllowModalContent from "./modals/AllowModal";
import DenyModalContent from "./modals/DenyModal";
import axios from "axios";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { useAdmin } from "../AdminContextFile";
import { CgDetailsMore } from "react-icons/cg";
import { BiCommentDetail } from "react-icons/bi";

import { OrganizationType } from "@/app/Type";
import Modall from "@/components/Modal";
// import { Dialog } from "@headlessui/react";
import { useParams } from "next/navigation";
import { FetchPost } from "@/hooks/useFetch";
import { error, success } from "@/util/Toastify";
import WidthChangeModal from "@/components/WidthChangeModal";
import { IoPencilOutline } from "react-icons/io5";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { HiOutlineDotsVertical } from "react-icons/hi";

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
  // const [showDetailsModal, setShowDetailsModal] = useState(false);
  // const [showAllowModal, setShowAllowModal] = useState(false);
  // const [showDenyModal, setShowDenyModal] = useState(false);
  const [comment, setComment] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [commentModal, setCommentModal] = useState<boolean>(false);
  const [showDetailsModal, setShowDetailsModal] = useState<boolean>(false);
  const [showAllowModal, setShowAllowModal] = useState<boolean>(false);
  const [showDenyModal, setShowDenyModal] = useState<boolean>(false);

  const addComment = async () => {
    try {
      const data = {
        organizationName: organization.organizationName,
        comment: comment,
        senderId: organization._id,
        email: organization.email,
      };

      const res = await FetchPost({
        endpoint: `notification/getAllNotifications`,
        body: data,
      });
      if (!res) {
        error("Failed to save");
        return;
      }
      setCommentModal(false);
      success("Messsage sent successfully");
    } catch (error) {
      console.error("Error saving settings:", error);
    }
  };
  const handleAllow = async () => {
    try {
      allowNotification();

      const allowOrgRes = await axios.put(
        `${process.env.NEXT_PUBLIC_URL}/api/v1/organization/updateOrganization/${organization._id}`,
        {
          isActive: true,
        }
      );

      if (allowOrgRes.status !== 200) {
        // error("Failed to Allow the organization");
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
        // error("Failed to send email to the organization");
        return;
      }
    } catch (error) {
      console.error("Error updating......", error);
    }
  };
  const allowNotification = async () => {
    try {
      const data = {
        topic: "Congratulations",
        comment: `${organization.organizationName} is accepted`,
        email: organization.email,
      };

      const res = await FetchPost({
        endpoint: `notification/getAllNotifications`,
        body: data,
      });
      if (!res) {
        error("Failed to save");
        return;
      }
      success("Messsage sent successfully");
    } catch (error) {
      console.error("Error saving settings:", error);
    }
  };
  const denyNotification = async () => {
    try {
      const data = {
        topic: "Alert",
        comment: `${organization.organizationName} is rejected`,
        email: organization.email,
      };

      const res = await FetchPost({
        endpoint: `notification/getAllNotifications`,
        body: data,
      });
      if (!res) {
        error("Failed to save");
        return;
      }
      success("Messsage sent successfully");
    } catch (error) {
      console.error("Error saving settings:", error);
    }
  };

  return (
    <div className="flex flex-col w-fit p-4 mx-4 bg-white shadow-md hover:shadow-lg border-2 rounded-2xl mb-3">
      <div className="flex items-center">
        <div className="flex items-center">
          <Image
            src={organization.postImageLink}
            alt="image2"
            width={249.64}
            height={124.5}
            className="w-16 h-16 rounded-2xl p-3 border border-slate-200  bg-slate-100"
          />
          <div className="flex flex-col ml-3">
            {organization.organizationName}
          </div>
        </div>

        <button
          onClick={() => {
            setShowDetailsModal(false);
            setShowDenyModal(false);
            setShowAllowModal(true);
            setIsOpen(true);
          }}
          className="ml-10 bg-green-500 px-5  py-2 text-sm shadow-sm hover:shadow-lg font-medium  border-2 border-green-500 text-white rounded-full"
        >
          Allow
        </button>
        <button
          onClick={() => {
            setShowDetailsModal(false);
            setShowAllowModal(false);
            setShowDenyModal(true);
            setIsOpen(true);
          }}
          className="ml-5 bg-red-500 px-5  py-2 text-sm shadow-sm hover:shadow-lg font-medium  border-2 border-red-500 text-white rounded-full"
        >
          Deny
        </button>
        <button>
          <Menu as="div" className="relative inline-block text-left mr-4">
            <div className="mx-5">
              <Menu.Button className=" inline-flex hover:bg-slate-200 hover:text-black justify-center items-center w-full  rounded-full  px-1 py-1 text-sm font-medium text-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                <HiOutlineDotsVertical className=" rotate-90" size={25} />
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
              <Menu.Items className="absolute mt-0 mr-8 right-0  w-56  divide-gray-100 rounded-md bg-slate-500 shadow-lg ring-1 ring-black/5 focus:outline-none ">
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        onClick={() => {
                          setShowAllowModal(false);
                          setShowDenyModal(false);
                          setShowDetailsModal(true);
                          setIsOpen(true);
                        }}
                        className={`${
                          active
                            ? "bg-custom-orange text-white"
                            : "text-gray-900"
                        } group flex w-full text-white items-center rounded-md p-1 text-sm`}
                      >
                        <div>
                          <CgDetailsMore size={18} />
                        </div>
                        <div>
                          <button
                            className={`${
                              active
                                ? "bg-custom-orange text-white"
                                : "text-gray-900"
                            } group flex w-full text-white items-center rounded-md px-2 py-2 text-sm `}
                          >
                            Show Details
                          </button>
                        </div>
                      </div>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    <div
                      onClick={() => setCommentModal(true)}
                      className={`group flex w-full hover:bg-custom-orange text-white items-center rounded-md p-1 text-sm`}
                    >
                      <div>
                        <BiCommentDetail size={18} />
                      </div>
                      <div>
                        <button
                          className={`group flex w-full hover:bg-custom-orange text-white items-center rounded-md px-2 py-2 text-sm`}
                        >
                          Comment
                        </button>
                      </div>
                    </div>
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </button>
      </div>
      {commentModal && (
        <Modall setIsOpen={setCommentModal} isOpen={commentModal}>
          <Dialog.Title
            as="h3"
            className="text-lg font-medium rounded-xl leading-6 text-gray-900 "
          >
            Your comment
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              If you deny this organization please tell why you deny this
              organization
            </p>
            <textarea
              id="comment"
              onChange={(e: any) => setComment(e.target.value)}
              rows={6}
              className="border-none border-b border-black w-full text-sm rounded-md rounded-t-none p-1 my-2"
              placeholder="Write a comment..."
              required
            ></textarea>
          </div>

          <div className="mt-4 flex gap-2">
            <button
              type="submit"
              onClick={addComment}
              className="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              Send comment
            </button>
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              onClick={() => setCommentModal(false)}
            >
              Cancel
            </button>
          </div>
        </Modall>
      )}
      {showDetailsModal && (
        <div>
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
                  className="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
                  onClick={() => {
                    handleAllow();
                    denyNotification();
                  }}
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

    // <div>
    //   <div className="mt-12 xl:ms-5 grid border-slate-500 border-b-2  border-2 grid-cols-12  w-full md:w-[500px] lg:w-[679px] h-fit sm:h-32 rounded-lg shadow-3xl mb-2  ">
    //     <div className="sm:col-span-5 col-span-full h-full overflow-hidden rounded-lg">
    //       <Image
    //         src={organization.postImageLink}
    //         alt="image2"
    //         width={249.64}
    //         height={124.5}
    //         className="shadow-xl  border-slate-500 w-full h-[110px] md:w-[300px] lg:w-[249.65px] md:h-[124.5px]"
    //       />
    //     </div>
    //     <div className="grid grid-rows-2 col-span-7">
    //       <div className="flex items-center my-3">
    //         <div className="w-full text-[#353535] capitalize font-sans text-xl font-bold">
    //           {organization.organizationName}
    //         </div>
    //         <div className="mx-6">
    //           {/* <button
    //             onClick={() => {
    //               setShowAllowModal(false);
    //               setShowDenyModal(false);
    //               setShowDetailsModal(true);
    //               setIsOpen(true);
    //             }}
    //             className="px-4 py-2 ml-auto bg-[#4E8171] rounded-xl text-white font-medium"
    //           >
    //             Details
    //           </button> */}
    //         </div>
    //       </div>

    //       {/* <div className="flex items-center my-2 gap-9">
    //         <button
    //           onClick={() => {
    //             setShowDetailsModal(false);
    //             setShowDenyModal(false);
    //             setShowAllowModal(true);
    //             setIsOpen(true);
    //           }}
    //           className="px-4 py-2 mr-4 hover:bg-green-800 bg-green-600 rounded-lg text-white font-medium"
    //         >
    //           Allow
    //         </button>
    //         <button
    //           onClick={() => {
    //             setShowDetailsModal(false);
    //             setShowAllowModal(false);
    //             setShowDenyModal(true);
    //             setIsOpen(true);
    //           }}
    //           className="px-4 py-2 hover:bg-red-800 bg-red-600 rounded-lg text-white font-medium"
    //         >
    //           Deny
    //         </button>
    //         <button
    //           onClick={() => setCommentModal(true)}
    //           className="px-4 py-2 ml-4 hover:bg-slate-800 bg-slate-500 rounded-lg text-white font-medium whitespace-nowrap"
    //         >
    //           Add comment
    //         </button>
    //       </div> */}
    //     </div>
    //   </div>

    //   {commentModal && (
    //     <Modall setIsOpen={setCommentModal} isOpen={commentModal}>
    //       <Dialog.Title
    //         as="h3"
    //         className="text-lg font-medium rounded-xl leading-6 text-gray-900 "
    //       >
    //         Your comment
    //       </Dialog.Title>
    //       <div className="mt-2">
    //         <p className="text-sm text-gray-500">
    //           If you deny this organization please tell why you deny this
    //           organization
    //         </p>
    //         <textarea
    //           id="comment"
    //           onChange={(e: any) => setComment(e.target.value)}
    //           rows={6}
    //           className="border-none border-b border-black w-full text-sm rounded-md rounded-t-none p-1 my-2"
    //           placeholder="Write a comment..."
    //           required
    //         ></textarea>
    //       </div>

    //       <div className="mt-4 flex gap-2">
    //         <button
    //           type="submit"
    //           onClick={addComment}
    //           className="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
    //         >
    //           Send comment
    //         </button>
    //         <button
    //           type="button"
    //           className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
    //           onClick={() => setCommentModal(false)}
    //         >
    //           Cancel
    //         </button>
    //       </div>
    //     </Modall>
    //   )}
    // {showDetailsModal && (
    //   <div>
    //     {isOpen && (
    //       <WidthChangeModal setIsOpen={setIsOpen} isOpen={isOpen}>
    //         <Dialog.Title
    //           as="h3"
    //           className="text-lg font-medium leading-6 text-gray-900"
    //         >
    //           Organization Details
    //         </Dialog.Title>
    //         <div className="flex lg:flex-row flex-col  h-72 overflow-y-auto px-8 py-8">
    //           <div className="flex flex-row gap-2 justify-center">
    //             <Image
    //               src={organization.postImageLink}
    //               alt={organization.organizationName}
    //               width={200}
    //               height={200}
    //             />
    //           </div>

    //           <div className="flex flex-col space-y-4 ml-8 mt-4 w-96 gap-7">
    //             <div className="flex md:flex-row flex-col md:gap-0 gap-4 justify-between mr-8">
    //               <div className="flex flex-col space-y-2 mr-4">
    //                 {" "}
    //                 <h2 className="font-bold">Organization Name </h2>
    //                 <div className="font-underlined border-b border-gray-400 text-gray-800">
    //                   {" "}
    //                   {organization.organizationName}
    //                 </div>
    //               </div>
    //               <div className="flex flex-col space-y-1">
    //                 {" "}
    //                 <h2 className="font-bold">Phone number</h2>
    //                 <div className="font-underlined border-b border-gray-400 text-gray-800 ">
    //                   {" "}
    //                   {organization.phoneNumber}
    //                 </div>
    //               </div>
    //             </div>
    //             <div className="flex md:flex-row flex-col md:gap-0 gap-4 justify-between mr-8">
    //               <div className="flex flex-col space-y-1">
    //                 {" "}
    //                 <h2 className="font-bold">Address</h2>
    //                 <div className="font-underlined border-b border-gray-400 text-gray-800 max-w-48 overflow-ellipsis overflow-hidden ">
    //                   {" "}
    //                   {organization.address}
    //                 </div>
    //               </div>
    //               <div className="flex flex-col space-y-1">
    //                 {" "}
    //                 <h2 className="font-bold">Company Name</h2>
    //                 <div className="font-underlined border-b border-gray-400 text-gray-800 ">
    //                   {" "}
    //                   {organization.companyName}
    //                 </div>
    //               </div>
    //             </div>
    //             <div className="flex flex-col space-y-1">
    //               {" "}
    //               <h2 className="font-bold">Founded</h2>
    //               <div className="font-underlined border-b border-gray-400 text-gray-800 ">
    //                 {" "}
    //                 {organization.fullName}
    //               </div>
    //             </div>
    //           </div>
    //         </div>

    //         <div className="mt-4 flex gap-2">
    //           <button
    //             type="button"
    //             className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
    //             onClick={() => setIsOpen(false)}
    //           >
    //             Cancel
    //           </button>
    //         </div>
    //       </WidthChangeModal>
    //     )}
    //   </div>
    // )}

    // {showAllowModal && (
    //   <div>
    //     {" "}
    //     {isOpen && (
    //       <Modal setIsOpen={setIsOpen} isOpen={isOpen}>
    //         <Dialog.Title
    //           as="h3"
    //           className="text-lg font-medium leading-6 text-gray-900"
    //         >
    //           Confirm Allowing
    //         </Dialog.Title>
    //         <div className="mt-2">
    //           <p className="text-sm text-gray-500">
    //             Are you sure you want to allow this organization ? Clicking
    //             "Allow" will give all the rights in eventsNow to this
    //             organization.
    //           </p>
    //         </div>

    //         <div className="mt-4 flex gap-2">
    //           <button
    //             type="button"
    //             className="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
    //             onClick={handleAllow}
    //           >
    //             Allow
    //           </button>
    //           <button
    //             type="button"
    //             className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
    //             onClick={() => setIsOpen(false)}
    //           >
    //             Cancel
    //           </button>
    //         </div>
    //       </Modal>
    //     )}
    //   </div>
    // )}

    // {showDenyModal && (
    //   <div>
    //     {" "}
    //     {isOpen && (
    //       <Modal setIsOpen={setIsOpen} isOpen={isOpen}>
    //         <Dialog.Title
    //           as="h3"
    //           className="text-lg font-medium leading-6 text-gray-900"
    //         >
    //           Confirm Denying
    //         </Dialog.Title>
    //         <div className="mt-2">
    //           <p className="text-sm text-gray-500">
    //             Are you sure you want to Deny this organization ? Clicking
    //             "Deny" will remove this organization from EventsNow.
    //           </p>
    //         </div>

    //         <div className="mt-4 flex gap-2">
    //           <button
    //             type="button"
    //             className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
    //             onClick={() => {
    //               handleAllow();
    //               denyNotification();
    //             }}
    //           >
    //             Deny
    //           </button>
    //           <button
    //             type="button"
    //             className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
    //             onClick={() => setIsOpen(false)}
    //           >
    //             Cancel
    //           </button>
    //         </div>
    //       </Modal>
    //     )}
    //   </div>
    // )}
    // </div>
  );
}
