import QRreader from "@/components/QRreader";
import { db } from "@/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { getSession } from "next-auth/react";
import React, { useState } from "react";

const Guard = ({ bookings }) => {
  const [showQRScanner, setShowQRScanner] = useState(false);

  return (
    <div className="flex flex-col  px-4 py-10 gap-5">
      <button
        onClick={() => {
          setShowQRScanner(true);
        }}
        className="p-2 bg-orange-500 rounded-xl font-semibold text-white "
      >
        Scan QR
      </button>
      {showQRScanner && <QRreader />}
      <span className="text-xl font-bold">Bookings</span>
      <table class="table-auto border-collapse border border-gray-500">
        <thead>
          <tr>
            <th class="px-4 py-2 border border-gray-500">Booking ID</th>
            <th class="px-4 py-2 border border-gray-500">Name</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr>
              <td class="px-4 py-2 border border-gray-500">
                {booking.bookingId}
              </td>
              <td class="px-4 py-2 border border-gray-500">
                {booking.custName}
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
