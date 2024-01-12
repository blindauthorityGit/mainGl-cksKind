// store.js
import create from "zustand";

const useStore = create((set) => ({
    showOverlay: false,
    setShowOverlay: (show) => set({ showOverlay: show }),

    showMobileMenu: false,
    setShowMobileMenu: (show) => set({ showMobileMenu: show }),

    showMobileModal: false,
    setShowMobileModal: (show) => set({ showMobileModal: show }),

    showModal: false,
    setShowModal: (show) =>
        set((state) => {
            if (!show) {
                // If the modal is being closed
                return { showModal: show, modalColor: "#ffffff" }; // Reset modalColor to white
            } else {
                return { showModal: show }; // Just open the modal without changing the color
            }
        }),

    isEventsModal: false,
    setIsEventsModal: (show) => set({ isEventsModal: show }),

    modalColor: "#ffffff",
    setModalColor: (show) => set({ modalColor: show }),

    openModal: (x, y) => set({ isModalOpen: true, modalPosition: { x, y } }),
    closeModal: () => set({ isModalOpen: false }),
    setModalPosition: (x, y) => set({ modalPosition: { x, y } }),

    modalContent: null,
    setModalContent: (content) => set({ modalContent: content }),

    isCafe: false,
    setIsCafe: (isCafe) => set({ isCafe }),
}));

export default useStore;
