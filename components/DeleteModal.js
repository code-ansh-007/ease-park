import { db } from "@/firebase";
import useModalState from "@/zustand/store";
import { deleteDoc, doc } from "firebase/firestore";
import React from "react";

const DeleteModal = () => {
  const { editObject, closeConfirmBox } = useModalState();
  const handleClose = (e) => {
    if (
      e.target.className ===
      "flex flex-col items-center justify-center h-screen bg-black/50 w-full fixed left-0 top-0"
    )
      closeModal();
    else return;
  };

  const deleteObject = async () => {
    try {
      const id = editObject.id;
      await deleteDoc(doc(db, "listings", id));
      alert("successfully deleted document");
    } catch (error) {
      alert("could not delete document");
    }
  };

  return (
    <main
      onClick={handleClose}
      className="flex flex-col items-center justify-center h-screen bg-black/50 w-full fixed left-0 top-0"
    >
      <div className="bg-white p-2 rounded-xl flex flex-col items-center gap-5 w-[335px]">
        <div className="font-semibold text-xl text-center">
          Are You Sure you want to delete this listing ?
        </div>
        <div className="flex items-center gap-10">
          <button
            onClick={() => {
              deleteObject();
              closeConfirmBox();
            }}
            className="p-1 bg-red-500 px-4 text-white rounded-xl"
          >
            Yes
          </button>
          <button
            onClick={() => {
              closeConfirmBox();
            }}
            className="p-1 bg-green-500 px-4 text-white rounded-xl"
          >
            No
          </button>
        </div>
      </div>
    </main>
  );
};

export default DeleteModal;
