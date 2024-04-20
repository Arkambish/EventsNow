"use client";
import React from "react";
import ContainerWithStroke from "./ContainerWithStroke";
import Image from "next/image";
import { UseEventContext } from "../EventDashContext";
import { EventContextType } from "@/app/Type";

interface OverviewSubComponentProps {
  image: string;
  text: string;
  linkToDetails: string;
  details: number | null | string;
}
export default function OverviewSubComponent({
  image,
  text,
  linkToDetails,
  details,
}: OverviewSubComponentProps) {
  const { setStatus } = UseEventContext() as EventContextType;

  function handleOverview() {
    linkToDetails === "totalAttendence" && setStatus("attendance");
    linkToDetails === "totalTicket" && setStatus("attendance");
    linkToDetails === "totalRevenue" && setStatus("revenue");
  }

  return (
    <ContainerWithStroke>
      <div className="py-4 grid gap-3  justify-center">
        <Image
          className="justify-self-center"
          src={`/images/eventDash/${image}`}
          alt="tickets "
          width={80}
          height={80}
        />
        <div className="text-[#273B4A]   tracking-tight">
          {text}
          {/* Total Ticket Sale */}
        </div>
        <div
          // onClick={handleOverview}
          className="pl-0.5 justify-self-start  text-[#455273] font-normal hover:text-sky-600 "
        >
          {details}
        </div>
      </div>
    </ContainerWithStroke>
  );
}
