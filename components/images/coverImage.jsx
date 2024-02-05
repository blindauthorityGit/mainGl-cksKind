import React, { forwardRef, useState } from "react";
import Image from "next/image";
import BeatLoader from "react-spinners/BeatLoader";

const CoverImage = (
    { src, mobileSrc, alt, height, klasse, onClick, width, position, className, style, aspectRatio },
    ref
) => {
    const [isLoading, setLoading] = useState(true);

    const handleLoadingComplete = () => {
        setLoading(false);
    };

    // Style object for the loader container
    const loaderContainerStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%", // Ensure parent container has height
        position: "absolute", // Position it over the image
        width: "100%", // Take full width of the parent
        top: 0,
        left: 0,
        zIndex: 10, // Higher z-index to show above the image
    };

    return (
        <div
            ref={ref}
            style={{
                position: position,
                ...style,
            }}
            className={className}
        >
            {/* Spinner Container */}
            {isLoading && (
                <div style={loaderContainerStyle}>
                    <BeatLoader size={10} color="#55476B" />
                </div>
            )}

            {/* Mobile Image */}
            {mobileSrc && (
                <Image
                    src={mobileSrc}
                    alt={alt}
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                    className={`block lg:hidden ${klasse}`}
                    onClick={onClick}
                    style={{ aspectRatio: aspectRatio }}
                    onLoadingComplete={handleLoadingComplete}
                />
            )}

            {/* Desktop Image */}
            {src && (
                <Image
                    src={src}
                    alt={alt}
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                    className={`hidden lg:block ${klasse}`}
                    onClick={onClick}
                    style={{ aspectRatio: aspectRatio }}
                    onLoadingComplete={handleLoadingComplete}
                />
            )}
        </div>
    );
};

export default forwardRef(CoverImage);
