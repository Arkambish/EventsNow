"use client";
import React, { useEffect, useRef } from "react";

import crypto from "crypto";
import Head from "next/head";
import axios from "axios";
import Script from "next/script";
import Image from "next/image";
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

  // const hashedSecret = md5(merchantSecret).toString().toUpperCase();
  // let amountFormated = parseFloat(amount)
  //   .toLocaleString("en-us", { minimumFractionDigits: 2 })
  //   .replaceAll(",", "");

  // const hash = md5(
  //   merchantId + orderId + amountFormated + currency + hashedSecret
  // )
  //   .toString()
  //   .toUpperCase();

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

    // initial setup

    // const hash = md5(
    //   merchantId + orderId + amountFormated + currency + hashedSecret
    // )
    //   .toString()
    //   .toUpperCase();

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // // initial setup

  // const key = "updatable";
  // const orderId = props.orderId;
  // const name = props.item;
  // const amount = props.amount;
  // const merchantId = "1226118";
  // const merchantSecret =
  //   "Mjk3NjYwMjU4MzIzNjcxODIzMTIyNTY5ODAzMTg1MjEzNjE5NDQzNw==";

  // // const hashedSecret = md5(merchantSecret).toString().toUpperCase();
  // // let amountFormated = parseFloat(amount)
  // //   .toLocaleString("en-us", { minimumFractionDigits: 2 })
  // //   .replaceAll(",", "");
  // const currency = props.currency || "LKR";

  // // const hash = md5(
  // //   merchantId + orderId + amountFormated + currency + hashedSecret
  // // )
  // //   .toString()
  // //   .toUpperCase();

  // var payment = {
  //   sandbox: true, // if the account is sandbox or real
  //   merchant_id: merchantId, // Replace your Merchant ID
  //   return_url: "http://localhost:3000/",
  //   cancel_url: "http://localhost:3000/",
  //   notify_url: "http://localhost:3000/",
  //   order_id: orderId,
  //   items: name,
  //   amount: amount,
  //   currency: currency,
  //   first_name: props.first_name,
  //   last_name: props.last_name,
  //   email: props.email,
  //   phone: props.phone,
  //   address: props.address,
  //   city: props.city,
  //   country: props.country,
  //   // hash: hash,
  // };

  // // 1st way to initialize the payhere sdk

  // // Called when user completed the payment. It can be a successful payment or failure
  // window.payhere.onCompleted = function onCompleted(paymentId: string) {
  //   console.log("-----------befoe");
  //   // axios
  //   //   .post("http://localhost:8000/api/postpaymentStatus", {
  //   //     status: "Success",
  //   //   })
  //   //   .then((res) => {
  //   //     console.log("Payment completed.");
  //   //   })
  //   //   .catch((error) => {
  //   //     console.log(error);
  //   //     console.log(-------error is ${error});
  //   //   });
  //   console.log("-----------After");
  // };

  // // Called when user closes the payment without completing
  // window.payhere.onDismissed = function onDismissed() {
  //   //Note: Prompt user to pay again or show an error page
  //   console.log("Payment dismissed");
  // };

  // // Called when error happens when initializing payment such as invalid parameters
  // window.payhere.onError = function onError(error: string) {
  //   // Note: show an error page
  //   console.log("Error:" + error);
  // };

  function pay() {
    console.log("before");
    window.payhere.startPayment(payment);
    console.log("after");
  }

  // 2nd way to initialize the payhere sdk

  // useEffect(() => {
  //   // Initialize PayHere SDK
  //   const script = document.createElement("script");
  //   script.src = "https://www.payhere.lk/lib/payhere.js";
  //   script.async = true;
  //   script.onload = () => {
  //     // Initialize PayHere SDK after the script has been loaded
  //     window.payhere.init({
  //       sandbox: true, // if the account is sandbox or real
  //       merchant_id: merchantId, // Replace your Merchant ID
  //       return_url: "http://localhost:3000/",
  //       cancel_url: "http://localhost:3000/",
  //       notify_url: "http://localhost:3000/",
  //     });

  //     // Event handlers
  //     if (window.payhere) {
  //       window.payhere.onCompleted = function onCompleted(paymentId: string) {
  //         alert("Payment completed");
  //         console.log("Payment completed");
  //         // Handle payment completion
  //       };

  //       window.payhere.onDismissed = function onDismissed() {
  //         alert("Payment dismissed");
  //         console.log("Payment dismissed");
  //         // Handle payment dismissal
  //       };

  //       window.payhere.onError = function onError(error: string) {
  //         alert("Error: " + error);
  //         console.log("Paym");
  //         // Handle payment error
  //       };
  //     }

  //     document.body.appendChild(script);

  //     // Clean up function to remove the script when the component unmounts
  //     return () => {
  //       document.body.removeChild(script);
  //     };
  //   };
  // }, [merchantId]);

  // function pay() {
  //   if (window.payhere) {
  //     window.payhere.startPayment(payment);
  //   } else {
  //     console.error("PayHere SDK is not initialized.");
  //   }
  // }

  return (
    <>
      {/* <Head>
        <script src="https://www.payhere.lk/lib/payhere.js" async />
      </Head> */}

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
