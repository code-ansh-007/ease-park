import React, { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { v4 as uuid } from "uuid";
import {
  collection,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/firebase";

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
          userFullName,
          userPhone,
        },
        { merge: true }
      );
    else
      await setDoc(
        docRef,
        {
          adminFullName,
          adminPhone,
        },
        { merge: true }
      );
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {!session && (
        <div>
          <button
            onClick={() => {
              signIn("google", { callbackUrl: "/auth/signin" });
            }}
            className="bg-blue-500 p-2 rounded-xl text-white"
          >
            Sign In with Google
          </button>
        </div>
      )}

      {/* details section */}
      {session && (
        <div className="flex flex-col items-center gap-3">
          <button onClick={signOut} className="p-1 bg-red-500 text-white">
            log out
          </button>
          <span className="text-xl font-semibold">Who are you ?</span>
          <div className="flex flex-col gap-3 items-center">
            <span
              className="p-2 bg-blue-500 text-white"
              onClick={() => {
                setShowUser(true);
                setShowAdmin(false);
              }}
            >
              User
            </span>
            <span
              className="p-2 bg-blue-500 text-white"
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
                  <label htmlFor="userFullName">User Full Name</label>
                  <input
                    id="userFullName"
                    type="text"
                    value={userFullName}
                    onChange={(e) => setUserFullName(e.target.value)}
                    placeholder="Enter full name..."
                    className="border-[1px] border-neutral-800 p-2 rounded-xl outline-none"
                  />
                </div>
                <div className="flex flex-col items-start gap-1">
                  <label htmlFor="userPhoneNumber">User Phone Number</label>
                  <input
                    id="userPhoneNumber"
                    type="number"
                    maxLength={10}
                    value={userPhone}
                    onChange={(e) => handlePhoneInputChange(e, "user")}
                    placeholder="e.g. 1234567890"
                    className="border-[1px] border-neutral-800 p-2 rounded-xl outline-none"
                  />
                </div>
                {userPhone.length === 10 && userFullName !== "" && (
                  <button
                    onClick={() => {
                      updateDetails("admin");
                    }}
                    className="p-1 bg-blue-500 text-white"
                  >
                    Submit
                  </button>
                )}
              </div>
            )}
            {showAdmin && (
              <div className="flex flex-col items-start gap-3">
                <div className="flex flex-col items-start gap-1">
                  <label htmlFor="userFullName">Admin Full Name</label>
                  <input
                    id="userFullName"
                    type="text"
                    value={adminFullName}
                    onChange={(e) => setAdminFullName(e.target.value)}
                    placeholder="Enter full name..."
                    className="border-[1px] border-neutral-800 p-2 rounded-xl outline-none"
                  />
                </div>
                <div className="flex flex-col items-start gap-1">
                  <label htmlFor="userPhoneNumber">Admin Phone Number</label>
                  <input
                    id="userPhoneNumber"
                    type="number"
                    maxLength={10}
                    value={adminPhone}
                    onChange={(e) => handlePhoneInputChange(e, "admin")}
                    placeholder="e.g. 1234567890"
                    className="border-[1px] border-neutral-800 p-2 rounded-xl outline-none"
                  />
                </div>
                {adminPhone.length === 10 && adminFullName !== "" && (
                  <button
                    onClick={() => {
                      updateDetails("admin");
                    }}
                    className="p-1 bg-blue-500 text-white"
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
