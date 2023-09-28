import React, { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";

const startScanner = (videoElement, onQRCodeDetected) => {
  const qrScanner = new QrScanner(
    videoElement,
    (result) => {
      onQRCodeDetected(result);
    },
    {}
  );
  qrScanner.start();
};

const QRreader = () => {
  const videoRef = useRef(null);
  const [bookingId, setBookingId] = useState("");

  useEffect(() => {
    if (videoRef.current) {
      startScanner(videoRef.current, (result) => {
        setBookingId(result[Object.keys(result)[0]]);
        verifyId();
      });
    }
  }, []);

  const verifyId = async () => {
    try {
      const docSnap = await getDoc(doc(db, "bookings", bookingId));
      if (docSnap.exists()) {
        alert("QR verified");
      }
    } catch (error) {
      alert("QR not verified");
    }
  };

  return (
    <div>
      <video ref={videoRef} className="rounded-xl"></video>
    </div>
  );
};

export default QRreader;
