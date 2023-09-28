import { db } from "@/firebase";
import useModalState from "@/zustand/store";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { AiFillBackward } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";

const BookSlot = () => {
  const { siteDetails } = useModalState();
  const [totalPrice, setTotalPrice] = useState(siteDetails.pricePerHour);
  const [selectedDuration, setSelectedDuration] = useState(30);
  const { data: session } = useSession();
  const router = useRouter();

  const customerDetails = async () => {
    const q = query(
      collection(db, "users"),
      where("userId", "==", session.user.id)
    );
    const qSnap = await getDocs(q);
    const cust = qSnap.docs[0].data();
    return cust;
  };

  const handleNext = async () => {
    const customer = await customerDetails();
    try {
      const docRef = await addDoc(collection(db, "bookings"), {
        custId: session.user.id,
        custName: customer.name,
        totalPrice,
        selectedDuration,
        vehicletype: siteDetails.vehicleType,
        qrVerified: false,
      });
      await updateDoc(doc(db, "bookings", docRef.id), {
        bookingId: docRef.id,
      });
      router.push("/mainHome"); // ? change to location page
      alert("Booking successfully created!");
    } catch (error) {
      alert("Booking could not be created");
    }
  };

  // ! RAZORPAY INTEGRATION CODE

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  function handlePaymentSuccess(res) {
    if (res.razorpay_payment_id) {
      alert("Payment Successful ✅");
      handleNext();
    } else {
      alert("Payment Failed ❌");
    }
  }
  const makePayment = async () => {
    const res = await initializeRazorpay();
    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }
    const data = await fetch("/api/razorpay", {
      method: "POST",
      body: totalPrice,
    }).then((t) => t.json());
    console.log(data);
    var options = {
      key: process.env.RAZORPAY_KEY,
      name: "Ease Park",
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      description: "Please complete the payment to continue.",
      image: "https://manuarora.in/logo.png",
      handler: function (response) {
        handlePaymentSuccess(response);
      },
      prefill: {
        name: session.user.name,
        email: session.user.email,
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  // ! RAZORPAY INTEGRATION CODE

  return (
    <div className=" flex flex-col gap-6 pt-8 pb-5">
      <div className="flex pt-4 text-white">
        {siteDetails.vehicleType === "car" ? (
          <button className="flex flex-col justify-center items-center bg-[#319a3c54]  h-14 w-16 rounded-xl border-2 border-[#319a3c] border-solid">
            <img src="car.svg" alt="" /> Car
          </button>
        ) : (
          <button className="flex flex-col justify-center items-center bg-[#319a3c54]  h-14 w-16 rounded-xl border-2 border-[#319a3c] border-solid">
            <img src="Bike.png" alt="" /> Bike
          </button>
        )}
      </div>
      <div className="flex items-center justify-between bg-[#2e713454] rounded-2xl p-2 text-white px-4">
        <div className="flex flex-col gap-3">
          <span className="text-xl font-semibolod">
            {siteDetails.listingName}
          </span>
          <span>{Math.round(siteDetails.distance * 100) / 100}KM</span>
        </div>
        <span className="text-green-500">
          Rs. {siteDetails.pricePerHour}/hr
        </span>
      </div>
      {/* select timing block */}

      <div className="flex flex-col gap-2">
        <span className="font-bold text-xl text-white ">Select Time</span>
        <div className="flex gap-2 text-white">
          <span
            onClick={() => {
              setTotalPrice(siteDetails.pricePerHour / 2);
              setSelectedDuration(30);
            }}
            className={`bg-[#415740] border-[1px] text-xs border-green-400 px-3 rounded-2xl p-1 ${
              selectedDuration === 30 ? "bg-gray-500 text-white" : null
            }`}
          >
            30 min
          </span>
          <span
            onClick={() => {
              setTotalPrice(siteDetails.pricePerHour);
              setSelectedDuration(60);
            }}
            className={`bg-[#415740] border-[1px] text-xs border-green-400 px-3 rounded-2xl p-1 ${
              selectedDuration === 60 ? "bg-gray-500 text-white" : null
            }`}
          >
            1 hr
          </span>
          <span
            onClick={() => {
              setTotalPrice(siteDetails.pricePerHour * 2);
              setSelectedDuration(120);
            }}
            className={`bg-[#415740] border-[1px] text-xs border-green-400 px-3 rounded-2xl p-1 ${
              selectedDuration === 120 ? "bg-gray-500 text-white" : null
            }`}
          >
            2 hr
          </span>
          <span
            onClick={() => {
              setTotalPrice(siteDetails.pricePerHour * 24);
              setSelectedDuration(60 * 24);
            }}
            className={`bg-[#415740] border-[1px] text-xs border-green-400 px-3 rounded-2xl p-1 ${
              selectedDuration === 60 * 24 ? "bg-gray-500 text-white" : null
            }`}
          >
            1 Day
          </span>
          <span
            onClick={() => {
              setTotalPrice(siteDetails.pricePerHour * 24 * 7);
              setSelectedDuration(60 * 24 * 7);
            }}
            className={`bg-[#415740] border-[1px] text-xs border-green-400 px-3 rounded-2xl p-1 ${
              selectedDuration === 60 * 24 * 7 ? "bg-gray-500 text-white" : null
            }`}
          >
            1 Week
          </span>
        </div>

        {/* Total price div */}

        <div className="flex gap-1 ">
          <span className="text-green-500 font-semibold">Total:</span>
          <span className="text-white">₹{totalPrice}</span>
        </div>

        <button
          onClick={makePayment}
          className="w-fit bg-green-500 px-4 p-1 rounded-xl font-semibold text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BookSlot;
