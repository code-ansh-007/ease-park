import React, { useEffect, useRef } from "react";
import QrScanner from "qr-scanner";

const startScanner = (videoElement) => {
  const qrScanner = new QrScanner(
    videoElement,
    (result) => {
      console.log("Decoded QR code:", result);
    },
    {}
  );
  qrScanner.start();
};

const QRreader = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      startScanner(videoRef.current);
    }
  }, []);

  return (
    <div>
      <video ref={videoRef}></video>
    </div>
  );
};

export default QRreader;
