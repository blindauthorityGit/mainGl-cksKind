import { useState, useEffect } from "react";

const Lightbox = ({ images, selectedImage, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(selectedImage);

    useEffect(() => {
        setCurrentIndex(selectedImage);
    }, [selectedImage]);

    const goToPrevious = () => {
        const isFirstImage = currentIndex === 0;
        const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const isLastImage = currentIndex === images.length - 1;
        const newIndex = isLastImage ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 z-50 flex justify-center items-center">
            <span className="absolute top-5 right-10 text-white text-4xl cursor-pointer" onClick={onClose}>
                &times;
            </span>
            <span className="absolute cursor-pointer top-1/2 left-5 text-white text-4xl" onClick={goToPrevious}>
                &#10094;
            </span>
            <span className="absolute cursor-pointer top-1/2 right-5 text-white text-4xl" onClick={goToNext}>
                &#10095;
            </span>
            <img src={images[currentIndex]} className="max-w-[80%] max-h-[80%]" alt="Lightbox" />
        </div>
    );
};

export default Lightbox;
