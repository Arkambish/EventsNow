"use client";
import React from "react";
import { useState } from "react";

import TicketDetailmodalContent from "./modals/TicketDetailModal";
import Image from "next/image";
import WidthChangeModal from "@/components/WidthChangeModal";
import { Dialog } from "@headlessui/react";
import Modal from "@/components/Modal";

export default function GetTicketDatils() {
  const [showTicketDetail, setTicketDetail] = useState<boolean>(false);

  return (
    <div className=" justify-items-start flex ">
      <button
        onClick={() => setTicketDetail(true)}

        className="flex button mt-8 bg-dashBtnBlue text-white rounded-md items-center  px-4 py-2 gap-2   "

      >
        <Image
          src="/images/eventDash/icons8-new-ticket.png"
          width={23}
          height={23}
          alt="Picture of the author"
        />

        <div className="font-medium  text-md text-white text-center leading-tight mx-auto ">
          Create tickets
        </div>
      </button>

      {showTicketDetail && (
        <Modal isOpen={showTicketDetail} setIsOpen={setTicketDetail}>
          <Dialog.Title
            as="h3"
            className="text-lg font-medium leading-6 text-gray-900"
          >
            Enter Ticket Details
          </Dialog.Title>
          <TicketDetailmodalContent setTicketDetail={setTicketDetail} />

          <div className="mt-4 flex gap-2">
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              onClick={() => setTicketDetail(false)}
            >
              Cancel
            </button>
          </div>
        </Modal>

        // <Modal title="Ticket Details" onClose={() => setTicketDetail(false)}>
        //   <TicketDetailmodalContent setTicketDetail={setTicketDetail} />
        // </Modal>
      )}
    </div>
  );
}
