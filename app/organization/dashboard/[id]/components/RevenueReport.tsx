import React, { memo, use, useRef } from "react";
// import { UseEventContext } from "../../EventDashContext";
import { FaPrint } from "react-icons/fa6";
import { useReactToPrint } from "react-to-print";

export default function RevenueDetails({
  setStatus,
}: {
  setStatus: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const printRef = useRef(null);
  
  const generatePDF = useReactToPrint({
    content: () => printRef.current,
    documentTitle: "Revenue Report of the organization",
  });
  return (
    <>
      <div
        style={{
          backgroundColor: "#D9D9D9CC",
        }}
        id="static-modal"
        data-modal-backdrop="static"
        aria-hidden="true"
        className=" overflow-y-auto overflow-x-hidden p-4 fixed  z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="border-[1px] border-dashBtnBlue rounded-md bg-white  w-3/5 relative top-[20%] left-[20%]">
          <div className="mr-4">
            <button
              onClick={() => setStatus(false)}
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
                  <div className=" h-60 overflow-auto" ref={printRef}>
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
                        <tr className="border-b dark:border-neutral-500">
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            A
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">10</td>
                          <td className="whitespace-nowrap px-6 py-4">
                            1000 x 10=1000
                          </td>
                        </tr>
                        <tr className="border-b dark:border-neutral-500">
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            B
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">50</td>
                          <td className="whitespace-nowrap px-6 py-4">
                            500 x 50=1000
                          </td>
                        </tr>
                        <tr className="border-b dark:border-neutral-500">
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            C
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">10</td>
                          <td className="whitespace-nowrap px-6 py-4">
                            200 x 10=1000
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-slate-500 rounded-md flex justify-between p-2">
            <div className="text-lg font-bold	 text-white">
              Toral Revenue- LKR: 100
            </div>
            <button onClick={generatePDF} className="bg-dashBtnBlue flex justify-center items-center gap-2 text-lg font-medium		 text-white rounded-lg w-20">
              <FaPrint />
              Print
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
