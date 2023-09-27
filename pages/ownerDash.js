import CreateModal from "@/components/CreateModal";
import useModalState from "@/zustand/store";
import React from "react";

const OwnerDash = () => {
  const { isOpen, closeModal, openModal } = useModalState();
  return (
    <main className="flex flex-col items-center justify-center h-screen w-full">
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
      <div></div>
      {/* manage site admins */}
      <div></div>
    </main>
  );
};

export default OwnerDash;
