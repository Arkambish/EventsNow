"use client";
import React, { useEffect, useState } from "react";
import Container from "./Container";
import OverviewSubComponent from "./OverviewSubComponent";
import CheckPermission from "./CheckPermission";
import { useParams } from "next/navigation";
import { EventContextType, UseEventContext } from "../EventDashContext";
import { FetchGet } from "@/hooks/useFetch";

export default function Overview() {
  const { event, id } = UseEventContext() as EventContextType;
  // const { id } = useParams();
  const [totalTicketSale, setTotalTicketSale] = useState<number | null>(null);
  const [totalAttendance, setTotalAttendance] = useState<number | null>(null);

  useEffect(() => {
    const fetchTotalTicketSale = async () => {
      try {
        const data = await FetchGet({
          endpoint: `ticket/countTickets/${id}`,
        });
        setTotalTicketSale(data.data);
      } catch (error) {
        console.error("Error fetching total ticket sale:", error);
      }
    };

    const fetchTotalAttendance = async () => {
      try {
        const data = await FetchGet({
          endpoint: `attendant/countAttendant/${id}`,
        });
        setTotalAttendance(data.data);
      } catch (error) {
        console.error("Error fetching total attendance:", error);
      }
    };

    fetchTotalTicketSale();
    fetchTotalAttendance();
  }, [id]);

  return (
    <Container>
      <div className="h-full mt-5 mb-8 sm:mb-56">
        <div className="pl-10 mb-5 grid gap-2 mt-3">
          <div className="  text-custom-orange font-medium text-3xl ">
            Overview
          </div>
          <div className=" text-[#848484] ">
            Get a quick overview of your event
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-4 justify-between gap-8 ">
          <OverviewSubComponent
            image="tickets.svg"
            text="Total ticket Sale"
            linkToDetails="totalTicket"
            details={totalTicketSale !== null ? totalTicketSale : "Loading..."}
          />
          <OverviewSubComponent
            image="attendence.svg"
            text="Total attendence"
            linkToDetails="totalAttendence"
            details={totalAttendance !== null ? totalAttendance : "Loading..."}
          />
          <OverviewSubComponent
            image="revenue.svg"
            text="Total revenue"
            linkToDetails="totalRevenue"
            details={event.income ? event.income : "Loading..."}
          />
        </div>
      </div>
    </Container>
  );
}
