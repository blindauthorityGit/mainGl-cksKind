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
import { ContentCard } from "../../components/cards";

import Divider from "../../components/layout/divider";

import { BigDecal } from "../../components/decorative";
import { DecorativeDivider } from "../../components/decorative";
import FullWidthSectionBGImage from "../../components/layout/fullWidthSectionBGImage";

//FUNCTIONS
import changeBodyBackgroundColor from "../../functions/changeBodyBackgroundColor";

export default function Schwangerschaft({ dataSchwangerschaft, dataEvents }) {
    useEffect(() => {
        console.log(dataEvents);
        console.log(dataSchwangerschaft);
        changeBodyBackgroundColor(dataSchwangerschaft);
    }, []);
    return (
        <>
            <MainContainer width="container mx-auto">
                <Head>
                    <title>Site title</title>
                </Head>

                <BasicHero data={dataSchwangerschaft.components[0]}></BasicHero>
                <Divider></Divider>
                <PortableTextView
                    blocks={dataSchwangerschaft.components[1].content}
                    data={dataSchwangerschaft}
                ></PortableTextView>

                <Divider></Divider>
                <EventSlider data={dataEvents}></EventSlider>

                <Divider></Divider>
                {/* <h1 className="font-sans">Hallo ich bin ein Textor</h1> */}
            </MainContainer>

            <BigDecal></BigDecal>
        </>
    );
}

export const getStaticProps = async (context) => {
    const resSchwangerschaft = await client.fetch(`
    *[_type == "schwangerschaft"][0]
`);

    const resEvents = await client.fetch(`
*[_type == "event"]{
    ...,
    kategorie->{...}
  }
`);

    const dataSchwangerschaft = await resSchwangerschaft;
    const dataEvents = await resEvents;

    return {
        props: {
            dataSchwangerschaft,
            dataEvents,
        },
        revalidate: 1, // 10 seconds
    };
};
