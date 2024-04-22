import Image from "next/image";
import React, { useState } from "react";
import Modal from "./ModalContext";
import DetailsModalContent from "./modals/DetailsModal";
import AllowModalContent from "./modals/AllowModal";
import DenyModalContent from "./modals/DenyModal";
import { OrganizationType } from "@/app/Type";
import Modall from "@/components/Modal";
import { Dialog } from "@headlessui/react";
import { useParams } from "next/navigation";
import { FetchPost } from "@/hooks/useFetch";
import { error, success } from "@/util/Toastify";

interface OrgRequestHandleProps {
  organization: OrganizationType;
}

export default function Org_RequestHandle({
  organization,
}: OrgRequestHandleProps) {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showAllowModal, setShowAllowModal] = useState(false);
  const [showDenyModal, setShowDenyModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [comment, setComment] = useState("");

  const addComment = async () => {
    try {
      const data = {
        organizationName: organization.organizationName,
        comment: comment,
        senderId: organization._id,
        email: organization.email,
      };

      const res = FetchPost({
        endpoint: `notification/getAllNotifications`,
        body: data,
      });
      if (!res) {
        error("Failed to save");
        return;
      }
      setComment("");
      success("Messsage sent successfully");
    } catch (error) {
      console.error("Error saving settings:", error);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-12  m-4 w-[250px] md:w-[500px] lg:w-[679px] h-96 sm:h-32 rounded-lg bg-navWhite shadow-3xl">
        <div className="sm:col-span-5 col-span-full overflow-hidden rounded-lg">
          <Image
            src={organization.postImageLink}
            alt="image2"
            width={249.64}
            height={126}
            className="shadow-xl  w-[300px] lg:w-[249.65px] md:w-[200px] h-[128px]"
          />
        </div>
        <div className="grid grid-rows-2 col-span-7 ">
          <div className="flex sm:items-center items-around sm:mt-0 mt-4">
            <div className="w-12 sm:w-48 text-[#353535] underline capitalize font-sans text-2xl font-bold ms-2 sm:ms-0">
              {organization.organizationName}
            </div>
            <button
              onClick={() => setShowDetailsModal(true)}
              className="w-fit h-fit rounded-2xl bg-[#4E8171] ml-auto lg:ml-20 md:ml-3"
            >
              <div className="justify-center p-2 text-white text-sans font-medium">
                Details
              </div>
            </button>
          </div>

          <div className="flex flex-row mt-2 sm:mt-2 sm:ms-0 md:ms-4 lg:ms-0">
            <button
              onClick={() => setShowAllowModal(true)}
              className="w-fit h-fit rounded-xl bg-[#3C9313] ms-2 sm:ms-0"
            >
              <div className="justify-center text-white text-sans font-small p-2">
                Allow
              </div>
            </button>
            <button
              onClick={() => setShowDenyModal(true)}
              className="w-fit h-fit rounded-xl bg-[#B63535] ml-12 sm:ml-10 "
            >
              <div className="justify-center text-white text-sans font-small p-2">
                Deny
              </div>
            </button>
            <button
              onClick={() => setIsOpen(true)}
              className="w-fit h-fit rounded-xl bg-[#ee8a3d] ml-12 sm:ml-10 "
            >
              <div className="justify-center  text-white text-sans font-small whitespace-nowrap p-2 hover:bg-orange-500 hover:rounded-xl">
                Add comment
              </div>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <Modall setIsOpen={setIsOpen} isOpen={isOpen}>
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
              value={comment}
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
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
          </div>
        </Modall>
      )}
      {showDetailsModal && (
        <Modal title="Details" onClose={() => setShowDetailsModal(false)}>
          <DetailsModalContent organization={organization} />
        </Modal>
      )}

      {showAllowModal && (
        <Modal title="Allow" onClose={() => setShowAllowModal(false)}>
          <AllowModalContent organization={organization} />
        </Modal>
      )}
      {showDenyModal && (
        <Modal title="Deny" onClose={() => setShowDenyModal(false)}>
          <DenyModalContent organization={organization} />
        </Modal>
      )}
    </div>
  );
}
