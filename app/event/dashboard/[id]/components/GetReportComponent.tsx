"use client";
import React, { useEffect, useRef, useState } from "react";
import ContainerWithStroke from "./ContainerWithStroke";
import Image from "next/image";
import { UseEventContext } from "../EventDashContext";
import { EventContextType } from "../EventDashContext";
import WidthChangeModal from "@/components/WidthChangeModal";
import { Dialog } from "@headlessui/react";
import { FaPrint } from "react-icons/fa6";
import { useReactToPrint } from "react-to-print";
import { useParams } from "next/navigation";
import { Ticket } from "@/app/Type";

interface Props {
  reportName: string;
  image: string;
  linkToDetails: string;
  size: number;
}

export default function GetReportComponent({
  reportName,
  image,
  size,
  linkToDetails,
}: Props) {
  const [attendanceReport, setAttendanceReport] =
    React.useState<boolean>(false);
  const [revenueReport, setRevenueReport] = React.useState<boolean>(false);
  const { setStatus, income, attendances } =
    UseEventContext() as EventContextType;
  const componentpdf = useRef(null);

  function getReport() {
    linkToDetails === "totalAttendence" && setAttendanceReport(true);
    linkToDetails === "totalTicket" && setStatus("attendance");
    linkToDetails === "totalRevenue" && setRevenueReport(true);
  }

  const params = useParams<{ id: string }>();
  const [allTicketTypes, setAllTicketTypes] = useState<Ticket[]>([]);
  const [allSoldTicketTypes, setAllSoldTicketTypes] = useState<any[]>([]);

  const componentRdf = useRef(null);

  const generatePDF = useReactToPrint({
    content: () => componentRdf.current,
    documentTitle: "Revenue Report",
  });

  const generateAttendencePDF = useReactToPrint({
    content: () => componentpdf.current,
    documentTitle: "Attendance Report",
  });
  useEffect(() => {
    async function getTicketData() {
      const res = await fetch(`/api/v1/ticket/getTicket/${params.id}`);
      if (!res.ok) {
        return;
      }
      const data = await res.json();
      setAllTicketTypes(data);
    }
    getTicketData();
  }, [params.id]);

  useEffect(() => {
    async function getSoldTicketData() {
      const res = await fetch(`/api/v1/buyTicket/getBuyTicket/${params.id}`);
      if (!res.ok) {
        return;
      }
      const data = await res.json();
      setAllSoldTicketTypes(data);
    }
    getSoldTicketData();
  }, [params.id]);

  return (
    <ContainerWithStroke>
      <div className="sm:flex justify-between lg:pr-20 pl-4 text-left sm:text-center mb-4">
        <Image
          className="justify-self-center my-3 max-lg:hidden "
          src={`/images/eventDash/${image}.svg`}
          alt="reports "
          width={size}
          height={size}
        />
        <div className="content-center justify-start lg:pl-10 xl:pl-20 grid gap-2 w-full">
          <div className=" text-left text-base text-[#666]">event's</div>
          <div className="text-start  lg:text-lg text-sm text-[#353535] font-semibold">
            {reportName}
          </div>
        </div>
        <button
          className="bg-dashBtnBlue rounded-md py-1 my-auto text-white  text-base font-normal pr-7 mx-6 drop-shadow-md flex "
          onClick={getReport}
        >
          <Image
            className="my-auto mx-2"
            src="/images/eventDash/Print.svg"
            alt="print"
            width={20}
            height={20}
          />
          Print
        </button>
      </div>

      <WidthChangeModal
        isOpen={attendanceReport}
        setIsOpen={setAttendanceReport}
      >
        <Dialog.Title
          as="h3"
          className="text-lg font-medium leading-6 text-gray-900"
        >
          Attendance of the event
        </Dialog.Title>
        <div className="flex flex-col">
          <div className="overflow-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <div className=" h-60 overflow-auto">
                  <div ref={componentpdf} className="w-full ">
                    <table className="w-full text-left text-sm font-light">
                      <thead className="border-b w-full font-medium ">
                        <tr>
                          <th scope="col" className="px-6 py-4">
                            Count
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Time
                          </th>
                          <th scope="col" className="px-6 py-4">
                            UserId
                          </th>
                          <th scope="col" className="px-6 py-4">
                            User Name
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Phone Number
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {attendances.length === 0 ? (
                          <tr className="border-b dark:border-neutral-500">
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              _
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">_</td>
                            <td className="whitespace-nowrap px-6 py-4">_</td>
                            <td className="whitespace-nowrap px-6 py-4">_</td>
                            <td className="whitespace-nowrap px-6 py-4">_</td>
                          </tr>
                        ) : (
                          attendances.map((attendance, index) => (
                            <tr
                              key={index}
                              className="border-b dark:border-neutral-500"
                            >
                              <td className="whitespace-nowrap px-6 py-4 font-medium">
                                {index + 1}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                              {attendance.createdAt.substring(0, 10)}
                                                                 {" | "} 
                                {attendance.createdAt.substring(11, 19)}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                {attendance.userId._id}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                {attendance.userId?.firstName}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                _
                                {/* {attendance.userId?.mobileNumber
                                ? attendance.userId?.mobileNumber
                                : ""} */}
                              </td>
                            </tr>
                          ))
                        )}
                        {}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-slate-500 rounded-md flex justify-between p-2">
          <div className="text-lg font-bold	 text-white">
            Total Attendence: {attendances.length}
          </div>
          <button
            className="bg-dashBtnBlue flex justify-center items-center gap-2 text-lg font-medium		 text-white rounded-lg w-20"
            onClick={generateAttendencePDF}
          >
            <FaPrint />
            Print
          </button>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            onClick={() => setAttendanceReport(false)}
          >
            Cancel
          </button>
        </div>
      </WidthChangeModal>

      <WidthChangeModal isOpen={revenueReport} setIsOpen={setRevenueReport}>
        <Dialog.Title
          as="h3"
          className="text-lg font-medium leading-6 text-gray-900"
        >
          Revenue of the event
        </Dialog.Title>
        <div className="flex flex-col">
          <div className="overflow-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <div className=" h-60 overflow-auto">
                  <div ref={componentRdf} className="w-full">
                    <table className="w-full text-left text-sm font-light">
                      <thead className="border-b w-full font-medium ">
                        <tr>
                          <th scope="col" className="px-6 py-4">
                            Ticket Type
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Quantity
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {allTicketTypes?.map((ticket) => (
                          <tr key={ticket._id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {ticket.classType}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {
                                allSoldTicketTypes.filter(
                                  (soldTicket) =>
                                    soldTicket.ticketId === ticket._id
                                ).length
                              }
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {allSoldTicketTypes.filter(
                                (soldTicket) =>
                                  soldTicket.ticketId === ticket._id
                              ).length * ticket.price}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-slate-500  w-full rounded-md flex justify-between p-2">
          <div className="text-lg font-semibold	 text-white">
            Total Revenue- LKR: {income}
          </div>
          <button
            className="bg-dashBtnBlue flex justify-center items-center gap-2 text-lg font-medium		 text-white rounded-lg w-20"
            onClick={generatePDF}
          >
            <FaPrint />
            Print
          </button>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            onClick={() => setRevenueReport(false)}
          >
            Cancel
          </button>
        </div>
      </WidthChangeModal>
    </ContainerWithStroke>
  );
}
