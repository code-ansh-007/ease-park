import React from "react";
import QRCode from "react-qr-code";

const QRcode = ({ bookingId }) => {
  return (
    <main>
      <QRCode value={bookingId}  size={200} />
    </main>
  );
};

export default QRcode;
