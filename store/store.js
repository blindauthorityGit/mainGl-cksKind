// store.js
import create from "zustand";

const useStore = create((set) => ({
    showOverlay: false,
    setShowOverlay: (show) => set({ showOverlay: show }),
    isModalOpen: false,
    modalPosition: { x: 0, y: 0 },
    openModal: (x, y) => set({ isModalOpen: true, modalPosition: { x, y } }),
    closeModal: () => set({ isModalOpen: false }),
    setModalPosition: (x, y) => set({ modalPosition: { x, y } }),
    modalContent: null,
    setModalContent: (content) => set({ modalContent: content }),
}));

export default useStore;
