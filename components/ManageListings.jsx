import { useSession } from "next-auth/react";
import React from "react";
import { AiFillEdit } from "react-icons/ai";
import { BsTrashFill } from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi";
import useModalState from "@/zustand/store";
import EditSite from "./EditSite";
import DeleteModal from "./DeleteModal";

const ManageListings = ({ sites }) => {
  const {
    closeManage,
    openEdit,
    isEditOpen,
    updateEditObject,
    confirmBoxOpen,
    openConfirmBox,
  } = useModalState();

  return (
    <main className="flex flex-col items-start mx-4 mt-3 h-screen bg-white gap-5 w-full fixed top-0 left-0">
      <BiArrowBack onClick={closeManage} size={24} />
      <div className="flex flex-col gap-5 w-[320px]">
        <div className="flex gap-3 items-center justify-between">
          <span className="font-bold text-xl">Name</span>
          <span className="font-bold text-xl">Actions</span>
        </div>
        {sites.map((site) => (
          <div className="flex items-center justify-between w-full">
            <div className="font-semibold">{site.listingName}</div>
            <div className="flex items-center gap-5">
              <AiFillEdit
                onClick={() => {
                  updateEditObject(site);
                  openEdit();
                }}
                size={24}
                className="text-green-500"
              />
              <BsTrashFill
                onClick={() => {
                  updateEditObject(site);
                  openConfirmBox();
                }}
                size={24}
                className="text-red-500"
              />
            </div>
          </div>
        ))}
      </div>
      {isEditOpen && <EditSite />}
      {confirmBoxOpen && <DeleteModal />}
    </main>
  );
};

export default ManageListings;
