import React from "react";

const Newsletter = () => {
    return (
        <div className="relative w-full h-full ">
            {" "}
            {/* This sets the aspect ratio to 16:9 */}
            <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://c32a7a86.sibforms.com/serve/MUIFAEi3C7GIfqdBkOmlz7V63c7S9t_Q4tcgPLoIAge7pJv2mHzvnOVX0gsX4upBA41ZOttTAyXtdiHiOqe4J7QRiuPhnoRfDoNp3RwMJIHzYzrTYhAuLsEQ1DuWgU21Wure1XIEXGAnCOR7niUI_0AP3uWXV8w_D4r-5Q7b7nk22nFFOsjAfP3lKQtXADO-j-5wsKDcFCImQz-Q"
                frameBorder="0"
                scrolling="auto"
                allowFullScreen
            ></iframe>
        </div>
    );
};

export default Newsletter;
