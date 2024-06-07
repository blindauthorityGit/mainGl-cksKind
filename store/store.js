// store.js
import create from "zustand";

const useStore = create((set) => ({
    showOverlay: false,
    setShowOverlay: (show) => set({ showOverlay: show }),

    showMobileMenu: false,
    setShowMobileMenu: (show) => set({ showMobileMenu: show }),

    showMobileModal: false,
    setShowMobileModal: (show) => set({ showMobileModal: show }),

    isFullHeightModal: false,
    setIsFullHeightModal: (isFullHeight) => set({ isFullHeightModal: isFullHeight }),
    resetModalHeight: () => set({ isFullHeightModal: false }),

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

    formData: {},
    setFormData: (data) => set({ formData: data }),
    updateFormData: (newData) => set((state) => ({ formData: { ...state.formData, ...newData } })),
    resetFormData: () => set({ formData: {} }),

    openModal: (x, y) => set({ isModalOpen: true, modalPosition: { x, y } }),
    closeModal: () => set({ isModalOpen: false }),
    setModalPosition: (x, y) => set({ modalPosition: { x, y } }),

    modalContent: null,
    setModalContent: (content) => set({ modalContent: content }),

    dates: [],
    setDates: (newDates) => set({ dates: newDates }),

    isCafe: false,
    setIsCafe: (isCafe) => set({ isCafe }),

    cafeData: {}, // Initialisieren Sie cafeData als leeres Objekt
    setCafeData: (data) => set({ cafeData: data }), // Funktion zum Setzen von cafeData
    updateCafeData: (newData) =>
        set((state) => ({
            cafeData: { ...state.cafeData, ...newData },
        })), // Funktion zum Aktualisieren von cafeData
}));

export default useStore;
