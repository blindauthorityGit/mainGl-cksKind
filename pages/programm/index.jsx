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
import PEKIP from "../../assets/icons/pekip.svg";
import All from "../../assets/all.svg";
import SmallerDecal from "../../components/decorative/smallerDecal";
import Down from "../../assets/down.svg";
import Search from "../../assets/search.svg";

export default function Programm({ dataHome, dataKontakt, dataEvents, dataKategorie, dataPekip }) {
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

    console.log(dataEvents, dataPekip);

    const cardClicker = (category, cardIndex) => {
        // Encode the category name for the URL
        const encodedCategory = encodeURIComponent(category);

        // Update the URL with the encoded category
        router.push(`?cat=${encodedCategory}`, undefined, { shallow: true });

        // Filter the data based on the selected category
        const filtered = dataEvents.filter((event) => event.kategorie.name === category);
        setFilteredEvents(filtered);
        setActiveFilter(category);
        console.log("FILTER", filtered);

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
                left: "-2rem",
            });
        }, 700);
        // Hide the cards
        setShowCards(false);
    };

    useEffect(() => {
        // Get the category from the URL query
        const { cat } = router.query;

        if (cat && cat != "alle") {
            // Decode the category name from the URL
            const decodedCategory = decodeURIComponent(cat);

            // Filter the data based on the URL query parameter
            const filtered = dataEvents.filter((event) => event.kategorie.name === decodedCategory);

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
            text: "",
            bgColor: "#fff",
            icon: PEKIP.src,
            order: "xl:order-2",
            isWorkshop: false,
            link: "/event/pekip",
            pekip: true,
            // onClick: () => cardClicker("Beratung & Coachings"),
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
        setFilteredEvents(dataEvents);
        changeBodyBackgroundColor("");
    }, []);

    useEffect(() => {
        setBgStyle({
            bottom: 0,
            height: 0,
            opacity: 0,
            left: "-2rem",
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
                <div className="col-span-12 px-4 lg:px-0 py-6 min-h-[100svh] relative pt-[16svh] lg:pt-[12svh] xl:pt-[18svh]">
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
                                className="font-semibold hover:scale-125 transition cursor-pointer mb-4 inline-flex items-center space-x-2 text-textColor"
                                onClick={() => {
                                    setShowData(false);
                                    router.push(``, undefined, { shallow: true });

                                    // Filter the data based on the selected category
                                    // setFilteredEvents(data);
                                }}
                            >
                                <img className="rotate-90" src={Down.src} alt="" />
                                <span className="">zurück</span>
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
                                <P klasse="!text-lg md:!text-2xl font-black mt-[5svh]">Wähle eine Kategorie:</P>
                                <AnimatePresence>
                                    {showCards && (
                                        <motion.div
                                            className="col-span-12 grid grid-cols-2 lg:grid-cols-5 gap-2 xl:gap-8 lg:px-8   mt-[4svh] "
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
                                                        isBig
                                                        pekip={e.pekip}
                                                    ></CatCard>
                                                );
                                            })}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </>
                        ) : null}

                        <motion.div
                            animate={bgStyle}
                            transition={{ type: "spring", stiffness: 95, damping: 15 }}
                            className="absolute BGBGBG HUGI bg-[#AFD3A2] transition w-full left-0 lg:left[-2rem] bottom-0 z-[-10] md:hidden"
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

            <MainContainer width="container mx-auto">
                <CardHolder data={dataKategorie}></CardHolder>
            </MainContainer>
            <DecorativeDivider></DecorativeDivider>
            <FullWidthSection klasse="bg-[#fff] py-8 lg:!py-32">
                <Contact data={dataKontakt[0]}></Contact>
            </FullWidthSection>
        </>
    );
}

export const getStaticProps = async (context) => {
    const resData = await client.fetch(`*[_type == "home"][0]`);
    const resKategorie = await client.fetch(`*[_type == "kategorie"]`);
    const resKontakt = await client.fetch(`*[_type == "kontakt"]`);

    // Fetch all events (unfiltered)
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

    // Fetch all PEKiP sessions (unfiltered)
    const resPekip = await client.fetch(`
    *[_type == "pekip"]{
        ...,
        recurringSessions[] {
            ...,
            trainer-> {
                _id,
                name,
                image,
                "slug": slug.current
            }
        },
        kategorie->{
            ...
        },
        eventDetails {
            ...,
            partner->{
                ...
            },
            location->{
                ...
            }
        }
    }
    `);

    // ✅ Filter out specific slugs AFTER fetching
    const excludedSlugs = [
        "dienstag-pekip",
        "pekip-arlett",
        "pekip-mittwoch",
        "pekip-donnerstag",
        "pekip-montag-nachmittag",
        "pekip-montag",
    ];
    const filteredEvents = resEvents.filter((event) => !excludedSlugs.includes(event.slug?.current));
    // const filteredPekip = resPekip.filter((pekip) => !excludedSlugs.includes(pekip.slug?.current));
    // ✅ Ensure `resPekip[0]` is an object before adding it
    const pekipData = resPekip.length > 0 ? resPekip[0] : null;
    const finalEvents = [...filteredEvents, pekipData];
    console.log("Filtered Events:", filteredEvents);
    // console.log("Filtered PEKiP:", filteredPekip);

    return {
        props: {
            dataHome: resData,
            dataKategorie: resKategorie,
            dataKontakt: resKontakt,
            dataEvents: finalEvents, // Now only the filtered events are passed
            dataPekip: pekipData, // Now only the filtered PEKiP sessions are passed
        },
        revalidate: 1, // 10 seconds
    };
};
