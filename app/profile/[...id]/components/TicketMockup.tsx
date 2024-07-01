"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  EventContextType,
  UseEventContext,
} from "../../../event/dashboard/[id]/EventDashContext";
import { error, success } from "@/util/Toastify";
import { FiPlusCircle } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { Dialog, Menu, Transition } from "@headlessui/react";
import Modal from "@/components/Modal";

interface TicketMockupProps {
  image: string;
  type: string;
  price: number;
  id: string;
}

export default function TicketMockup({
  image,
  type,
  price,
  id,
}: TicketMockupProps) {
  const { allTickets, setAllTickets } = UseEventContext() as EventContextType;
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  async function deleteTicket() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/v1/ticket/UserTicketDelete/${id}`,
      {
        method: "DELETE",
      }
    );
    if (!res.ok) {
      error("Failed to delete ticket");
      return;
    }
    success("Ticket deleted successfully");
    setDeleteModal(false);
    //allTickets.filter((ticket) => ticket._id !== id);
  }

  return (
    <div className=" rounded-[10px] border-2  border-[#E2E2E2] pb-4 mx-2  ">
      <div className=" w-64 h-60 p-4  object-cover">
        <Image
          src={image}
          width={250}
          height={250}
          alt="Picture of ticket"
          className="rounded-xl shadow-md"
        />
      </div>
      <div className="px-4 flex space-x-12">
        <div className="space-y-2">
          <div className="text-black text-xl font-bold text-start">{type}</div>
          <div className="text-black text-base text-start font-normal ">
            Rs {price} /=
          </div>
        </div>

        {/* <div className="space-y-2 pt-2">
          <button
            className="w-24 rounded border-[1px] border-[#A23434] px-2 my-auto text-sm font-semibold text-[#A23434] flex  gap-2 "
            onClick={() => {
              setDeleteModal(true);
              setIsOpen(true);
            }}
          >
            <div className="py-1">
              <MdDeleteOutline />
            </div>
            Remove
          </button>
        </div> */}
      </div>
      {/* {deleteModal && (
        <Modal setIsOpen={setDeleteModal} isOpen={deleteModal}>
          <Dialog.Title
            as="h3"
            className="text-lg font-medium leading-6 text-gray-900"
          >
            Confirm Deleting
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Are you sure you want to Delete this ?
            </p>
          </div>

          <div className="mt-4 flex gap-2">
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              onClick={deleteTicket}
            >
              Delete
            </button>
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              onClick={() => setDeleteModal(false)}
            >
              Cancel
            </button>
          </div>
        </Modal>
      )} */}
    </div>
  );
}
