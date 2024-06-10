"use client";
import react from "react";
import QrScanner from "qr-scanner";
import { useEffect, useRef, useState } from "react";

const QRScanner = () => {
  const videoElementRef = useRef(null);
  const [scanned, setScannedText] = useState("");
  const [scannedEvent, setScannedEvent] = useState("");
  const [scannedUser, setScannedUser] = useState("");
  const [quantity, setQuantity] = useState();
  const [isVideoOn, setIsVideoOn] = useState(false);
  

  const handleToggleVideo = () => {
    setIsVideoOn(!isVideoOn);
  };

  useEffect(() => {
    if (isVideoOn) {
      const video = videoElementRef.current;
      const qrScanner = new QrScanner(
        video,
        (result) => {
          setScannedText(result.data);
          setScannedEvent(result.data.split(",")[0]);
          setScannedUser(result.data.split(",")[1]);
          setQuantity(result.data.split(",")[2]);
        },
        {
          returnDetailedScanResult: true,
          highlightScanRegion: true,
          highlightCodeOutline: true,
        }
      );
      qrScanner.start();

      return () => {
        qrScanner.stop();
        qrScanner.destroy();
      };
    }
  }, [isVideoOn]);

  return (
    <div>
      <div className="flex align items-center justify-center mb-3 ">
        <video
          className="object-cover border-2 border-solid w-64 h-64"
          ref={videoElementRef}
        />
      </div>
      <p className="scannedText ">event: {scannedEvent}</p>
      <p className="scannedText">user: {scannedUser}</p>
      <p className="quantity">quantity: {quantity}</p>
    </div>
  );
};

export default QRScanner;
