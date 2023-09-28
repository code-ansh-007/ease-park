import CreateModal from "@/components/CreateModal";
import ManageListings from "@/components/ManageListings";
import { db } from "@/firebase";
import useModalState from "@/zustand/store";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { getSession } from "next-auth/react";
import React from "react";

const OwnerDash = ({ sites }) => {
  const {
    isOpen,
    closeModal,
    openModal,
    isManageOpen,
    openManage,
    closeManage,
  } = useModalState();

  return (
    <main className="flex flex-col items-center justify-center h-screen w-full gap-3">
      {/* create a new listing for parking lot */}
      <div>
        <button
          onClick={openModal}
          className="bg-blue-500 p-2 rounded-md text-white"
        >
          Create new listing
        </button>
      </div>
      {isOpen && <CreateModal />}
      {/* manage current listings */}
      <div>
        <button
          onClick={openManage}
          className="bg-blue-500 p-2 rounded-md text-white"
        >
          Manage Listings
        </button>

        {isManageOpen && <ManageListings sites={sites} />}
      </div>
      {/* manage site admins */}
      <div></div>
    </main>
  );
};

export default OwnerDash;

export async function getServerSideProps(context) {
  let sites = [];
  const { user } = await getSession(context);
  const uid = user.id;

  const q = query(collection(db, "listings"), where("ownerId", "==", uid));
  const qSnap = await getDocs(q);
  qSnap.forEach((doc) => {
    const siteData = doc.data();
    siteData.id = doc.id;
    if (siteData.timeStamp && siteData.timeStamp.seconds) {
      const serverTimestamp = new Date(siteData.timeStamp.seconds * 1000);
      siteData.timeStamp = serverTimestamp.toDateString();
    }
    sites.push(siteData);
  });
  return {
    props: {
      sites,
    },
  };
}
