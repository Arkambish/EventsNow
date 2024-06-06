import React from "react";
import Container from "./Container";
import { error, success } from "@/util/Toastify";
import { FetchPost } from "@/hooks/useFetch";
import { useParams } from "next/navigation";

export default function Code() {
  const [ticketCode, setTicketCode] = React.useState("");
  // const { id } = useParams();

  const params = useParams();

  const handleMarkAttendence = async () => {
    // Add code to mark attendence

    if (ticketCode.length == 8) {
      try {
        const res = await fetch("/api/v1/attendant/markAttendenceUsingCode", {
          method: "POST",
          body: JSON.stringify({ ticketCode, eventId: params.id }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          error("Invalid Ticket Code");
          return;
        }

        // const res = await FetchPost({
        //     endpoint:`attendant/markAttendenceUsingCode`,
        //     body:{ticketCode},
        // })
        const ticketData = await res.json();

        if (!ticketData) {
          error("Invalid Ticket Code");
          return;
        }

        if (ticketData.message == "Invalid Ticket Code") {
          return error("Invalid Ticket Code");
        }
        if (ticketData.message == "Ticket Already Marked") {
          return error("Ticket Already Marked");
        }
        if (ticketData.message == "attendant Creation Failed") {
          return error("attendant not marked successfully");
        }

        if (ticketData) {
          setTicketCode("");
          return success("Attendance marked successfully");
        }

        // console.log(ticketData.ticketId.classType);

        // const res1 = await fetch("/api/v1/attendant/markAttendant", {
        //   method: "POST",
        //   body: JSON.stringify({
        //     ticketType: ticketData.ticketId.classType,
        //     eventId: ticketData.eventId,
        //     userId: ticketData.userId,
        //   }),
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        // });

        // if (!res1.ok) {
        //   error("Attendance marking Failed");
        //   return;
        // } else {
        //   success("Attendance marked successfully");
        // }
      } catch (e) {
        console.log(e);
      }
    } else {
      error("Invalid Ticket Code");
    }
  };
  return (
    <div>
      <Container>
        <div className="mt-6 text-[#455273]  mr-8">Enter your Ticket code</div>

        <div className="flex items-center">
          <input
            type="text"
            className=" px-3 py-[6px] border rounded-md focus:outline-none"
            onChange={(e) => setTicketCode(e.target.value)}
          />
          <button
            className="bg-slate-400 text-white px-4 py-1.5  rounded-lg ml-2"
            onClick={handleMarkAttendence}
          >
            Mark
          </button>
        </div>
      </Container>
    </div>
  );
}
