import QRcode from "@/components/QRcode";
import { db } from "@/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getSession } from "next-auth/react";
import React from "react";
import TopBar from "@/components/TopBar";
import SearchBar from "@/components/SearchBar";
import BottomBars from "@/components/BottomBar";

const Location = ({ booking }) => {
  const { custName, selectedDuration, vehicletype, totalPrice } = booking;

  return (
    <main className="flex flex-col h-screen w-screen bg-[#161b24]">
      <div className=" relative flex-grow">
      <TopBar/>
      <div><h1 className="text-sm text-white mt-10 px-6 " >User Details</h1></div>
      <div className="bg-[#415740B8]  text-[#5EE65A] rounded-3xl p-4 px-2 mx-4 ">
        <div className="flex justify-evenly">
          <h1>Name: <span className="text-white">{custName}</span></h1>
          <h1>Duration: <span className="text-white">{selectedDuration}</span></h1>
        </div>
        <div className="flex justify-evenly">
          <h1>Vehicle: <span className="text-white">{vehicletype}</span></h1>
          <h1>Price: <span className="text-white">{totalPrice}</span></h1>
        </div>
      </div>
      <div className="flex justify-center items-center p-4 pt-10 w-screen">
        <h1 className="text-2xl text-white">Your QR</h1>
      </div>
      <div className="flex justify-center ">
        <div className=" p-8 py-4 bg-white  flex justify-center w-3/4 rounded-3xl">
          <QRcode bookingId={booking.bookingId} />
        </div>
      </div> 
      </div>
      <BottomBars/>
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
