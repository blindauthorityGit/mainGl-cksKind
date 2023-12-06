import Head from "next/head";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import MainContainer from "../components/layout/mainContainer";

// SANITY
import client from "../client";

//COMPS
import { MainHero } from "../components/Hero";
import { EventSlider } from "../components/slider";
import { CardHolder } from "../components/cards";
import Divider from "../components/layout/divider";
import FullWidthSection from "../components/layout/fullWidthSection";
import { CTAContent } from "../components/content";

//FUNCTIONS
import changeBodyBackgroundColor from "../functions/changeBodyBackgroundColor";

export default function Home({ dataHome, dataEvents, dataKategorie }) {
    useEffect(() => {
        console.log(dataHome, dataEvents, dataKategorie);
        changeBodyBackgroundColor(dataHome);
    }, []);
    return (
        <>
            <MainContainer width="container mx-auto">
                <Head>
                    <title>Site title</title>
                </Head>
                <MainHero data={dataHome.components[0]}></MainHero>
                <Divider></Divider>

                <EventSlider data={dataEvents}></EventSlider>
                <Divider></Divider>
                <Divider></Divider>
                <CardHolder data={dataKategorie}></CardHolder>
                {/* <h1 className="font-sans">Hallo ich bin ein Textor</h1> */}
            </MainContainer>
            <FullWidthSection klasse="bg-[#AFD3A2]">
                <CTAContent data={dataHome.components[3]}></CTAContent>
            </FullWidthSection>
        </>
    );
}

export const getStaticProps = async (context) => {
    const resHome = await client.fetch(`
  *[_type == "home"][0]
`);
    const resEvents = await client.fetch(`
    *[_type == "event"]{
        ...,
        kategorie->{...}
      }
`);
    const resKategorie = await client.fetch(`
*[_type == "kategorie"]
`);

    const dataHome = await resHome;
    const dataEvents = await resEvents;
    const dataKategorie = await resKategorie;

    return {
        props: {
            dataHome,
            dataEvents,
            dataKategorie,
        },
        revalidate: 1, // 10 seconds
    };
};
