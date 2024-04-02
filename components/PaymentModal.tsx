"use client";
import React, { useEffect, useRef } from "react";
import { useState } from "react";

import crypto from "crypto";
import { generateQRCodeImage } from "@/util/helper";
import { error, success } from "@/util/Toastify";

import { useParams } from "next/navigation";
import { getSession } from "next-auth/react";

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
  ticketArrTemp: string[];
  totalPrice: number;
  setIsActiveProceedTicketModal: React.Dispatch<React.SetStateAction<boolean>>;
  setTicketArrTemp: React.Dispatch<React.SetStateAction<string[]>>;
};

const PaymentModal = (props: PaymentModalProps) => {
  const scriptRef = useRef<any>();

  const key = "updatable";
  const orderId = props.orderId;
  const name = props.item;
  const amount = props.amount;
  const merchantId = "1226307";
  const merchantSecret =
    "MjY0MDQ5OTc3NTIyNDg2NDk2OTUyMzU2MDY1OTcxMzYyMTEyODYxMA==";
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
    return_url: "http://localhost:3000/",
    cancel_url: "http://localhost:3000/",
    notify_url: "http://localhost:3000/",
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
          props.ticketArrTemp.map(async (ticket: string) => {
            console.log("Ticket Type:", userId);
            const value = {
              useId: userId,
              eventId: params.id,
              class: { ticket },
            };

            const qrImg = await generateQRCodeImage(JSON.stringify(value));
            // const image = await uploadToCloudinary(qrImg);
            console.log("QR Code Image Data:", qrImg);
            // console.log("QR Code Image :", image);

            const res = await fetch(
              `${process.env.NEXT_PUBLIC_URL}/api/v1/event/sendQrCode`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  qr: qrImg,
                  userid: userId,
                }),
              }
            );

            if (!res.ok) {
              console.error("Error sending qr code");
              error("Error sending qr code");
              return;
            }

            const message = await res.json();
            if (message === "No User  exists") {
              error("No User exists");
              return;
            }
          });
        }
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/v1/event/payment`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: params.id,
              amount: props.totalPrice,
            }),
          }
        );

        success("Payment completed");
        props.setIsActiveProceedTicketModal(false);

        props.setTicketArrTemp([""]);
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
    console.log("before");
    window.payhere.startPayment(payment);
    console.log("after");
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
