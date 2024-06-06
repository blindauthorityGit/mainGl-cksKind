import React from "react";
import { Form1 } from "../contactForm";

import { H2, H4, P } from "../typography";

import { CoverImage } from "../images";

//FUNCTIONS
import urlFor from "../../functions/urlFor";

// AOS
import AOS from "aos";
import "aos/dist/aos.css";

//ASSETS
// import Getreide from "../../assets/SVG/getreide.svg";

const Anfrage = ({ cafe, raum, kindergeburtstag, image }) => {
    return (
        <div className="container mx-auto grid grid-cols-12">
            <div className="brot col-span-12 xl:col-span-6 absolute bottom-10 right-[-2rem] w-72 opacity-[0.08]">
                {/* <img src={Getreide.src} alt="" /> */}
            </div>
            <div className="col-span-12 xl:col-span-6">
                <H2 klasse="mt-4 mb-6 !font-sans !font-semibold">
                    {cafe ? "Interesse an unseren Cafe Räumlichkeiten?" : null}
                    {raum ? "Interesse an unseren Räumlichkeiten?" : null}
                    {kindergeburtstag ? "Interesse an einer Feier bei uns?" : null}
                </H2>
                {cafe ? <P>Sie möchten unsere Cafe Räumlichkeiten anmieten?</P> : null}
                {raum ? <P>Sie möchten unsere Räumlichkeiten anmieten?</P> : null}
                {/* {kindergeburtstag ? <P>Sie möchten bei uns feiern?</P> : null} */}
                <Form1 raum={raum} kindergeburtstag={kindergeburtstag} cafe={cafe} contact />
            </div>
            <div className="xl:col-span-6 pl-8">
                <CoverImage
                    key={"imageresver"}
                    src={urlFor(image).url()}
                    mobileSrc={urlFor(image).url()}
                    alt="Cover Background"
                    // style={{ aspectRatio: data.image.length > 1 ? "1/2" : "1/1" }}
                    className={`w-full z-20 relative rounded-[40px] overflow-hidden aspect-[1/1.5] xl:aspect-[1/1.25]
                    }`}
                />
            </div>
        </div>
    );
};

export default Anfrage;
