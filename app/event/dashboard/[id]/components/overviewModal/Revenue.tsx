import React, { memo, useEffect, useState, useRef } from "react";
import { UseEventContext } from "../../EventDashContext";
import { EventContextType, RegisterEventType, Ticket } from "@/app/Type";
import { FaPrint } from "react-icons/fa6";
import { GET } from "@/app/api/v1/event/getAllEvents/route";
import { useParams } from "next/navigation";
import { useReactToPrint } from "react-to-print";

export default memo(function RevenueDetails() {
  const { setStatus, income } = UseEventContext() as EventContextType;
  const params = useParams<{ id: string }>();
  const [allTicketTypes, setAllTicketTypes] = useState<Ticket[]>([]);
  const [allSoldTicketTypes, setAllSoldTicketTypes] = useState<any[]>([]);

  const componentRdf = useRef(null);

  const generatePDF = useReactToPrint({
    content: () => componentRdf.current,
    documentTitle: "Revenue Report",
  });

  useEffect(() => {
    async function getTicketData() {
      const res = await fetch(`/api/v1/ticket/getTicket/${params.id}`);
      if (!res.ok) {
        return;
      }
      const data = await res.json();
      setAllTicketTypes(data);
      console.log("ticket data", data);
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
    <>
      <div
        style={{
          backgroundColor: "#D9D9D9CC",
        }}
        id="static-modal"
        data-modal-backdrop="static"
        aria-hidden="true"
        className=" overflow-y-auto overflow-x-hidden p-4 fixed  z-50 justify-center items-center w-full md:inset-0 h-screen max-h-full"
      >
        <div className="border-[1px] border-dashBtnBlue rounded-md bg-white  w-3/5 relative top-[20%] left-[20%]">
          <div className="mr-4">
            <button
              onClick={() => setStatus("overview")}
              type="button"
              className="text-gray-400 w-full   bg-transparent  rounded-lg text-sm  h-8 ms-auto inline-flex justify-end items-center "
              data-modal-hide="static-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-col">
            <div className="overflow-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <div className="text-lg text-bold flex justify-center align-center ">
                    Revenue of the event
                  </div>
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
                          {allTicketTypes.map((ticket) => (
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
          <div className="bg-slate-500 rounded-md flex justify-between p-2">
            <div className="text-lg font-bold	 text-white">
              Toral Revenue- LKR: {income}
            </div>
            <button
              className="bg-dashBtnBlue flex justify-center items-center gap-2 text-lg font-medium		 text-white rounded-lg w-20"
              onClick={generatePDF}
            >
              <FaPrint />
              Print
            </button>
          </div>
        </div>
      </div>
    </>
  );
});
