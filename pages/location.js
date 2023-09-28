import QRcode from "@/components/QRcode";
import { db } from "@/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getSession } from "next-auth/react";
import React from "react";

const Location = ({ booking }) => {
  const { custName, selectedDuration, vehicleType, totalPrice } = booking;

  return (
    <main>
      <QRcode bookingId={booking.bookingId} />
    </main>
  );
};

export default Location;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session){

  
  const id = session.user.id;

  // ?  check in db

  const q = query(collection(db, "bookings"), where("custId", "==", id));
  const qSnap = await getDocs(q);
  const booking = qSnap.docs[0].data();
  return {
    props: {
      booking,
    },
  };
  }
  else{
    return {
      props: {
        booking:[]
      },
    };
  }
}
