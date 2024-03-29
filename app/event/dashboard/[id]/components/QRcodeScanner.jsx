"use client";
import react from "react";
import QrScanner from "qr-scanner";
import { useEffect, useRef, useState } from "react";

const QRScanner = () => {
  const videoElementRef = useRef(null);
  const [scanned, setScannedText] = useState("");
  const [scannedEvent, setScannedEvent] = useState("");
  const [scannedUser, setScannedUser] = useState("");

  useEffect(() => {
    const video = videoElementRef.current;
    const qrScanner = new QrScanner(
      video,
      (result) => {
        console.log("decoded qr code:", result);
        setScannedText(result.data);
        setScannedEvent(result.data.split(",")[0]);
        setScannedUser(result.data.split(",")[1]);
      },
      {
        returnDetailedScanResult: true,
        highlightScanRegion: true,
        highlightCodeOutline: true,
      }
    );
    qrScanner.start();
    console.log("start");

    return () => {
      console.log(qrScanner);
      qrScanner.stop();
      qrScanner.destroy();
    };
  }, []);



  return (
    <div>
      <div className="flex align items-center justify-center mb-3 ">
        <video
          className="object-cover border-2 border-solid w-64 h-64"
          ref={videoElementRef}
        />
      </div>
      <p className="scannedText">event: {scannedEvent}</p>
      <p className="scannedText">user: {scannedUser}</p>
    </div>
  );
};

export default QRScanner;
