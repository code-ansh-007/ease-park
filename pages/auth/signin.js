import React, { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { v4 as uuid } from "uuid";
import { VT323 } from "next/font/google";

const vt = VT323({ subsets: ["latin"], weight: ["400"] });

import {
  collection,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/firebase";
import { useRouter } from "next/router";

const Signin = () => {
  const [showAdmin, setShowAdmin] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const { data: session } = useSession();

  // ? form states

  const [userFullName, setUserFullName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [adminFullName, setAdminFullName] = useState("");
  const [adminPhone, setAdminPhone] = useState("");

  const handlePhoneInputChange = (e, role) => {
    const inputPhoneNumber = e.target.value;
    // Use regular expression to allow only digits and limit to 10 characters
    const cleanedPhoneNumber = inputPhoneNumber.replace(/\D/g, "").slice(0, 10);
    role === "user"
      ? setUserPhone(cleanedPhoneNumber)
      : setAdminPhone(cleanedPhoneNumber);
  };

  const router = useRouter();

  const updateDetails = async (role) => {
    const q = query(
      collection(db, "users"),
      where("userId", "==", session.user.id)
    );
    const querySnap = await getDocs(q);
    if (querySnap.empty) return;
    const firstDoc = querySnap.docs[0];
    const docRef = firstDoc.ref;

    if (role === "user")
      await setDoc(
        docRef,
        {
          role: "user",
          userFullName,
          userPhone,
        },
        { merge: true }
      );
    else
      await setDoc(
        docRef,
        {
          role: "admin",
          adminFullName,
          adminPhone,
        },
        { merge: true }
      );
  };

  return (
    <div
      className={`flex flex-col items-center justify-center gap-10 h-screen bg-[#062145] ${vt.className}`}
    >
      <img src="/easepark.svg" className=""></img>
      {!session && (
        <div>
          <button
            onClick={() => {
              signIn("google", { callbackUrl: "/auth/signin" });
            }}
            className="bg-green-600 px-8 py-3 rounded-xl text-white text-xl"
          >
            Sign In with Google
          </button>
        </div>
      )}

      {/* details section */}
      {session && (
        <div className="flex flex-col items-center gap-3 ">
          {/* <button onClick={signOut} className="p-1 bg-red-500 text-white">
            log out
          </button> */}
          <span className="text-xl font-semibold text-white">
          </span>
          <div className="flex flex-col gap-5 items-center w-full">
            <span
              className={`p-2 bg-[#5ee65a] active:scale-110 transition transform duration-300 border-2 border-green-500 rounded-2xl  font-bold w-full text-center ${
                showUser
                  ? "bg-gray-200 text-gray-500 border-gray-600"
                  : "text-white"
              }`}
              onClick={() => {
                setShowUser(true);
                setShowAdmin(false);
              }}
            >
              User
            </span>
            <span
              className={`p-2 bg-[#5ee65a] active:scale-110 transition transform duration-300 border-2 border-green-500 rounded-2xl  font-bold w-full text-center ${
                showAdmin
                  ? "bg-gray-200 text-gray-500 border-gray-600"
                  : "text-white"
              }`}
              onClick={() => {
                setShowAdmin(true);
                setShowUser(false);
              }}
            >
              Admin
            </span>
            {showUser && (
              <div className="flex flex-col items-start gap-3">
                <div className="flex flex-col items-start gap-1">
                  <label
                    htmlFor="userFullName"
                    className="text-white font-semibold"
                  >
                    User Full Name
                  </label>
                  <input
                    id="userFullName"
                    type="text"
                    value={userFullName}
                    onChange={(e) => setUserFullName(e.target.value)}
                    placeholder="Enter full name..."
                    className="text-white p-2 rounded-xl outline-none bg-transparent border-2 border-green-500"
                  />
                </div>
                <div className="flex flex-col items-start gap-1">
                  <label
                    htmlFor="userPhoneNumber"
                    className="text-white font-semibold"
                  >
                    User Phone Number
                  </label>
                  <input
                    id="userPhoneNumber"
                    type="number"
                    maxLength={10}
                    value={userPhone}
                    onChange={(e) => handlePhoneInputChange(e, "user")}
                    placeholder="e.g. 1234567890"
                    className="text-white p-2 rounded-xl outline-none bg-transparent border-2 border-green-500"
                  />
                </div>
                {userPhone.length === 10 && userFullName !== "" && (
                  <button
                    onClick={() => {
                      updateDetails("user");
                      router.push("/mainHome");
                    }}
                    className={`p-1  bg-green-400 active:scale-110 transition transform duration-300 border-2 border-green-500 rounded-2xl  font-bold w-full text-center `}
                  >
                    Submit
                  </button>
                )}
              </div>
            )}
            {showAdmin && (
              <div className="flex flex-col items-start gap-3">
                <div className="flex flex-col items-start gap-1">
                  <label
                    htmlFor="userFullName"
                    className="text-white font-semibold"
                  >
                    Admin Full Name
                  </label>
                  <input
                    id="userFullName"
                    type="text"
                    value={adminFullName}
                    onChange={(e) => setAdminFullName(e.target.value)}
                    placeholder="Enter full name..."
                    className="text-white p-2 rounded-xl outline-none bg-transparent border-2 border-green-500"
                  />
                </div>
                <div className="flex flex-col items-start gap-1">
                  <label
                    htmlFor="userPhoneNumber"
                    className="text-white font-semibold"
                  >
                    Admin Phone Number
                  </label>
                  <input
                    id="userPhoneNumber"
                    type="number"
                    maxLength={10}
                    value={adminPhone}
                    onChange={(e) => handlePhoneInputChange(e, "admin")}
                    placeholder="e.g. 1234567890"
                    className="text-white p-2 rounded-xl outline-none bg-transparent border-2 border-green-500"
                  />
                </div>
                {adminPhone.length === 10 && adminFullName !== "" && (
                  <button
                    onClick={() => {
                      updateDetails("admin");
                      router.push("/mainHome");
                    }}
                    className={`p-1  bg-green-400 active:scale-110 transition transform duration-300 border-2 border-green-500 rounded-2xl  font-bold w-full text-center  `}
                  >
                    Submit
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Signin;
