import React, { useEffect } from "react";

// TYPO
import { H2, H4, P } from "../typography";
import { TextButton } from "../buttons";

import urlFor from "../../functions/urlFor";

const PdfHolder = ({ data }) => {
    useEffect(() => {
        console.log(data);
    }, []);

    return (
        <div className="mt-16 block">
            <H2 klasse="col-span-12 pl-6 ">Material</H2>

            <div className="col-span-12 grid grid-cols-12 lg:gap-3 2xl:gap-8 px-6 xl:px-6 2xl:px-24">
                {data.map((pdf, i) => {
                    return (
                        <div key={i} className="col-span-12 lg:col-span-4 p-4 mb-6  rounded-lg">
                            <H4>{pdf.pdfTitle}</H4>
                            <P>{pdf.pdfText}</P>
                            <TextButton
                                klasse="mt-4 font-bold lg:!text-2xl"
                                link={pdf.pdfUrl}
                                // onClick={() => window.open(pdf.pdfFile.asset.url, "_blank")}
                            >
                                {pdf.buttonLabel}
                            </TextButton>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PdfHolder;
