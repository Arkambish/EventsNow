"use client";
import React, { useEffect, useState } from "react";
import Container from "./Container";
import OverviewSubComponent from "./OverviewSubComponent";
import CheckPermission from "./CheckPermission";
export default function Overview() {
  const [totalTicketSale, setTotalTicketSale] = useState<number | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/ticket/countTickets`)
      .then((response) => response.json())
      .then((data) => {
        setTotalTicketSale(data.totalTicketsBorrowed);
      })
      .catch((error) =>
        console.error("Error fetching total ticket sale:", error)
      );
  }, []);
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
            details={
              totalTicketSale !== null
                ? totalTicketSale.toString()
                : "Loading..."
            }
          />
          <OverviewSubComponent
            image="attendence.svg"
            text="Total attendence"
            linkToDetails="totalAttendence"
            details="15467"
          />
          <OverviewSubComponent
            image="revenue.svg"
            text="Total revenue"
            linkToDetails="totalRevenue"
            details="18234"
          />
        </div>
      </div>
    </Container>
  );
}
