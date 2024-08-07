import Head from "next/head";
import { useState, useEffect } from "react";
import Image from "next/image";
import MainContainer from "../../components/layout/mainContainer";

// SANITY
import client from "../../client";

//COMPS
import { BasicHero } from "../../components/Hero";
import Meta from "../../components/SEO";
import { EventSlider } from "../../components/slider";
import { PortableTextView, TextImage } from "../../components/content";
import { ListItem } from "../../components/list";
import { Contact } from "../../components/content";
import { CardButtonHolder } from "../../components/cards";
import { H3, H4, P } from "../../components/typography";
import { GridGallery } from "../../components/gallery";
import { MainButtonNOLink } from "../../components/buttons";

import Divider from "../../components/layout/divider";

import { BigDecal } from "../../components/decorative";
import { DecorativeDivider } from "../../components/decorative";
import { CafeReservierung, Öffnungszeiten, Anfrage } from "../../components/modalContent";
import MultiStepReservation from "../../components/modalContent/stepsCafe/multiStepReservation";
import FullWidthSection from "../../components/layout/fullWidthSection";

//STORE
import useStore from "../../store/store"; // Adjust the path to your store file

//FUNCTIONS
import changeBodyBackgroundColor from "../../functions/changeBodyBackgroundColor";

//ASSETS
import Reservation from "../../assets/reservation.svg";

export default function Cafe({ data, dataSpeisekarte, dataKontakt }) {
    const setIsCafe = useStore((state) => state.setIsCafe);
    const setShowOverlay = useStore((state) => state.setShowOverlay);
    const setShowModal = useStore((state) => state.setShowModal);
    const setModalContent = useStore((state) => state.setModalContent);
    const updateCafeData = useStore((state) => state.updateCafeData);

    useEffect(() => {
        setIsCafe(true); // Set isCafe to true when the component mounts

        return () => {
            setIsCafe(false); // Set isCafe to false when the component unmounts
        };
    }, [setIsCafe]);

    useEffect(() => {
        changeBodyBackgroundColor(data);
        updateCafeData({
            oeffnungszeiten: data.oeffnungszeiten,
            dataKontakt: dataKontakt[0],
            phone: dataKontakt[0].telefon,
            email: dataKontakt[0].email,
        });
    }, []);

    return (
        <>
            <MainContainer width="container mx-auto px-4 lg:px-0">
                <Meta data={data.seo}></Meta>
                <BasicHero data={data.components[0]}></BasicHero>{" "}
                <MainButtonNOLink
                    klasse="col-span-12 bg-primaryColor mb-8 mt-4 lg:hidden"
                    onClick={() => {
                        setShowOverlay(true);
                        setShowModal(true);
                        setModalContent(<MultiStepReservation image={null} />);
                    }}
                >
                    <div className="flex items-center space-x-4">
                        <img src={Reservation.src} alt="" />
                        <div>Plätze reservieren</div>
                    </div>
                </MainButtonNOLink>
                <CardButtonHolder
                    isCafe
                    onClick={(e) => {
                        const theme = e.currentTarget.dataset.id;
                        if (theme === "Reservierung") {
                            setShowOverlay(true);
                            setShowModal(true);
                            setModalContent(<MultiStepReservation image={data.reservationImage} />);
                        }
                        if (theme === "Öffnungszeiten") {
                            setShowOverlay(true);
                            setShowModal(true);
                            setModalContent(
                                <Öffnungszeiten
                                    dataKontakt={dataKontakt[0]}
                                    data={data}
                                    image={data.reservationImage}
                                />
                            );
                        }
                        if (theme === "Speisekarte") {
                            const speisekarteSection = document.getElementById("speisekarte");
                            if (speisekarteSection) {
                                speisekarteSection.scrollIntoView({ behavior: "smooth" });
                            }
                        }
                    }}
                    data={data.components[1].cardButtons}
                    klasse="mt-[-3rem] z-20 xl:mb-12"
                ></CardButtonHolder>
                <div className="hidden 2xl:block">
                    <Divider></Divider>
                </div>
                <div className="block 2xl:hidden">
                    <Divider></Divider>
                </div>
                <PortableTextView blocks={data.components[2].content} data={data}></PortableTextView>
                <div className="hidden 2xl:block">
                    <Divider></Divider>
                </div>
                <Divider></Divider>
                <Divider></Divider>
                <GridGallery big data={data.components[7].images}></GridGallery>
                <Divider></Divider>
            </MainContainer>{" "}
            <FullWidthSection klasse="bg-[#BF567C] px-4 lg:px-0 py-10 2xl:!py-32" id="speisekarte">
                <div className="col-span-12 grid grid-cols-12 lg:gap-12 xl:px-36">
                    <div className="col-span-12 lg:col-span-6">
                        <H3 klasse="!text-white">{dataSpeisekarte[0].categories[0].title}</H3>
                        <hr className="mb-10" />
                        {dataSpeisekarte[0].categories[0].items.map((e, i) => {
                            return <ListItem data={e}></ListItem>;
                        })}

                        <H3 klasse="!text-white mt-12">{dataSpeisekarte[0].categories[1].title}</H3>
                        <hr className="mb-10" />
                        {dataSpeisekarte[0].categories[1].items.map((e, i) => {
                            return <ListItem data={e}></ListItem>;
                        })}
                        <H3 klasse="!text-white mt-12">{dataSpeisekarte[0].categories[2].title}</H3>
                        <hr className="mb-10" />
                        {dataSpeisekarte[0].categories[2].items.map((e, i) => {
                            return <ListItem data={e}></ListItem>;
                        })}
                    </div>
                    <div className="col-span-12 lg:col-span-6  lg:mt-0">
                        <H3 klasse="!text-white">{dataSpeisekarte[0].categories[3].title}</H3>
                        <hr className="mb-10" />
                        {dataSpeisekarte[0].categories[3].items.map((e, i) => {
                            return <ListItem data={e}></ListItem>;
                        })}
                        <H3 klasse="!text-white mt-12">{dataSpeisekarte[0].categories[4].title}</H3>
                        <hr className="mb-10" />
                        {dataSpeisekarte[0].categories[4].items.map((e, i) => {
                            return <ListItem data={e}></ListItem>;
                        })}
                    </div>
                </div>
            </FullWidthSection>
            <MainContainer width="container mx-auto">
                <GridGallery data={data.components[4].images}></GridGallery>

                <Divider></Divider>
                <Divider></Divider>
                <TextImage
                    richText
                    overlap
                    noLink
                    data={data.components[5]}
                    onClick={() => {
                        setShowOverlay(true);
                        setShowModal(true);
                        setModalContent(<Anfrage cafe={true} image={data.reservationImage} />);
                    }}
                ></TextImage>
                <Divider></Divider>
                <Divider></Divider>
                <TextImage richText overlap data={data.components[6]}></TextImage>
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
            <FullWidthSection klasse="bg-[#fff] py-10 lg:!py-32">
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
