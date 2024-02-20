import Head from "next/head";
import { useState, useEffect } from "react";
import Image from "next/image";
import MainContainer from "../../components/layout/mainContainer";
import { StickyContainer, Sticky } from "react-sticky";

// SANITY
import client from "../../client";

//COMPS
import { BasicHero } from "../../components/Hero";
import { EventSlider } from "../../components/slider";
import { PortableTextEvent, RegularText, AnmeldeContent } from "../../components/content";
import { Contact } from "../../components/content";
import { Details } from "../../components/sidebar";
import { LinkGrid } from "../../components/linkGrid";

import Divider from "../../components/layout/divider";

import { BigDecal } from "../../components/decorative";
import { DecorativeDivider } from "../../components/decorative";
import FullWidthSection from "../../components/layout/fullWidthSection";

import Meta from "../../components/SEO";

//FUNCTIONS
import changeBodyBackgroundColor from "../../functions/changeBodyBackgroundColor";
// ... other imports
import { useWindowDimensions } from "../../hooks/useWindowDimension";

export default function KursOverview({ data, dataKontakt, dataAllEvents, dataAllKategorie }) {
    const [isWorkshop, setIsWorkshop] = useState(false);
    const [filteredKategorie, setFilteredKategorie] = useState(false);

    const { width } = useWindowDimensions();
    const marginTopValue = width < 1440 ? "80px" : "128px";

    useEffect(() => {
        // FILTER THE PARTNER
        if (!data) {
            // Handle the case where data is undefined
            return;
        }
        console.log(data);
        console.log("IS PEKIP ? :", data.slug.current.includes("pekip"));
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
        setIsWorkshop(data.kategorie?.name == "Beratung & Workshops");
        console.log(data);
    }, [data]);

    return (
        <>
            {data && dataKontakt && dataAllEvents && dataAllKategorie ? (
                <>
                    <MainContainer width="container mx-auto gap-8">
                        <Meta data={data.seo}></Meta>

                        <StickyContainer className="grid grid-cols-12 w-full col-span-12">
                            <div className="col-span-12 lg:col-span-8 px-4 md:px-0">
                                {" "}
                                <BasicHero isEvent data={data}></BasicHero>
                                <PortableTextEvent
                                    isWorkshop={isWorkshop}
                                    blocks={data.content.content}
                                ></PortableTextEvent>
                                <Divider></Divider>
                                {!data.eventDetails.partner.isHidden && (
                                    <RegularText
                                        link={data.eventDetails.partner.slug.current}
                                        isWorkshop={isWorkshop}
                                        data={data.eventDetails.partner}
                                    ></RegularText>
                                )}
                            </div>
                            {/* //SIDEBAR */}
                            <div className="col-span-12 hidden lg:block md:col-span-4 lg:mt-28 lg:pl-16">
                                <Sticky distanceFromTop={280} topOffset={-128}>
                                    {({ style, isSticky }) => (
                                        <div
                                            style={{ ...style, marginTop: isSticky ? marginTopValue : "0px" }}
                                            className="col-span-3"
                                        >
                                            <Details isWorkshop={isWorkshop} data={data}></Details>{" "}
                                        </div>
                                    )}
                                </Sticky>
                            </div>
                        </StickyContainer>

                        <Divider></Divider>
                    </MainContainer>{" "}
                    <Divider></Divider>
                    <FullWidthSection klasse="bg-[#fff] py-10 lg:!py-16 2xl:!py-32">
                        <div className="col-span-12 lg:hidden px-6">
                            <Details isWorkshop={isWorkshop} isMobile={true} data={data}></Details>{" "}
                            <hr className="mb-4" />
                        </div>
                        <AnmeldeContent
                            email={data.eventDetails.partner.email}
                            events={data}
                            data={dataKontakt[0]}
                            isPekip={data.slug.current.includes("pekip")}
                        ></AnmeldeContent>
                    </FullWidthSection>
                    <MainContainer width="container mx-auto gap-8">
                        <div className="hidden md:block">
                            <Divider></Divider>
                        </div>
                        <EventSlider isWorkshop={isWorkshop} data={dataAllEvents}></EventSlider>
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
                    </MainContainer>
                    <DecorativeDivider></DecorativeDivider>
                    <FullWidthSection klasse="bg-[#fff] py-10 lg:!py-32">
                        <Contact data={dataKontakt[0]}></Contact>
                    </FullWidthSection>
                    <BigDecal></BigDecal>
                </>
            ) : (
                <>LOADING</>
            )}
        </>
    );
}

export const getStaticPaths = async () => {
    const res = await client.fetch(`*[_type in ["event"] ]`);
    const data = await res;

    const paths = data.map((e) => {
        return {
            params: { slug: e.slug.current },
        };
    });
    return {
        paths,
        fallback: true,
        // fallback: process.env.NEXT_DEV === "true" ? false : true,
    };
};

export const getStaticProps = async (context) => {
    const slug = context.params.slug;

    const res = await client.fetch(`
    *[_type == "event" && slug.current == "${slug}"]{
        ...,
        kategorie->{...},
        eventDetails {
            ...,
            partner->{...},
            location->{...},
        }
      }
      
  `);

    const data = await res[0];

    const resKontakt = await client.fetch(`
    *[_type == "kontakt"]
    `);

    const dataKontakt = await resKontakt;

    const resAllEvents = await client.fetch(`
    *[_type == "event" && slug.current != "${slug}"]{
        ...,
        kategorie->{...}
      }
    `);

    const dataAllEvents = await resAllEvents;

    const resKategorie = await client.fetch(`
    *[_type == "kategorie" ]
    `);

    const dataAllKategorie = await resKategorie;

    return {
        props: {
            data,
            dataKontakt,
            dataAllEvents,
            dataAllKategorie,
        },
        revalidate: 1, // 10 seconds
    };
};
