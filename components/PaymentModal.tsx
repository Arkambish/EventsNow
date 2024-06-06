"use client";
import React, { useEffect, useRef } from "react";
import { useState } from "react";

import crypto from "crypto";
import { generateQRCodeImage } from "@/util/helper";
import { error, success } from "@/util/Toastify";

import { useParams } from "next/navigation";
import { getSession } from "next-auth/react";
import { FetchPost, FetchPut, FetchGet } from "@/hooks/useFetch";
import { TicketArray } from "@/app/event/host/[id]/components/HostSideBar";

declare global {
  interface Window {
    payhere: any;
  }
}

type PaymentModalProps = {
  orderId: string;
  item: string;
  amount: number;
  currency: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  ticketArrTemp: TicketArray[];
  totalPrice: number;
  setIsActiveProceedTicketModal: React.Dispatch<React.SetStateAction<boolean>>;
  setTicketArrTemp: React.Dispatch<React.SetStateAction<TicketArray[]>>;
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
};

const PaymentModal = (props: PaymentModalProps) => {
  const scriptRef = useRef<any>();

  const key = "updatable";
  const orderId = props.orderId;
  const name = props.item;
  const amount = props.amount;
  const merchantId = "1226229";
  const merchantSecret = "OTA4MzgwNDQ5MzAzODA0NTg5MjYzODIxNjAwODIxOTUwNDczMjk=";

  // localhost merchantSecret=    "MjY0MDQ5OTc3NTIyNDg2NDk2OTUyMzU2MDY1OTcxMzYyMTEyODYxMA==";

  const currency = props.currency || "LKR";

  const hashedSecret = crypto
    .createHash("md5")
    .update(merchantSecret)
    .digest("hex")
    .toUpperCase();
  let amountFormatted = amount
    .toLocaleString("en-us", { minimumFractionDigits: 2 })
    .replaceAll(",", "");

  const hash = crypto
    .createHash("md5")
    .update(merchantId + orderId + amountFormatted + currency + hashedSecret)
    .digest("hex")
    .toUpperCase();

  var payment = {
    sandbox: true, // if the account is sandbox or real
    merchant_id: merchantId, // Replace your Merchant ID
    // return_url: "http://localhost:3000/",
    // cancel_url: "http://localhost:3000/",
    // notify_url: "http://localhost:3000/",
    return_url: "https://events-now.vercel.app/",
    cancel_url: "https://events-now.vercel.app/",
    notify_url: "https://events-now.vercel.app/",
    order_id: orderId,
    items: name,
    amount: amount,
    currency: currency,
    first_name: props.first_name,
    last_name: props.last_name,
    email: props.email,
    phone: props.phone,
    address: props.address,
    city: props.city,
    country: props.country,
    hash: hash,
  };
  const params = useParams<{ id: string }>();
  const [userId, setUserId] = useState<string>("");
  // const [ticketCode,setTicketCode] = useState("");

  useEffect(() => {
    const getUserId = async () => {
      const session = await getSession();
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/v1/user/getUserId`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: session?.user?.email,
            }),
          }
        );

        if (!res.ok) {
          error("Error fetching user id");
        }

        const data = await res.json();

        setUserId(data.id);
      } catch (e) {
        error("Error fetching user id");
      }
    };
    getUserId();
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.payhere.lk/lib/payhere.js";
    script.async = true;

    script.onload = () => {
      // PayHere script is loaded, initialize event listeners
      window.payhere.onCompleted = async function onCompleted(
        paymentId: string
      ) {
        {
          const exTicketCodes = await FetchGet({
            endpoint: "buyTicket/getAllTicketCodes",
          });

          props.ticketArrTemp.map(async (ticket: TicketArray) => {
            // get all excist ticket Codes

            //generate code
            let ticketCode = "";
            while (true) {
              const randomCode = Math.floor(
                10000000 + Math.random() * 90000000
              ).toString();
              if (!exTicketCodes.data.includes(randomCode)) {
                // setTicketCode(randomCode);
                ticketCode = randomCode;

                break;
              }
            }

            //store ticket buy data
            try {
              const value = {
                useId: userId,
                eventId: params.id,
                class: ticket.typeId,
                classType: ticket.type,
              };

              const qrImg = await generateQRCodeImage(JSON.stringify(value));

              const qrdata = await FetchPost({
                endpoint: "event/sendQrCode",
                body: {
                  qr: qrImg,
                  userid: userId,
                  ticketCode: ticketCode,
                },
              });

              if (qrdata !== "Email sent successfully") {
                error("server error");
                return;
              }

              const buyTicketData = await FetchPost({
                endpoint: "buyTicket/userBuyTicket",
                body: {
                  ticketId: ticket,
                  eventId: params.id,
                  userId: userId,
                  ticketCode: ticketCode,
                },
              });

              if (buyTicketData == "user buy ticket Failed,try again") {
                error("user buy ticket Failed,try again");
                return;
              }
              success("user buy ticket successfully");
            } catch (e) {
              console.log(e);
              error(e);
            }
          });
        }
        // const response = await fetch(
        //   `${process.env.NEXT_PUBLIC_URL}/api/v1/event/payment`,
        //   {
        //     method: "PUT",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //       id: params.id,
        //       amount: props.totalPrice,
        //     }),
        //   }
        // );

        const updateData = await FetchPut({
          endpoint: `event/payment`,
          body: {
            id: params.id,
            amount: props.totalPrice,
          },
        });

        success("Payment completed");
        props.setIsActiveProceedTicketModal(false);

        props.setTicketArrTemp([]);
        props.setTotalPrice(0);
      };

      window.payhere.onDismissed = function onDismissed() {
        error("Payment dismissed");
      };

      window.payhere.onError = function onError(e: string) {
        error(e);
      };
    };
    scriptRef.current = script;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [params.id, props.ticketArrTemp, props.totalPrice, userId, props]);

  function pay() {
    window.payhere.startPayment(payment);
  }

  return (
    <>
      <button
        onClick={pay}
        className="flex button  px-4 py-1 bg-[#D47151] rounded-2xl items-center  "
      >
        <div className="font-medium xl:text-lg text-md text-white text-left leading-tight ">
          Pay Now
        </div>
      </button>
    </>
  );
};

export default PaymentModal;
