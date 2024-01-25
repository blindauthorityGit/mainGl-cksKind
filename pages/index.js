import Head from "next/head";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import MainContainer from "../components/layout/mainContainer";

// SANITY
import client from "../client";

//COMPS
import Meta from "../components/SEO";
import { MainHero } from "../components/Hero";
import { EventSlider } from "../components/slider";
import { CardHolder } from "../components/cards";
import { ContentCard } from "../components/cards";
import Divider from "../components/layout/divider";
import FullWidthSection from "../components/layout/fullWidthSection";
import { CTAContent } from "../components/content";
import { TextImage, TextImagePortableText } from "../components/content";
import { Contact } from "../components/content";
import { BigDecal } from "../components/decorative";
import { DecorativeDivider } from "../components/decorative";
import FullWidthSectionBGImage from "../components/layout/fullWidthSectionBGImage";

//FUNCTIONS
import changeBodyBackgroundColor from "../functions/changeBodyBackgroundColor";

export default function Home({ dataHome, dataEvents, dataKategorie, dataKontakt }) {
    useEffect(() => {
        console.log(dataHome, dataEvents, dataKategorie, dataKontakt);
        changeBodyBackgroundColor(dataHome);
    }, []);
    return (
        <>
            <MainContainer width="container mx-auto">
                <Meta data={dataHome.seo}></Meta>
                <MainHero data={dataHome.components[0]}></MainHero>
                <Divider></Divider>

                <EventSlider data={dataEvents}></EventSlider>
                <Divider></Divider>
                <Divider></Divider>
                <CardHolder data={dataKategorie}></CardHolder>
                <Divider></Divider>

                {/* <h1 className="font-sans">Hallo ich bin ein Textor</h1> */}
            </MainContainer>
            <FullWidthSection klasse="bg-[#AFD3A2] py-20 2xl:!py-32">
                <CTAContent data={dataHome.components[3]}></CTAContent>
            </FullWidthSection>
            <FullWidthSectionBGImage klasse="]" image={dataHome.components[6].image}>
                <ContentCard data={dataHome.components[6]}></ContentCard>
            </FullWidthSectionBGImage>
            <MainContainer width="container mx-auto">
                <div className="mt-8 lg:mt-0"></div>
                <TextImage richText overlap data={dataHome.components[4]}></TextImage>
                <TextImage richText data={dataHome.components[5]}></TextImage>
            </MainContainer>
            {/* <FullWidthSectionBGImage klasse="lg:mt-[-4rem]" image={dataHome.components[6].image}>
                <ContentCard data={dataHome.components[6]}></ContentCard>
            </FullWidthSectionBGImage> */}
            <MainContainer width="container mx-auto">
                <TextImage richText overlap data={dataHome.components[7]}></TextImage>
            </MainContainer>
            <Divider></Divider>

            <DecorativeDivider></DecorativeDivider>
            <FullWidthSection klasse="bg-[#fff] py-8 lg:!py-32">
                <Contact data={dataKontakt[0]}></Contact>
            </FullWidthSection>

            <BigDecal></BigDecal>
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
    const resKontakt = await client.fetch(`
*[_type == "kontakt"]
`);

    const dataHome = await resHome;
    const dataEvents = await resEvents;
    const dataKategorie = await resKategorie;
    const dataKontakt = await resKontakt;

    return {
        props: {
            dataHome,
            dataEvents,
            dataKategorie,
            dataKontakt,
        },
        revalidate: 1, // 10 seconds
    };
};
