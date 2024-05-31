import { useState, useEffect } from "react";
import MainContainer from "../../components/layout/mainContainer";
import { useRouter } from "next/router";

// SANITY
import client from "../../client";

//MOTION
import { motion, AnimatePresence } from "framer-motion";

//COMPS
import Meta from "../../components/SEO";
import { LinkGrid, FilterComponent } from "../../components/linkGrid";
import { PortableTextView, Contact, CTAContent } from "../../components/content";
import { CardHolder } from "../../components/cards";
import { Calendar } from "../../components/calendar";
import { H2, P } from "../../components/typography";
import { CatCard } from "../../components/cards";

import Divider from "../../components/layout/divider";

import { BigDecal } from "../../components/decorative";
import { DecorativeDivider } from "../../components/decorative";
import FullWidthSection from "../../components/layout/fullWidthSection";

//FUNCTIONS
import changeBodyBackgroundColor from "../../functions/changeBodyBackgroundColor";

//ASSETS
import CafeIcon from "../../assets/cafeIcon.svg";
import ProgrammIcon from "../../assets/programmIcon.svg";
import PartyIcon from "../../assets/partyIcon.svg";
import AboutIcon from "../../assets/aboutIcon.svg";

export default function Programm({ dataHome, dataKontakt, dataEvents, dataKategorie }) {
    const router = useRouter();
    const [filteredEvents, setFilteredEvents] = useState([]);

    const [showCards, setShowCards] = useState(true);
    const [showData, setShowData] = useState(false);

    const cardClicker = (category, cardIndex) => {
        // Encode the category name for the URL
        const encodedCategory = encodeURIComponent(category);

        // Update the URL with the encoded category
        router.push(`?cat=${encodedCategory}`, undefined, { shallow: true });

        // Filter the data based on the selected category
        const filtered = dataEvents.filter((event) => event.kategorie.name === category);
        setFilteredEvents(filtered);
        setTimeout(() => {
            setShowData(true);
        }, 500);
        // Hide the cards
        setShowCards(false);
    };

    useEffect(() => {
        // Get the category from the URL query
        const { cat } = router.query;
        console.log(cat);
        if (cat && cat != "alle") {
            // Decode the category name from the URL
            const decodedCategory = decodeURIComponent(cat);

            // Filter the data based on the URL query parameter
            const filtered = dataEvents.filter((event) => event.kategorie.name === decodedCategory);
            console.log("THE DATA: ", filtered);
            setFilteredEvents(filtered);
            // Hide the cards
            setShowCards(false);
        } else {
            // If no category is specified, show all events
            setFilteredEvents(dataEvents);
            // Show the cards
            setShowCards(true);
        }
    }, [router.query, dataEvents]);

    const cards = [
        {
            text: "Erwachsene",
            bgColor: "#C8C1E1",
            icon: CafeIcon.src,
            isWhite: false,
            order: "xl:order-3",
            onClick: () => cardClicker("Erwachsene"),
        },
        {
            text: "Baby & Kleinkind",
            bgColor: "#F3E584",
            icon: ProgrammIcon.src,
            order: "xl:order-4",
            onClick: () => cardClicker("Baby & Kleinkind"),
        },
        {
            text: "Workshops & Coachings",
            bgColor: "#3E55AB",
            icon: PartyIcon.src,
            order: "xl:order-2",
            isWorkshop: true,
            onClick: () => cardClicker("Beratung & Coachings"),
        },
        {
            text: "Alle anzeigen",
            bgColor: "#E22E88",
            icon: AboutIcon.src,
            order: "xl:order-1",
            isWhite: true,
            onClick: () => cardClicker("alle"),
        },
    ];

    const container = {
        hidden: { opacity: 0, scale: 0 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                delay: 0.2,
                type: "spring",
                stiffness: 500,
                damping: 50,
            },
        },
        exit: {
            opacity: 0,
            scale: 0.5,
            transition: {
                delay: 0.18,
                duration: 0.4,
                type: "spring",
                stiffness: 500,
                damping: 30,
            },
        },
    };

    const container2 = {
        hidden: { opacity: 0, x: "100%" }, // Slide in from the right
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                delay: 0.1,
                type: "spring",
                stiffness: 700,
                damping: 40,
            },
        },
        exit: {
            opacity: 0,
            x: "100%", // Slide out to the right
            transition: {
                delay: 0.1,
                duration: 0.3,
                type: "spring",
                stiffness: 500,
                damping: 30,
            },
        },
    };

    useEffect(() => {
        console.log(dataEvents);
        setFilteredEvents(dataEvents);
        changeBodyBackgroundColor("");
    }, []);
    return (
        <>
            <MainContainer width="container mx-auto">
                <Meta data={dataHome.seo}></Meta>

                {/* <Calendar data={dataEvents}></Calendar> */}

                <Divider></Divider>

                {/* SECTION */}
                <div className="col-span-12 px-4 lg:px-0 py-6 min-h-[100svh] relative pt-[17svh]">
                    <div className="wrap">
                        <H2>Unser Programm</H2>
                        {!showData ? (
                            <>
                                <div className="lg:w-2/4">
                                    <P>
                                        Entdecke bei MainGlückskind ein vielfältiges Kursangebot, das die ganze Familie
                                        anspricht. Gemeinsames Lern- und Wachstumserlebnis.
                                    </P>
                                </div>
                                {/* CARDS */}
                                <P klasse="!text-lg font-black mt-[8svh]">Wähle eine Kategorie:</P>
                                <AnimatePresence>
                                    {showCards && (
                                        <motion.div
                                            className="col-span-12 grid grid-cols-2 lg:grid-cols-4 gap-2   mt-[4svh] lg:hidden"
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            variants={container}
                                        >
                                            {cards.map((e, i) => {
                                                return (
                                                    <CatCard
                                                        text={e.text}
                                                        bgColor={e.bgColor}
                                                        icon={e.icon}
                                                        isWhite={e.isWhite}
                                                        link={e.link}
                                                        onClick={e.onClick}
                                                    ></CatCard>
                                                );
                                            })}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </>
                        ) : null}

                        <motion.div
                            // translateY={["-90vh", "90vh"]}
                            initial={{ y: "-100%", opacity: 0.5 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 95, damping: 15 }}
                            className="absolute bg-[#AFD3A2] h-[43svh]  w-full left-0 bottom-0 z-[-10]  md:hidden"
                        ></motion.div>
                    </div>
                    <AnimatePresence>
                        {showData ? (
                            <motion.div exit="exit" variants={container2} initial="hidden" animate="visible">
                                {" "}
                                <FilterComponent
                                    dataEvents={dataEvents}
                                    filteredEvents={filteredEvents}
                                    setFilteredEvents={setFilteredEvents}
                                />
                                <LinkGrid isEvent data={filteredEvents}></LinkGrid>{" "}
                            </motion.div>
                        ) : null}
                    </AnimatePresence>
                </div>
                <Divider></Divider>
            </MainContainer>
            <Divider></Divider>

            {/* <FullWidthSection klasse="bg-[#AFD3A2] py-20 2xl:!py-32">
                <CTAContent data={dataHome.components[3]}></CTAContent>
            </FullWidthSection>
            <Divider></Divider> */}

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
