"use client";
import React, { useEffect, useRef } from "react";
import crypto from "crypto";
import { generateQRCodeImage } from "@/util/helper";
import { error, success } from "@/util/Toastify";

declare global {
  interface Window {
    payhere: any;
  }
}

const PaymentModal = (props: any) => {
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
  let amountFormatted = parseFloat(amount)
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

  const value = {
    useId: "1234",
    eventId: "123445",
    quantity: 4,
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.payhere.lk/lib/payhere.js";
    script.async = true;

    script.onload = () => {
      // PayHere script is loaded, initialize event listeners
      window.payhere.onCompleted = async function onCompleted(
        paymentId: string
      ) {
        const value = {
          useId: "65f2b6a08dcf796e631062dc",
          eventId: "65f2b6f98dcf796e631062fc",
          ticket: [
            {
              class: "A",
              quantity: 4,
            },
            {
              class: "B",
              quantity: 4,
            },
          ],
        };

        const qrImg = await generateQRCodeImage(JSON.stringify(value));
        // const image = await uploadToCloudinary(qrImg);
        console.log("QR Code Image Data:", qrImg);
        // console.log("QR Code Image :", image);

        // console.log(typeof orderId);
        // console.log(typeof paymentId);
        // console.log(typeof amount);
        // console.log(typeof currency);
        // console.log(typeof payment.first_name);
        // console.log(typeof payment.last_name);
        // console.log(typeof payment.email);
        // console.log(typeof payment.phone);
        // console.log(typeof payment.address);
        // console.log(typeof payment.city);
        // console.log(typeof payment.country);

          
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/v1/event/sendQrCode`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              qr: qrImg,
              userid: "65f2b6a08dcf796e631062dc",
            }),
          }
        );

        if (!res.ok) {
          console.error("Error sending qr code");
          error("Error sending qr code");
        }

        const message = await res.json();
        if (message === "No User  exists") {
          error("No User exists");
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/v1/event/payment`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: "65f2b6f98dcf796e631062fc",
              amount: 1000,
            }),
          }
        );

        success("Payment completed");

        console.log("success payment completed");
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
  }, []);


  function pay() {
    console.log("before");
    window.payhere.startPayment(payment);
    console.log("after");
  }


  return (
    <>
      <button
        onClick={pay}
        className="flex button w-20 p-[1px] bg-[#D47151] rounded-2xl items-center  "
      >
        <div className="font-medium xl:text-lg text-md text-white text-left leading-tight ml-4">
          Pay Now
        </div>
      </button>
    </>
  );
};

export default PaymentModal;
