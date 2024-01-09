import Head from "next/head";
import { useState, useEffect } from "react";
import Image from "next/image";
import MainContainer from "../../components/layout/mainContainer";

// SANITY
import client from "../../client";

//COMPS
import { BasicHero } from "../../components/Hero";
import { LinkGrid } from "../../components/linkGrid";
import { PortableTextView, Contact } from "../../components/content";
import { TextImage2 } from "../../components/content";

import Divider from "../../components/layout/divider";

import { BigDecal } from "../../components/decorative";
import { DecorativeDivider } from "../../components/decorative";
import FullWidthSection from "../../components/layout/fullWidthSection";

//FUNCTIONS
import changeBodyBackgroundColor from "../../functions/changeBodyBackgroundColor";

export default function Ueberuns({ dataAbout, dataPartner, dataKontakt }) {
    useEffect(() => {
        console.log(dataAbout);
        console.log(dataPartner);
        changeBodyBackgroundColor(dataAbout);
    }, []);
    return (
        <>
            <MainContainer width="container mx-auto px-4 lg:px-0">
                <Head>
                    <title>Site title</title>
                </Head>

                <BasicHero data={dataAbout.components[0]}></BasicHero>
                <Divider></Divider>
                <PortableTextView blocks={dataAbout.components[1].content} data={dataAbout}></PortableTextView>

                <Divider></Divider>
                <Divider></Divider>
                <TextImage2 data={dataAbout.components[2]}></TextImage2>
                <TextImage2 data={dataAbout.components[3]}></TextImage2>
                {/* <EventSlider data={dataEvents}></EventSlider> */}

                <Divider></Divider>
                <Divider></Divider>

                <LinkGrid data={dataPartner} headline="Unsere Partner"></LinkGrid>

                {/* <h1 className="font-sans">Hallo ich bin ein Textor</h1> */}
            </MainContainer>
            <DecorativeDivider></DecorativeDivider>
            <FullWidthSection klasse="bg-[#fff] py-10 lg:!py-32">
                <Contact data={dataKontakt[0]}></Contact>
            </FullWidthSection>
            <BigDecal></BigDecal>

            <BigDecal></BigDecal>
        </>
    );
}

export const getStaticProps = async (context) => {
    const resData = await client.fetch(`
    *[_type == "ueberuns"][0]
`);

    const resPartner = await client.fetch(`
    *[_type == "partner"]
`);

    const resKontakt = await client.fetch(`
*[_type == "kontakt"]
`);

    const dataAbout = await resData;
    const dataPartner = await resPartner;
    const dataKontakt = await resKontakt;

    return {
        props: {
            dataAbout,
            dataPartner,
            dataKontakt,
        },
        revalidate: 1, // 10 seconds
    };
};
