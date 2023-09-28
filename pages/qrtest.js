import React from "react";
import QRCode from "react-qr-code";

const Qrtest = () => {
  const qrCodeValue = "hi"; // Replace with your data

  return (
    <div>
      <h1>QR Code Generator</h1>
      <QRCode value={qrCodeValue} />
    </div>
  );
};

export default Qrtest;
