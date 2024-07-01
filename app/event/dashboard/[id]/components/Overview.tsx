"use client";
import React, { useEffect, useState } from "react";
import Container from "./Container";
import OverviewSubComponent from "./OverviewSubComponent";
import CheckPermission from "./CheckPermission";
import { useParams } from "next/navigation";
import { EventContextType, UseEventContext } from "../EventDashContext";
import { FetchGet } from "@/hooks/useFetch";
import { is } from "date-fns/locale";
import TicketSalesByClass from "./TicketByClass";

export default function Overview() {
  const { event, totalTicketSale, totalAttendance, isLoading } =
    UseEventContext() as EventContextType;

  console.log(totalTicketSale, totalAttendance);

  if (isLoading) return <div>loading</div>;
  return (
    <Container>
      <div className="h-full mt-5 mb-8 sm:mb-56">
        <div className="pl-10 mb-5 grid gap-2 mt-3">
          <div className="  text-stone-600 font-IBM font-medium text-3xl ">
            Overview
          </div>
          <div className=" text-[#848484] ">
            Get a quick overview of your event
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-4 justify-between gap-8 ">
          <TicketSalesByClass
            image="tickets.svg"
            text="Ticket Sales Overview"
            eventId={event._id}
          />

          <OverviewSubComponent
            image="attendence.svg"
            text="Total attendence"
            linkToDetails="totalAttendence"
            details={totalAttendance}
          />
          <OverviewSubComponent
            image="revenue.svg"
            text="Total revenue"
            linkToDetails="totalRevenue"
            details={event.income}
          />
        </div>
      </div>
    </Container>
  );
}
