import { create } from "zustand";

const useModalState = create((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),

  isManageOpen: false,
  openManage: () => set({ isManageOpen: true }),
  closeManage: () => set({ isManageOpen: false }),

  isEditOpen: false,
  openEdit: () => set({ isEditOpen: true }),
  closeEdit: () => set({ isEditOpen: false }),

  editObject: {},
  updateEditObject: (newObject) => set({ editObject: newObject }),
  resetEditObject: () => set({ editObject: {} }),

  confirmBoxOpen: false,
  openConfirmBox: () => set({ confirmBoxOpen: true }),
  closeConfirmBox: () => set({ confirmBoxOpen: false }),
}));

export default useModalState;
