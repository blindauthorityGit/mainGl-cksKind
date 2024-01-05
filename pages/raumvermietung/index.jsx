import Head from "next/head";
import { useState, useEffect } from "react";
import Image from "next/image";
import MainContainer from "../../components/layout/mainContainer";
import { StickyContainer, Sticky } from "react-sticky";

// SANITY
import client from "../../client";

//COMPS
import { MainHero } from "../../components/Hero";
import { PortableTextEvent } from "../../components/content";
import { TextImage, Contact } from "../../components/content";
import { RoomDetails } from "../../components/sidebar";
import { CTAContentButton } from "../../components/content";
import Divider from "../../components/layout/divider";
import { BigDecal } from "../../components/decorative";
import { DecorativeDivider } from "../../components/decorative";
import FullWidthSection from "../../components/layout/fullWidthSection";

//FUNCTIONS
import changeBodyBackgroundColor from "../../functions/changeBodyBackgroundColor";

export default function Raumvermietung({ data, dataKontakt }) {
    useEffect(() => {
        console.log(data);
        changeBodyBackgroundColor(data);
    }, []);

    return (
        <>
            <MainContainer width="container mx-auto">
                <Head>
                    <title>Site title</title>
                </Head>

                <MainHero data={data.components[0]}></MainHero>
                <div className="hidden 2xl:block">
                    <Divider></Divider>
                </div>
                <Divider></Divider>

                <StickyContainer className="grid grid-cols-12 w-full col-span-12 px-4 lg_px-0">
                    <div className="col-span-12 lg:col-span-8">
                        <PortableTextEvent blocks={data.components[1].content} data={data}></PortableTextEvent>
                    </div>
                    {/* //SIDEBAR */}
                    <div className="col-span-4 lg:mt-28 lg:pl-16 hidden lg:block">
                        <Sticky distanceFromTop={10} topOffset={-18}>
                            {({ style, isSticky }) => (
                                <div style={{ ...style, marginTop: isSticky ? "90px" : "0px" }} className="col-span-3">
                                    <RoomDetails data={data.components[2]}></RoomDetails>{" "}
                                </div>
                            )}
                        </Sticky>
                    </div>
                </StickyContainer>
                <div className="hidden 2xl:block">
                    <Divider></Divider>
                </div>
                <Divider></Divider>
            </MainContainer>
            <FullWidthSection klasse="bg-[#AFD3A2] py-10 2xl:!py-32">
                <div className="col-span-12 lg:hidden px-4">
                    <RoomDetails data={data.components[2]}></RoomDetails>{" "}
                </div>
                <CTAContentButton data={data.components[3]}></CTAContentButton>
            </FullWidthSection>
            <MainContainer width="container mx-auto">
                <TextImage data={data.components[4]}></TextImage>
            </MainContainer>
            <DecorativeDivider></DecorativeDivider>
            <FullWidthSection klasse="bg-[#fff] py-10 lg:!py-32">
                <Contact data={dataKontakt[0]}></Contact>
            </FullWidthSection>
            <BigDecal></BigDecal>
        </>
    );
}

export const getStaticProps = async (context) => {
    const res = await client.fetch(`*[_type == "raumvermietung"] 
    `);
    const data = await res[0];

    const resKontakt = await client.fetch(`
    *[_type == "kontakt"]
    `);

    const dataKontakt = await resKontakt;

    return {
        props: {
            data,
            dataKontakt,
        },
        revalidate: 1, // 10 seconds
    };
};
