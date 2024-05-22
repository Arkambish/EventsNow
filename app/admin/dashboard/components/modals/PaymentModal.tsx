import React, { memo, useEffect, useState } from "react";
import { EventType } from "@/app/Type";
import { formatDate } from "@/util/helper";
import Pay from "../Pay";

export default memo(function PaymentModal({
  setShowPaymentModal,
  organizationId,
}: {
  setShowPaymentModal: (value: boolean) => void;
  organizationId: string;
}) {
  const [eventDetails, setEventDetails] = useState<EventType[]>([]);
  const [income, setIncome] = useState<number>(0);
  const [rate, setRate] = useState<number>();
  const [permenentIncome, setPermenentIncome] = useState<number>();
  const [eventId, setEventId] = useState<string[]>([]);
  const [isRateOk, setIsRateOk] = useState<boolean>(false);
  useEffect(() => {
    const fetchPaymentDetails = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/v1/organization/getOrganizationsEvent/${organizationId}`
      );
      const data = await response.json();

      const eventIds = data.events.map((event: EventType) => event._id);
      setEventId(eventIds);
      setEventDetails(data.events);
      setIncome(data.income);
      setPermenentIncome(data.income);
    };
    fetchPaymentDetails();
  }, [organizationId]);

  function handleRate() {
    if (rate) {
      const total = income - (rate / 100) * income;
      setIncome(total);
      setIsRateOk(true);
    }
  }

  function handleRateField(value: number) {
    if (value < 0 || value > 100) return;
    if (value === 0) {
      setRate(0);
      setIsRateOk(false);
      return;
    }

    setRate(value);
    const total = income - (value / 100) * income;
    setIncome(total);
    setIsRateOk(true);
  }

  const paymentDetails = {
    items: "test",
    oder_id: "test",
    currency: "LKR",
    first_name: "test",
    last_name: "test",
    fullAmount: Math.floor(income),
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
  };

  return (
    <>
      <div
        style={{
          backgroundColor: "#D9D9D9CC",
        }}
        id="static-modal"
        data-modal-backdrop="static"
        aria-hidden="true"
        className=" overflow-y-auto overflow-x-hidden p-4 fixed  z-50 justify-center items-center w-full md:inset-0  max-h-full"
      >
        <div className="border-[1px] border-dashBtnBlue rounded-md bg-white  w-3/5 relative top-[20%] left-[20%]">
          <div className="mr-4">
            <button
              onClick={() => setShowPaymentModal(false)}
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
                    Payment Details
                  </div>
                  <div className=" h-60 overflow-auto">
                    <table className="w-full text-left text-sm font-light">
                      <thead className="border-b w-full font-medium ">
                        <tr>
                          <th scope="col" className="px-6 py-4">
                            Event
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Date
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Income
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {eventDetails.length === 0 ? (
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
                          eventDetails.map((event, index) => (
                            <tr
                              key={index}
                              className="border-b dark:border-neutral-500"
                            >
                              <td className="whitespace-nowrap px-6 py-4">
                                {event.eventName}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                {formatDate(event.eventEndDate)}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                {event.income}
                              </td>
                            </tr>
                          ))
                        )}
                        <tr className="border-b dark:border-neutral-500">
                          <th className="whitespace-nowrap px-6 py-4">
                            Total income
                          </th>
                          <td className="whitespace-nowrap px-6 py-4"></td>
                          <th className="whitespace-nowrap px-6 py-4">
                            LKR {permenentIncome}
                          </th>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-slate-500 rounded-md flex justify-between p-2">
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Enter Rate (%)"
                className="rounded-lg outline-none"
                onChange={(e) => handleRateField(Number(e.target.value))}
                value={rate}
              />
            </div>
            {isRateOk && (
              <>
                <div className="text-lg font-bold	 text-white">
                  Total Payment: LKR {Math.floor(income)}
                </div>
                <Pay
                  eventDetails={eventId}
                  item={paymentDetails?.items}
                  orderId={paymentDetails?.oder_id}
                  amount={paymentDetails.fullAmount}
                  currency={paymentDetails?.currency}
                  first_name={paymentDetails?.first_name}
                  last_name={paymentDetails?.last_name}
                  email={paymentDetails?.email}
                  phone={paymentDetails?.phone}
                  address={paymentDetails?.address}
                  city={paymentDetails?.city}
                  country={paymentDetails?.country}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
});
