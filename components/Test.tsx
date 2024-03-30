"use client";
import { generateQRCodeImage } from "@/util/helper";
import Image from "next/image";
import React, { useState } from "react";
import QRCodeScanner from "./Test1";

interface Test {
  word: string;
  card: string;
}

export default function Test() {
  const [qrValue, setQRValue] = useState("");
  const [qrImage, setQRImage] = useState<any>(null);

  const handleChange = (event: any) => {
    setQRValue(event.target.value);
  };

  const value = {
    useId: "1234",
    eventId: "123445",
    quantity: 4,
  };

  const handleGenerateQRCode = async () => {
    const qrImageData = await generateQRCodeImage(JSON.stringify(value));
    console.log("QR Code Image Data:", qrImageData);
    setQRImage(qrImageData);
  };

  const handleScan = (data: any) => {
    console.log("Scanned QR Code:", data);
    // You can handle the scanned data here, such as sending it to a server or updating state
  };

  return (
    <div className="">
      <div>
        <input type="text" value={qrValue} onChange={handleChange} />
        <button onClick={handleGenerateQRCode}>Generate QR Code</button>
        {qrImage && <img src={qrImage} alt="QR Code" />}
      </div>
      {/* <h1>Scan QR Code</h1>
      <QRCodeScanner /> */}
    </div>
  );
}
