import Head from "next/head";
import { useState, useEffect } from "react";
import Image from "next/image";
import MainContainer from "../../components/layout/mainContainer";

// SANITY
import client from "../../client";

//COMPS
import { BasicHero } from "../../components/Hero";
import Meta from "../../components/SEO";
import { LinkGrid } from "../../components/linkGrid";
import { PortableTextView, Contact, CTAContent } from "../../components/content";
import { CardHolder } from "../../components/cards";
import { Calendar } from "../../components/calendar";
import { H2, P } from "../../components/typography";

import Divider from "../../components/layout/divider";

import { BigDecal } from "../../components/decorative";
import { DecorativeDivider } from "../../components/decorative";
import FullWidthSection from "../../components/layout/fullWidthSection";

//FUNCTIONS
import changeBodyBackgroundColor from "../../functions/changeBodyBackgroundColor";

export default function Programm({ dataHome, dataKontakt, dataEvents, dataKategorie }) {
    useEffect(() => {
        console.log(dataEvents);
        changeBodyBackgroundColor("");
    }, []);
    return (
        <>
            <MainContainer width="container mx-auto">
                <Meta data={dataHome.seo}></Meta>

                <Calendar data={dataEvents}></Calendar>

                <Divider></Divider>
                <div className="col-span-12 px-8 lg:px-0 py-6">
                    <H2>Unser Programm</H2>
                    <div className="lg:w-2/4">
                        <P>
                            Entdecke bei MAIN GLÜCKSKIND vielfältige Angebote rund um das Familienleben.   Hier findest
                            Du Babykurse wie{" "}
                            <strong>
                                PEKiP oder Musikgarten, Stillberatung, Trageberatung, Geburtsvorbereitung mit
                                HypnoBirthing und Klassische Geburtsvorbereitungskurse, einen  Rückbildungskurs und
                                Schlafberatung.
                            </strong>{" "}
                            Individuelle Coachings für Frauen und regelmäßige Workshops runden das Angebot ab.{" "}
                        </P>
                    </div>
                </div>
                <Divider></Divider>

                <LinkGrid isEvent data={dataEvents}></LinkGrid>
            </MainContainer>
            <Divider></Divider>

            <FullWidthSection klasse="bg-[#AFD3A2] py-20 2xl:!py-32">
                <CTAContent data={dataHome.components[3]}></CTAContent>
            </FullWidthSection>
            <Divider></Divider>

            <MainContainer width="container mx-auto">
                <CardHolder data={dataKategorie}></CardHolder>
            </MainContainer>
            <DecorativeDivider></DecorativeDivider>
            <FullWidthSection klasse="bg-[#fff] py-8 lg:!py-32">
                <Contact data={dataKontakt[0]}></Contact>
            </FullWidthSection>
            <BigDecal></BigDecal>

            <BigDecal></BigDecal>
        </>
    );
}

export const getStaticProps = async (context) => {
    const resData = await client.fetch(`
    *[_type == "home"][0]
`);

    const resKategorie = await client.fetch(`
    *[_type == "kategorie"]
`);

    const resKontakt = await client.fetch(`
*[_type == "kontakt"]
`);

    const resEvents = await client.fetch(`
*[_type == "event"]{
    ...,
        kategorie->{...},
        eventDetails {
            ...,
            partner->{...},
            location->{...},
        }
      }
  
`);

    const dataHome = await resData;
    const dataKategorie = await resKategorie;
    const dataKontakt = await resKontakt;
    const dataEvents = await resEvents;

    return {
        props: {
            dataHome,
            dataKategorie,
            dataKontakt,
            dataEvents,
        },
        revalidate: 1, // 10 seconds
    };
};
