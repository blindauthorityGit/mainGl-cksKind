import Head from "next/head";
import { useState, useEffect } from "react";
import Image from "next/image";
import MainContainer from "../../components/layout/mainContainer";

// SANITY
import client from "../../client";

//COMPS
import { BasicHero } from "../../components/Hero";
import { EventSlider } from "../../components/slider";
import { PortableTextView, TextImage } from "../../components/content";
import { ListItem } from "../../components/list";
import { Contact } from "../../components/content";
import { CardButtonHolder } from "../../components/cards";
import { H3, H4, P } from "../../components/typography";
import { GridGallery } from "../../components/gallery";

import Divider from "../../components/layout/divider";

import { BigDecal } from "../../components/decorative";
import { DecorativeDivider } from "../../components/decorative";
import FullWidthSection from "../../components/layout/fullWidthSection";

//FUNCTIONS
import changeBodyBackgroundColor from "../../functions/changeBodyBackgroundColor";

export default function Cafe({ data, dataSpeisekarte, dataKontakt }) {
    useEffect(() => {
        console.log(data, dataSpeisekarte, dataKontakt);
        changeBodyBackgroundColor(data);
    }, []);

    return (
        <>
            <MainContainer width="container mx-auto">
                <Head>
                    <title>Site title</title>
                </Head>

                <BasicHero data={data.components[0]}></BasicHero>
                <CardButtonHolder data={data.components[1].cardButtons} klasse="mt-[-3rem] z-20"></CardButtonHolder>
                <Divider></Divider>

                <PortableTextView blocks={data.components[2].content} data={data}></PortableTextView>
                <Divider></Divider>
                <Divider></Divider>
            </MainContainer>{" "}
            <FullWidthSection klasse="bg-[#BF567C] py-20 lg:!py-32">
                <div className="col-span-12 grid grid-cols-12 gap-12 lg:px-36">
                    <div className="col-span-6">
                        <H3 klasse="!text-white">{dataSpeisekarte[0].categories[0].title}</H3>
                        <hr className="mb-10" />
                        {dataSpeisekarte[0].categories[0].items.map((e, i) => {
                            return <ListItem data={e}></ListItem>;
                        })}
                        <H3 klasse="!text-white mt-12">{dataSpeisekarte[0].categories[2].title}</H3>
                        <hr className="mb-10" />
                        {dataSpeisekarte[0].categories[2].items.map((e, i) => {
                            return <ListItem data={e}></ListItem>;
                        })}
                    </div>
                    <div className="col-span-6">
                        <H3 klasse="!text-white">{dataSpeisekarte[0].categories[1].title}</H3>
                        <hr className="mb-10" />
                        {dataSpeisekarte[0].categories[1].items.map((e, i) => {
                            return <ListItem data={e}></ListItem>;
                        })}
                    </div>
                </div>
            </FullWidthSection>
            <MainContainer width="container mx-auto">
                <GridGallery data={data.components[4].images}></GridGallery>

                <Divider></Divider>
                <Divider></Divider>
                <TextImage overlap data={data.components[5]}></TextImage>
                <Divider></Divider>
                <Divider></Divider>
                <TextImage overlap data={data.components[6]}></TextImage>
            </MainContainer>{" "}
            {/* <Divider></Divider>
                <EventSlider isWorkshop={data.title == "Beratung & Workshops"} data={dataEvents}></EventSlider>

                <Divider></Divider>
                {filteredDataPartner && (
                    <LinkGrid
                        isWorkshop={data.title == "Beratung & Workshops"}
                        data={filteredDataPartner}
                        headline="Unsere Partner"
                    ></LinkGrid>
                )} */}
            <DecorativeDivider></DecorativeDivider>
            <FullWidthSection klasse="bg-[#fff] py-20 lg:!py-32">
                <Contact data={dataKontakt[0]}></Contact>
            </FullWidthSection>
            <BigDecal></BigDecal>
        </>
    );
}

export const getStaticProps = async (context) => {
    const res = await client.fetch(`*[_type == "cafe"] 
    `);
    const data = await res[0];

    const resSpeisekarte = await client.fetch(`
    *[_type == "speisekarte"]
  `);

    const dataSpeisekarte = await resSpeisekarte;

    const resKontakt = await client.fetch(`
    *[_type == "kontakt"]
    `);

    const dataKontakt = await resKontakt;

    return {
        props: {
            data,
            dataSpeisekarte,
            dataKontakt,
        },
        revalidate: 1, // 10 seconds
    };
};
