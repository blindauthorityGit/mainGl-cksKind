import Head from "next/head";
import { useState, useEffect } from "react";
import Image from "next/image";
import MainContainer from "../../components/layout/mainContainer";
import { StickyContainer, Sticky } from "react-sticky";

// SANITY
import client from "../../client";

//COMPS
// import { MainHero } from "../../components/Hero";
import OldHero from "../../components/Hero/mainHero/oldHero";
import Meta from "../../components/SEO";
import { PortableTextEvent } from "../../components/content";
import { TextImage, Contact } from "../../components/content";
import { RoomDetails } from "../../components/sidebar";
import { CTAContentButton } from "../../components/content";
import Divider from "../../components/layout/divider";
import { BigDecal } from "../../components/decorative";
import { DecorativeDivider } from "../../components/decorative";
import FullWidthSection from "../../components/layout/fullWidthSection";
import MultiStepReservation from "../../components/modalContent/stepsBirthday/multiStepReservation";

import useStore from "../../store/store"; // Adjust the path to your store file

//FUNCTIONS
import changeBodyBackgroundColor from "../../functions/changeBodyBackgroundColor";

export default function Kindergeburtstag({ data, dataKontakt }) {
    // GLOBAL STATES
    const setShowOverlay = useStore((state) => state.setShowOverlay);
    const setShowModal = useStore((state) => state.setShowModal);
    const setModalContent = useStore((state) => state.setModalContent);
    useEffect(() => {
        changeBodyBackgroundColor(data);
        console.log(data);
    }, []);

    return (
        <>
            <MainContainer width="container mx-auto">
                <Meta data={data.seo}></Meta>

                <OldHero
                    additionalLink={{
                        label: data.components[5].downloads[0].fileName,
                        link: data.components[5].downloads[0].file.asset.url,
                    }}
                    modal
                    bgColor="#E9B4C7"
                    data={data.components[0]}
                    noCards
                    twoLine
                ></OldHero>
                <div className="hidden 2xl:block">
                    <Divider></Divider>
                </div>
                <Divider></Divider>

                <StickyContainer className="grid grid-cols-12 w-full col-span-12 px-4 lg_px-0">
                    <div className="col-span-12 lg:col-span-8">
                        <PortableTextEvent blocks={data.components[1].content} data={data}></PortableTextEvent>
                        {data.components[5].introText && (
                            <PortableTextEvent blocks={data.components[5].introText} data={data}></PortableTextEvent>
                        )}
                        {data.components[5].downloads &&
                            data.components[5].downloads.map((e, i) => {
                                return (
                                    <a
                                        key={i}
                                        className="xl:ml-8 2xl:ml-28 underline font-sans text-xl font-medium leading-relaxed text-textColor flex items-start my-2"
                                        href={e.file.asset.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {/* Inline SVG download icon */}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                            className="w-6 h-6 mr-2"
                                        >
                                            <path
                                                d="M21 15v4a2 2 0 0 1-2 2H5a2 
                                               2 0 0 1-2-2v-4M7 10l5 5 5-5M12
                                               15V3"
                                            />
                                        </svg>
                                        {e.fileName}
                                    </a>
                                );
                            })}
                    </div>

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
            <FullWidthSection klasse="bg-[#E9B4C7] py-10 2xl:!py-32">
                <div className="col-span-12 lg:hidden px-4">
                    <RoomDetails data={data.components[2]}></RoomDetails>{" "}
                </div>
                <CTAContentButton
                    onClick={() => {
                        setShowOverlay(true);
                        setShowModal(true);
                        setModalContent(
                            <MultiStepReservation image={data.image} kindergeburtstag={true}></MultiStepReservation>
                        );
                    }}
                    data={data.components[3]}
                ></CTAContentButton>{" "}
            </FullWidthSection>
            <MainContainer width="container mx-auto">
                <TextImage richText data={data.components[4]}></TextImage>
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
    const res = await client.fetch(`
        *[_type == "kindergeburtstag"]{
            ...,
            components[]{
                ...,
                downloads[]{
                    file{
                        asset->{
                            url
                        }
                    },
                    fileName
                }
            }
        }
    `);
    const data = res[0];

    const resKontakt = await client.fetch(`
        *[_type == "kontakt"]
    `);

    const dataKontakt = resKontakt;

    return {
        props: {
            data,
            dataKontakt,
        },
        revalidate: 1, // 10 seconds
    };
};
