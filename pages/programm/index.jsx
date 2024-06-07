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
import SearchBar from "../../components/searchBar";

//FUNCTIONS
import changeBodyBackgroundColor from "../../functions/changeBodyBackgroundColor";

//ASSETS
import Adult from "../../assets/adult.svg";
import Baby from "../../assets/baby.svg";
import Workshop from "../../assets/workshop.svg";
import All from "../../assets/all.svg";
import SmallerDecal from "../../components/decorative/smallerDecal";
import Down from "../../assets/down.svg";
import Search from "../../assets/search.svg";

export default function Programm({ dataHome, dataKontakt, dataEvents, dataKategorie }) {
    const router = useRouter();
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [activeFilter, setActiveFilter] = useState("Alle");

    const [showCards, setShowCards] = useState(true);
    const [showData, setShowData] = useState(false);

    const [bgStyle, setBgStyle] = useState({
        bottom: 0,
        height: "43svh",
        top: "auto",
    });

    const cardClicker = (category, cardIndex) => {
        // set stylke for bgt elenment

        // Encode the category name for the URL
        const encodedCategory = encodeURIComponent(category);

        // Update the URL with the encoded category
        router.push(`?cat=${encodedCategory}`, undefined, { shallow: true });

        // Filter the data based on the selected category
        const filtered = dataEvents.filter((event) => event.kategorie.name === category);
        setFilteredEvents(filtered);
        setActiveFilter(category);

        setTimeout(() => {
            setShowData(true);
        }, 500);
        setTimeout(() => {
            setBgStyle({
                bottom: "auto",
                top: "5rem",
                height: "100%",
                right: 0,
                width: "66%",
            });
        }, 700);
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
            setActiveFilter(decodedCategory);

            // Hide the cards
            setShowCards(false);
        } else {
            // If no category is specified, show all events
            setFilteredEvents(dataEvents);
            setActiveFilter("Alle");

            // Show the cards
            setShowCards(true);
        }
    }, [router.query, dataEvents]);

    useEffect(() => {
        const { cat } = router.query;
        if (cat && cat != "alle") {
            // Decode the category name from the URL
            const decodedCategory = decodeURIComponent(cat);

            // Filter the data based on the URL query parameter
            const filtered = dataEvents.filter((event) => event.kategorie.name === decodedCategory);
            console.log("THE DATA: ", filtered);
            setFilteredEvents(filtered);
            setActiveFilter(decodedCategory);
            setTimeout(() => {
                setShowData(true);
            }, 500);
            // Hide the cards
            setShowCards(false);
        } else {
            // If no category is specified, show all events

            setFilteredEvents(dataEvents);
            setActiveFilter("Alle");

            // Show the cards
            setShowCards(true);
        }
    }, [router.query]);

    const cards = [
        {
            text: "Erwachsene",
            bgColor: "#C8C1E1",
            icon: Adult.src,
            isWhite: false,
            order: "xl:order-3",
            onClick: () => cardClicker("Erwachsene"),
        },
        {
            text: "Baby & Kleinkind",
            bgColor: "#F3E584",
            icon: Baby.src,
            order: "xl:order-4",
            onClick: () => cardClicker("Baby & Kleinkind"),
        },
        {
            text: "Workshops & Coachings",
            bgColor: "#3E55AB",
            icon: Workshop.src,
            order: "xl:order-2",
            isWorkshop: true,
            onClick: () => cardClicker("Beratung & Coachings"),
        },
        {
            text: "Alle anzeigen",
            bgColor: "#E22E88",
            icon: All.src,
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
                delay: 0.1,
                type: "spring",
                stiffness: 250,
                damping: 15,
            },
        },
        exit: {
            opacity: 0,
            scale: 0.5,
            transition: {
                delay: 0.18,
                duration: 0.4,
                type: "spring",
                stiffness: 250,
                damping: 15,
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

    const animationProps2 = {
        initial: { opacity: 0, scale: 0, rotate: 0 },
        animate: {
            opacity: 1,
            scale: [0.1, 1.2, 0.8, 1.05, 1],
            rotate: [0, 310],
        },
        transition: {
            delay: 1.2,
            duration: 2.4,
            type: "spring",
            stiffness: 900,
            damping: 15,
            mass: 0.8,
            times: [0, 0.3, 0.6, 0.8, 1],
        },
    };

    useEffect(() => {
        console.log(dataEvents);
        setFilteredEvents(dataEvents);
        changeBodyBackgroundColor("");
    }, []);

    useEffect(() => {
        setBgStyle({
            bottom: 0,
            height: 0,
            opacity: 0,
            top: "auto",
        });
        if (!showData) {
            setTimeout(() => {
                setBgStyle({
                    opacity: 1,

                    bottom: 0,
                    height: "43svh",
                    top: "auto",
                });
            }, 1000);
        }
    }, [showData]);

    const handleSearch = (searchTerm) => {
        // Implement your search logic here
        // For example:
        const lowercasedTerm = searchTerm.toLowerCase();
        const filtered = dataEvents.filter((item) => item.headline.toLowerCase().includes(lowercasedTerm));
        setFilteredEvents(filtered);
        setShowCards(searchTerm.length === 0);
        setShowData(searchTerm.length != 0);
    };

    return (
        <>
            <MainContainer width="container mx-auto">
                <Meta data={dataHome.seo}></Meta>

                {/* <Calendar data={dataEvents}></Calendar> */}

                <Divider></Divider>

                {/* SECTION */}
                <div className="col-span-12 px-4 lg:px-0 py-6 min-h-[100svh] relative pt-[16svh]">
                    <SmallerDecal
                        klasse="absolute top-[7svh] w-[16vw] xl:hidden left-[75svw] z-0 opacity-20 !rotate-6"
                        motionProps={animationProps2}
                    />
                    <div className="wrap">
                        <div className="flex justify-between items-center w-full relative">
                            <H2>Unser Programm</H2>
                            <SearchBar data={dataEvents} onSearch={handleSearch}>
                                {" "}
                            </SearchBar>
                        </div>
                        {showData ? (
                            <span
                                className="font-semibold mb-4 flex items-center space-x-2 text-textColor"
                                onClick={() => {
                                    setShowData(false);
                                    router.push(``, undefined, { shallow: true });

                                    // Filter the data based on the selected category
                                    // setFilteredEvents(data);
                                }}
                            >
                                <img className="rotate-90" src={Down.src} alt="" />
                                <span>zurück</span>
                            </span>
                        ) : null}
                        {!showData ? (
                            <>
                                <div className="lg:w-2/4">
                                    <P>
                                        Entdecke bei MainGlückskind ein vielfältiges Kursangebot, das die ganze Familie
                                        anspricht. Gemeinsames Lern- und Wachstumserlebnis.
                                    </P>
                                </div>
                                {/* CARDS */}
                                <P klasse="!text-lg font-black mt-[5svh]">Wähle eine Kategorie:</P>
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
                                                        isWorkshop={e.isWorkshop}
                                                    ></CatCard>
                                                );
                                            })}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </>
                        ) : null}

                        <motion.div
                            // initial={{ y: "-100%", opacity: 0.5 }}
                            animate={bgStyle}
                            transition={{ type: "spring", stiffness: 95, damping: 15 }}
                            className="absolute BGBGBG bg-[#AFD3A2] transition w-full left-0 bottom-0 z-[-10] md:hidden"
                        />
                    </div>
                    <AnimatePresence>
                        {showData ? (
                            <motion.div exit="exit" variants={container2} initial="hidden" animate="visible">
                                {" "}
                                <FilterComponent
                                    dataEvents={dataEvents}
                                    filteredEvents={filteredEvents}
                                    setFilteredEvents={setFilteredEvents}
                                    activeFilter={activeFilter}
                                    setActiveFilter={setActiveFilter}
                                />
                                {filteredEvents.length > 0 ? (
                                    <LinkGrid isEvent data={filteredEvents}></LinkGrid>
                                ) : (
                                    <P> Leider keine Kurse vorhanden</P>
                                )}
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
