"use client";
import React from "react";
import ContainerWithStroke from "./ContainerWithStroke";
import Image from "next/image";
import Link from "next/link";
import { UseEventContext } from "../EventDashContext";
import { EventContextType } from "@/app/Type";
import { link } from "fs";

interface OverviewSubComponentProps {
  image: string;
  text: string;
  linkToDetails: string;
}
export default function OverviewSubComponent({
  image,
  text,
  linkToDetails,
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
        <div className="text-[#273B4A]  font-mono tracking-tight">
          {text}
          {/* Total Ticket Sale */}
        </div>
        <button
          onClick={handleOverview}
          className="pl-0.5 justify-self-start font-mono text-[#455273] font-normal hover:text-sky-600 "
        >
          view details
        </button>
      </div>
    </ContainerWithStroke>
  );
}
