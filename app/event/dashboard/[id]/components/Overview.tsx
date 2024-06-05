"use client";
import React, { useEffect, useState } from "react";
import Container from "./Container";
import OverviewSubComponent from "./OverviewSubComponent";
import CheckPermission from "./CheckPermission";
import { useParams } from "next/navigation";
import { EventContextType, UseEventContext } from "../EventDashContext";
import { FetchGet } from "@/hooks/useFetch";
import { is } from "date-fns/locale";

export default function Overview() {
  const { event, totalTicketSale, totalAttendance, isLoading } =
    UseEventContext() as EventContextType;
  // const { id } = useParams();
  console.log(totalTicketSale, totalAttendance);
  // useEffect(() => {
  //   const fetchTotalTicketSale = async () => {
  //     try {
  //       // const data = await FetchGet({
  //       //   endpoint: `ticket/countTickets/${id}`,
  //       // });

  //       const data = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/ticket/countTickets/${id}`

  //       );
  //       console.log(data);
  //       const res = await data.json();
  //       console.log(res);
  //       console.log(res.data)

  //       if (res && res.data) {
  //         setTotalTicketSale(res.data);
  //         console.log("asjan")
  //       }
  //     } catch (error) {
  //       console.error("Error fetching total ticket sale:", error);
  //       console.log(error)
  //     }
  //   };

  //   const fetchTotalAttendance = async () => {
  //     try {
  //       const data = await FetchGet({
  //         endpoint: `attendant/countAttendant/${id}`,
  //       });
  //       if (data && data.data){
  //         setTotalAttendance(data.data);
  //       }

  //     } catch (error) {
  //       console.error("Error fetching total attendance:", error);

  //     }
  //   };

  //   fetchTotalTicketSale();
  //   fetchTotalAttendance();
  // }, [id]);
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
          <OverviewSubComponent
            image="tickets.svg"
            text="Total ticket Sale"
            linkToDetails="totalTicket"
            details={totalTicketSale}
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
