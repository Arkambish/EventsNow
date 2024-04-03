import React, { memo } from "react";
// import { UseEventContext } from "../../EventDashContext";
import { AttendanceType, EventContextType } from "@/app/Type";
import { FaPrint } from "react-icons/fa6";

export default memo(function EventReport({
  setStatus,
  attendances,
}: {
  setStatus: any;
  attendances: AttendanceType[];
}) {
  // const { setStatus, attendances } = UseEventContext() as EventContextType;

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
        <div className="border-[1px] border-custom-orange rounded-md bg-white  w-3/5 relative top-[20%] left-[20%]">
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
                    Attendance of the event
                  </div>
                  <div className=" h-60 overflow-auto">
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
                                {attendance.createdAt}
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
          <div className="bg-slate-500 rounded-md flex justify-between p-2">
            <div className="text-lg font-bold	 text-white">
              Toral Attendence: {attendances.length}
            </div>
            <button className="bg-custom-orange flex justify-center items-center gap-2 text-lg font-medium		 text-white rounded-lg w-20">
              <FaPrint />
              Print
            </button>
          </div>
        </div>
      </div>
    </>
  );
});
