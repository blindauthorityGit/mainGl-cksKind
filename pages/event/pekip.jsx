import Head from "next/head";
import { useState, useEffect } from "react";
import Image from "next/image";
import MainContainer from "../../components/layout/mainContainer";
import { StickyContainer, Sticky } from "react-sticky";

// SANITY
import client from "../../client";

//COMPS
import { BasicHero, PekipHero } from "../../components/Hero";
import { PortableTextEvent, RegularText, AnmeldeContent, AnmeldeButton } from "../../components/content";
import { Contact } from "../../components/content";
import { Details } from "../../components/sidebar";
import { LinkGrid } from "../../components/linkGrid";
import PdfHolder from "../../components/pdf";
import PekipTermine from "../../components/pekip/pekipTermine";
import { Box } from "../../components/infoBox";
import PekipAnmeldung from "../../components/pekipAnmelden";
import FAQSection from "../../components/pekipFAQ";

import Divider from "../../components/layout/divider";

import { DecorativeDivider } from "../../components/decorative";
import FullWidthSection from "../../components/layout/fullWidthSection";
import OrderBoxes from "../../components/process";

import Meta from "../../components/SEO";

//FUNCTIONS
import changeBodyBackgroundColor from "../../functions/changeBodyBackgroundColor";
// ... other imports
import { useWindowDimensions } from "../../hooks/useWindowDimension";

export default function PEKIP({ data, dataKontakt, dataAllEvents, dataAllKategorie }) {
    const [isWorkshop, setIsWorkshop] = useState(false);
    const [filteredKategorie, setFilteredKategorie] = useState(false);

    const { width } = useWindowDimensions();
    const marginTopValue = width < 1440 ? "80px" : "128px";

    console.log("data", data, "kontakt", dataKontakt, dataAllEvents, dataAllKategorie);

    useEffect(() => {
        // FILTER THE PARTNER
        console.log(data);
        if (!data) {
            // Handle the case where data is undefined
            return;
        }

        const filterName = data.kategorie?.name;
        if (!filterName || !dataAllKategorie) {
            // Handle the case where filterName or dataAllKategorie is undefined
            return;
        }

        setFilteredKategorie(
            dataAllKategorie.filter((e) => {
                return e.name !== filterName;
            })
        );

        changeBodyBackgroundColor(data);
        setIsWorkshop(data.kategorie?.name == "Beratung & Coachings");
    }, [data]);

    const hasProdukteNoDates = (event) => {
        return event.produkte && event.produkte.length > 0 && !event.recurringDates && !event.blocks && !event.datum;
    };

    return (
        <>
            {data && dataKontakt && dataAllEvents && dataAllKategorie ? (
                <>
                    <MainContainer width="container mx-auto gap-8">
                        <Meta data={data.seo}></Meta>

                        <div className="grid grid-cols-12 w-full col-span-12">
                            {" "}
                            <PekipHero></PekipHero>
                            <Box sessions={data.recurringSessions} data={data}></Box>
                            <OrderBoxes></OrderBoxes>
                        </div>
                    </MainContainer>
                    <PekipAnmeldung></PekipAnmeldung>
                    <FAQSection></FAQSection>
                    <Divider></Divider>
                    {/* <MainContainer width="container mx-auto gap-8">
                        <Divider></Divider>
                        {filteredKategorie && (
                            <LinkGrid
                                isDetail
                                isWorkshop={isWorkshop}
                                data={filteredKategorie}
                                headline="Weitere Kurse"
                            ></LinkGrid>
                        )}
                        <div className="hidden 2xl:block">
                            <Divider></Divider>
                        </div>
                    </MainContainer> */}
                    {/* <DecorativeDivider></DecorativeDivider> */}
                    <FullWidthSection klasse="bg-[#fff] py-10 lg:!py-32">
                        <Contact data={dataKontakt[0]}></Contact>
                    </FullWidthSection>
                    {/* <BigDecal></BigDecal> */}
                </>
            ) : (
                <>LOADING</>
            )}
        </>
    );
}

export const getStaticProps = async ({ params }) => {
    // Fetch the single PEKiP doc by slug
    const res = await client.fetch(`
      *[_type == "pekip"]{
        ...,
        kategorie->{
          ...
        },
        eventDetails {
          ...,
          partner->{
            ...
          },
          location->{
            ...
          },
        },
        recurringSessions[]{
          ...,
          trainer-> {
          ...,
            _id,
            name,
            slug,
            image
          }
        },
        pdfUploads[]{
          pdfTitle,
          pdfText,
          buttonLabel,
          "pdfUrl": pdfFile.asset->url
        },
        seo{
          ...
        }
      }
    `);

    const data = res?.[0];

    // If no doc found, handle 404
    if (!data) {
        return { notFound: true };
    }

    const resKontakt = await client.fetch(`
        *[_type == "kontakt"]
        `);

    const dataKontakt = await resKontakt;

    const resAllEvents = await client.fetch(`
        *[_type == "event" && slug.current != "pekip-test"]{
            ...,
            kategorie->{...}
          }
        `);

    const dataAllEvents = await resAllEvents;

    const resKategorie = await client.fetch(`
        *[_type == "kategorie" ]
        `);

    const dataAllKategorie = await resKategorie;

    console.log(data, dataKontakt, dataAllEvents, dataAllKategorie);

    return {
        props: {
            data,
            dataKontakt,
            dataAllEvents,
            dataAllKategorie,
        },
        revalidate: 60, // e.g. 60 seconds
    };
};
