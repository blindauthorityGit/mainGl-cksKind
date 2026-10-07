// pages/testModal.jsx
import React from "react";
import { StartModal } from "../components/modalContent";

const TestModal = () => {
    const testData = { text: "Test content for StartModal" };
    return <StartModal data={testData} />;
};

export default TestModal;
