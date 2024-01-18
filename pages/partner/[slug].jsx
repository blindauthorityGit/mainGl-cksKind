import Head from "next/head";
import { useState, useEffect } from "react";
import Image from "next/image";
import MainContainer from "../../components/layout/mainContainer";

// SANITY
import client from "../../client";

//COMPS
import { BasicHero } from "../../components/Hero";
import { EventSlider } from "../../components/slider";
import { PortableTextView, BasicPortableText } from "../../components/content";
import { LinkGrid } from "../../components/linkGrid";
import { Contact } from "../../components/content";

import Divider from "../../components/layout/divider";

import { BigDecal } from "../../components/decorative";
import { DecorativeDivider } from "../../components/decorative";
import FullWidthSection from "../../components/layout/fullWidthSection";

//FUNCTIONS
import changeBodyBackgroundColor from "../../functions/changeBodyBackgroundColor";

export default function Partner({ data, dataKontakt, dataEvent }) {
    const [filteredEvents, setFilteredEvents] = useState(null);
    useEffect(() => {
        changeBodyBackgroundColor("");
    }, []);
    useEffect(() => {
        const partnerName = data.name;
        setFilteredEvents(dataEvent.filter((event) => event.eventDetails.partner.name === partnerName));
    }, [data, dataEvent]);

    return (
        <>
            {data && dataKontakt && filteredEvents ? (
                <>
                    <MainContainer width="container mx-auto px-4 lg:px-0">
                        <Head>
                            <title>Site title</title>
                        </Head>

                        <BasicHero data={data}></BasicHero>
                        <Divider></Divider>
                        <div className="col-span-12 lg:col-span-9 richText lg:ml-64">
                            <BasicPortableText value={data.text.content} data={data}></BasicPortableText>
                        </div>
                        <Divider></Divider>
                        {filteredEvents.length > 0 && <EventSlider data={filteredEvents}></EventSlider>}

                        <Divider></Divider>
                        <div className="block lg:hidden">
                            <Divider></Divider>
                        </div>
                        {/* {filteredDataPartner && (
                            <LinkGrid
                                isWorkshop={data.title == "Beratung & Workshops"}
                                data={filteredDataPartner}
                                headline="Unsere Partner"
                            ></LinkGrid>
                        )} */}
                        <Divider></Divider>
                    </MainContainer>

                    <DecorativeDivider></DecorativeDivider>
                    <FullWidthSection klasse="bg-[#fff] py-10 lg:!py-32">
                        <Contact data={dataKontakt[0]}></Contact>
                    </FullWidthSection>
                    <BigDecal></BigDecal>
                </>
            ) : (
                <>"Loading"</>
            )}
        </>
    );
}

export const getStaticPaths = async () => {
    const res = await client.fetch(`*[_type in ["partner"] ]`);
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

    const res = await client.fetch(`*[_type == "partner" && slug.current == "${slug}"] 
    `);
    const data = await res[0];

    const resKontakt = await client.fetch(`
    *[_type == "kontakt"]
    `);

    const dataKontakt = await resKontakt;

    const query = `*[_type == "event"]{
                ...,
                kategorie->{...},
                eventDetails {
                    ...,
                    partner->{...},
                    location->{...},
                }
             }
    `;

    // const query = `*[_type == "event" && eventDetails.partner.name == ${partnerName}]
    // `;

    // Debugging: Log the query
    console.log("Query:", query);

    const resEvent = await client.fetch(query);
    const dataEvent = await resEvent;

    return {
        props: {
            data,
            dataEvent,
            dataKontakt,
        },
        revalidate: 1, // 10 seconds
    };
};
