import Head from "next/head";
import { useEffect } from "react";
import dynamic from "next/dynamic";

import MainContainer from "../components/layout/mainContainer";

// SANITY
import client from "../client";

//COMPS
const Meta = dynamic(() => import("../components/SEO"));
const MainHero = dynamic(() => import("../components/Hero/mainHero"));

const EventSlider = dynamic(() => import("../components/slider").then((mod) => mod.EventSlider));
const CardHolder = dynamic(() => import("../components/cards").then((mod) => mod.CardHolder));
const ContentCard = dynamic(() => import("../components/cards").then((mod) => mod.ContentCard));
const Divider = dynamic(() => import("../components/layout/divider").then((mod) => mod.default));
const FullWidthSection = dynamic(() => import("../components/layout/fullWidthSection").then((mod) => mod.default));
const CTAContent = dynamic(() => import("../components/content").then((mod) => mod.CTAContent));
const TextImage = dynamic(() => import("../components/content").then((mod) => mod.TextImage));
const Contact = dynamic(() => import("../components/content").then((mod) => mod.Contact));
const BigDecal = dynamic(() => import("../components/decorative").then((mod) => mod.BigDecal));
const DecorativeDivider = dynamic(() => import("../components/decorative").then((mod) => mod.DecorativeDivider));
const FullWidthSectionBGImage = dynamic(() =>
    import("../components/layout/fullWidthSectionBGImage").then((mod) => mod.default)
);

//FUNCTIONS
import changeBodyBackgroundColor from "../functions/changeBodyBackgroundColor";

export default function Home({ dataHome, dataEvents, dataKategorie, dataKontakt }) {
    useEffect(() => {
        changeBodyBackgroundColor(dataHome);
    }, []);
    return (
        <>
            <MainContainer width="container mx-auto">
                <Meta data={dataHome.seo}></Meta>
                <MainHero data={dataHome.components[0]}></MainHero>
                {/* <Divider></Divider> */}

                {/* <EventSlider data={dataEvents}></EventSlider> */}
                {/* <Divider></Divider> */}
                <Divider></Divider>
                <CardHolder data={dataKategorie}></CardHolder>
                <Divider></Divider>
            </MainContainer>
            {/* <FullWidthSection klasse="bg-[#AFD3A2] py-20 2xl:!py-32">
                <CTAContent data={dataHome.components[3]}></CTAContent>
            </FullWidthSection> */}
            <FullWidthSectionBGImage klasse="" image={dataHome.components[6].image}>
                <ContentCard data={dataHome.components[6]}></ContentCard>
            </FullWidthSectionBGImage>
            <MainContainer width="container mx-auto">
                <div className="mt-8 lg:mt-0"></div>
                <TextImage richText overlap data={dataHome.components[4]}></TextImage>
                <TextImage richText data={dataHome.components[5]}></TextImage>
            </MainContainer>
            <MainContainer width="container mx-auto">
                <TextImage richText overlap data={dataHome.components[7]}></TextImage>
            </MainContainer>
            <Divider></Divider>

            <DecorativeDivider></DecorativeDivider>
            <FullWidthSection klasse="bg-[#fff] py-8 lg:!py-32">
                <Contact data={dataKontakt[0]}></Contact>
            </FullWidthSection>

            {/* <BigDecal></BigDecal> */}
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
