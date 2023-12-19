import Head from "next/head";
import { useState, useEffect } from "react";
import Image from "next/image";
import MainContainer from "../../components/layout/mainContainer";

// SANITY
import client from "../../client";

//COMPS
import { BasicHero } from "../../components/Hero";
import { EventSlider } from "../../components/slider";
import { PortableTextView } from "../../components/content";
import { LinkGrid } from "../../components/linkGrid";
import { Contact } from "../../components/content";

import Divider from "../../components/layout/divider";

import { BigDecal } from "../../components/decorative";
import { DecorativeDivider } from "../../components/decorative";
import FullWidthSection from "../../components/layout/fullWidthSection";

//FUNCTIONS
import changeBodyBackgroundColor from "../../functions/changeBodyBackgroundColor";

export default function KursOverview({ data, dataEvents, dataPartner, dataKontakt }) {
    const [filteredDataPartner, setFilteredDataPartner] = useState(null);

    useEffect(() => {
        console.log(dataEvents);
        console.log(data, dataPartner);
        // FILTER THE PARTNER
        const filterName = data.title;
        console.log(data.title);
        // const filteredDataPartner = dataPartner.filter((partner) => {
        //     // Check if the 'kurse' array exists and has at least one entry matching the desired category
        //     return partner.kurse && partner.kurse.some((kurs) => kurs.name === filterName);
        // });

        setFilteredDataPartner(
            dataPartner.filter((partner) => {
                // Check if the 'kurse' array exists and has at least one entry matching the desired category
                return partner.kurse && partner.kurse.some((kurs) => kurs.name === filterName);
            })
        );

        console.log(filteredDataPartner);
        changeBodyBackgroundColor(data);
    }, []);

    useEffect(() => {
        console.log(filteredDataPartner);
    }, [filteredDataPartner]);

    return (
        <>
            <MainContainer width="container mx-auto">
                <Head>
                    <title>Site title</title>
                </Head>

                <BasicHero data={data.components[0]}></BasicHero>
                <Divider></Divider>
                <PortableTextView
                    isWorkshop={data.title == "Beratung & Workshops"}
                    blocks={data.components[1].content}
                    data={data}
                ></PortableTextView>

                <Divider></Divider>
                <EventSlider isWorkshop={data.title == "Beratung & Workshops"} data={dataEvents}></EventSlider>

                <Divider></Divider>
                {filteredDataPartner && (
                    <LinkGrid
                        isWorkshop={data.title == "Beratung & Workshops"}
                        data={filteredDataPartner}
                        headline="Unsere Partner"
                    ></LinkGrid>
                )}
                <Divider></Divider>
            </MainContainer>{" "}
            <DecorativeDivider></DecorativeDivider>
            <FullWidthSection klasse="bg-[#fff] py-20 lg:!py-32">
                <Contact data={dataKontakt[0]}></Contact>
            </FullWidthSection>
            <BigDecal></BigDecal>
        </>
    );
}

export const getStaticPaths = async () => {
    const res = await client.fetch(`*[_type in ["kursInfo"] ]`);
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

    const res = await client.fetch(`*[_type == "kursInfo" && slug.current == "${slug}"] 
    `);
    const data = await res[0];

    const desiredCategoryName = data?.title;
    console.log(desiredCategoryName);

    const resEvents = await client.fetch(`
*[_type == "event" && kategorie->name == "${desiredCategoryName}"]{
    ...,
    kategorie->{...}
  }
`);

    const dataEvents = await resEvents;

    const resPartner = await client.fetch(`
    *[_type == "partner"] {
      ...,
      kurse[]->{
     ...
      }
    }
  `);

    const dataPartner = await resPartner;

    const resKontakt = await client.fetch(`
    *[_type == "kontakt"]
    `);

    const dataKontakt = await resKontakt;

    return {
        props: {
            data,
            dataEvents,
            dataPartner,
            dataKontakt,
        },
        revalidate: 1, // 10 seconds
    };
};
