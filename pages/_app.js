import "../styles/globals.css";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

//ASSETS
import { RxHamburgerMenu } from "react-icons/rx";
import { menuItems, socialMedia } from "../components/menues/config";
import Logo from "../assets/logo.svg";
import burger from "../assets/BURGER.svg";
import burgerMenu from "../assets/burgerMenu.svg";

//COMPS
import { Menu1 } from "../components/menues";
import Overlay from "../components/overlay";
import { Modal } from "../components/modal";
import { MobileBar1, MobileBarCafe } from "../components/mobileBar";
import { Full } from "../components/footer";
import { Sub } from "../components/footer";
import { StartModal } from "../components/modalContent/";

//COOKIE
import CookieConsent from "react-cookie-consent";
import Cookies from "js-cookie";

//STORE
import useStore from "../store/store"; // Adjust the path to your store file

//FX
import { ParallaxProvider } from "react-scroll-parallax";
import { AnimatePresence } from "framer-motion";

// Sanity client
import client from "../client"; // Adjust the path to your sanity client

//LIBS
import { ReactLenis, useLenis } from "../libs/lenis";

function MyApp({ Component, pageProps }) {
    const [showMobileBar, setShowMobileBar] = useState(false);

    const isCafe = useStore((state) => state.isCafe);
    const showOverlay = useStore((state) => state.showOverlay);
    const setShowOverlay = useStore((state) => state.setShowOverlay);

    const showMobileMenu = useStore((state) => state.showMobileMenu);
    const setShowMobileMenu = useStore((state) => state.setShowMobileMenu);

    const showModal = useStore((state) => state.showModal);
    const setShowModal = useStore((state) => state.setShowModal);
    const resetFormData = useStore((state) => state.resetFormData);

    const modalColor = useStore((state) => state.modalColor);
    const setModalColor = useStore((state) => state.setModalColor);

    const modalContent = useStore((state) => state.modalContent);
    const setModalContent = useStore((state) => state.setModalContent);

    const setShowMobileModal = useStore((state) => state.setShowMobileModal);

    const [showCookieConsent, setShowCookieConsent] = useState(false);

    useEffect(() => {
        const consentCookie = Cookies.get("user-consent"); // Check if the consent cookie exists
        if (!consentCookie) {
            setShowCookieConsent(true); // Show the consent modal if the cookie doesn't exist
            setShowOverlay(true); // Show overlay with cookie banner
        }
    }, [setShowOverlay]);

    const handleAcceptCookies = () => {
        Cookies.set("user-consent", "true", { expires: 365 }); // Set a cookie for 1 year
        setShowCookieConsent(false); // Hide the modal
        setShowOverlay(false); // Hide overlay when cookie consent is given
    };

    //router
    const router = useRouter();

    // Fetch modal settings from Sanity
    useEffect(() => {
        const fetchModalSettings = async () => {
            try {
                const settings = await client.fetch(`*[_type == "modalGeneral"][0]`);

                if (settings && settings.active) {
                    setModalContent(<StartModal data={settings.text}> </StartModal>);
                    setShowModal(true);
                    setShowOverlay(true);
                }
            } catch (error) {
                console.error("Error fetching modal settings:", error);
            }
        };

        fetchModalSettings();
    }, []);

    useEffect(() => {
        // Function to call when the route changes
        const handleRouteChange = () => {
            // Set the mobile menu state to false on route change
            setShowModal(false);
            setShowMobileMenu(false);
        };

        // Add route change listeners
        router.events.on("routeChangeStart", handleRouteChange);

        // Clean up event listeners
        return () => {
            router.events.off("routeChangeStart", handleRouteChange);
        };
    }, [router.events, setShowMobileMenu]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                // Adjust this value based on your preference
                setShowMobileBar(true);
            } else {
                setShowMobileBar(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <ReactLenis ReactLenis root>
            <Head>
                <link rel="icon" href="/favicon.svg" />
                {/* Other global head tags can also go here */}
            </Head>
            <Menu1
                logo={Logo.src}
                menuItems={menuItems}
                socialMedia={socialMedia}
                burgerIcon={burgerMenu.src}
                onBurgerClick={(e) => {}}
                onClick={() => {
                    setIsOpen(true);
                }}
            ></Menu1>
            {showModal && (
                <Modal
                    background={modalColor}
                    onClick={(e) => {
                        setShowModal(false);
                        setShowOverlay(false);
                        resetFormData();
                    }}
                >
                    {modalContent}
                </Modal>
            )}
            <AnimatePresence>
                {showOverlay && (
                    <Overlay
                        onClick={(e) => {
                            setShowOverlay(false);
                            setShowMobileMenu(false);
                            setShowMobileModal(false);
                            setShowModal(false);
                            resetFormData();
                        }}
                    />
                )}
            </AnimatePresence>
            {isCafe ? (
                <div className="">
                    <MobileBarCafe onClick={() => console.log("IS CLICKED")} />
                </div>
            ) : (
                <div className="">
                    <MobileBar1 onClick={() => console.log("IS CLICKED")} />
                </div>
            )}
            <ParallaxProvider>
                <Component {...pageProps} />
                {showCookieConsent && (
                    <div
                        style={{
                            position: "fixed",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            zIndex: 1000,
                            background: "#FFF",
                            padding: "20px",
                            borderRadius: "10px",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
                            maxWidth: "500px",
                            width: "90%",
                            textAlign: "center",
                        }}
                    >
                        <p className="font-sans" style={{ marginBottom: "15px", fontSize: "16px", lineHeight: "1.5" }}>
                            Wir verwenden Cookies, um Ihr Surferlebnis auf unserer Website zu verbessern.
                            <br /> <br /> Durch die weitere Nutzung der Seite stimmen Sie der Verwendung von Cookies zu.
                        </p>
                        <button
                            onClick={handleAcceptCookies}
                            className="font-sans"
                            style={{
                                background: "#df3288",
                                color: "white",
                                border: "none",
                                padding: "10px 60px",
                                borderRadius: "5px",
                                cursor: "pointer",
                                fontSize: "16px",
                            }}
                        >
                            OK
                        </button>
                    </div>
                )}
                <Full></Full>
                <Sub></Sub>
            </ParallaxProvider>
        </ReactLenis>
    );
}

export default MyApp;
