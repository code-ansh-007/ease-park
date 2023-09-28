import QRreader from "@/components/QRreader";
import { db } from "@/firebase";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getSession } from "next-auth/react";
import React, { useState } from "react";

const Guard = ({ bookings }) => {
  const [showQRScanner, setShowQRScanner] = useState(false);

  return (
    <div className="flex flex-col  px-4 py-5 gap-5 w-full">
      <span className="font-semibold text-2xl">Guard Control Interface</span>
      <button
        onClick={() => {
          setShowQRScanner(true);
        }}
        className="p-2 bg-green-500 rounded-xl font-semibold text-white "
      >
        Scan QR
      </button>
      {showQRScanner && <QRreader />}
      <span className="text-xl font-bold">Bookings</span>
      <table class="table-auto border-collapse border border-gray-500">
        <thead>
          <tr>
            <th class="px-4 py-2 border border-gray-500">Customer Name</th>
            <th class="px-4 py-2 border border-gray-500">Duration</th>
            <th class="px-4 py-2 border border-gray-500">QR Verification</th>
          </tr>
        </thead>
        <tbody className="w-full">
          {bookings.map((booking) => (
            <tr className="w-full">
              <td class="px-4 py-2 border border-gray-500">
                {booking.custName}
              </td>
              <td class="px-4 py-2 border border-gray-500">
                {booking.selectedDuration / 60} Hrs
              </td>
              <td class="px-4 py-2 border border-gray-500 text-center w-full">
                {booking.qrVerified ? (
                  <AiFillCheckCircle size={24} className="text-green-500" />
                ) : (
                  <AiFillCloseCircle size={24} className="text-red-500" />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Guard;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const uid = session?.user?.id;

  const q1 = query(collection(db, "users"), where("userId", "==", uid));
  const qSnap1 = await getDocs(q1);
  const user = qSnap1.docs[0].data();
  console.log(user);
  if (user.role !== "admin") {
    return {
      redirect: {
        destination: "/mainHome",
        permanent: false,
      },
    };
  }

  const bookings = [];
  const q = query(collection(db, "bookings"));
  const qSnap = await getDocs(q);
  qSnap.forEach((doc) => {
    const bookingData = doc.data();
    bookings.push(bookingData);
  });

  return {
    props: {
      bookings,
    },
  };
}
