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

//FUNCTIONS
import changeBodyBackgroundColor from "../../functions/changeBodyBackgroundColor";

export default function KursOverview({ data, dataKontakt, dataAllEvents, dataAllKategorie }) {
    const [isWorkshop, setIsWorkshop] = useState(false);
    const [filteredKategorie, setFilteredKategorie] = useState(false);

    useEffect(() => {
        // FILTER THE PARTNER
        if (!data) {
            // Handle the case where data is undefined
            return;
        }
        console.log(data);
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
    }, [data]);

    return (
        <>
            {data && dataKontakt && dataAllEvents && dataAllKategorie ? (
                <>
                    <MainContainer width="container mx-auto gap-8">
                        <Head>
                            <title>Site title</title>
                        </Head>
                        <StickyContainer className="grid grid-cols-12 w-full col-span-12">
                            <div className="col-span-12 md:col-span-8 px-4 md:px-0">
                                {" "}
                                <BasicHero isEvent data={data}></BasicHero>
                                <PortableTextEvent
                                    isWorkshop={isWorkshop}
                                    blocks={data.content.content}
                                ></PortableTextEvent>
                                <RegularText isWorkshop={isWorkshop} data={data.eventDetails.partner}></RegularText>
                            </div>
                            {/* //SIDEBAR */}
                            <div className="col-span-12 hidden md:block md:col-span-4 lg:mt-28 lg:pl-16">
                                <Sticky distanceFromTop={280} topOffset={-128}>
                                    {({ style, isSticky }) => (
                                        <div
                                            style={{ ...style, marginTop: isSticky ? "128px" : "0px" }}
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
                    <FullWidthSection klasse="bg-[#fff] py-20 lg:!py-32">
                        <AnmeldeContent data={dataKontakt[0]}></AnmeldeContent>
                    </FullWidthSection>
                    <MainContainer width="container mx-auto gap-8">
                        <Divider></Divider>

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
                        <Divider></Divider>
                    </MainContainer>
                    <DecorativeDivider></DecorativeDivider>
                    <FullWidthSection klasse="bg-[#fff] py-20 lg:!py-32">
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
