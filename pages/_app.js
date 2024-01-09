import "../styles/globals.css";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

//ASSETS
import { RxHamburgerMenu } from "react-icons/rx";
import { menuItems, socialMedia } from "../components/menues/config";
import Logo from "../assets/logo.svg";
import burger from "../assets/BURGER.svg";

//COMPS
import { Menu1 } from "../components/menues";
import Overlay from "../components/overlay";
import { Modal } from "../components/modal";
import { MobileBar1, MobileBarCafe } from "../components/mobileBar";
import { Full } from "../components/footer";
import { Sub } from "../components/footer";

//STORE
import useStore from "../store/store"; // Adjust the path to your store file

//FX
import { ParallaxProvider } from "react-scroll-parallax";

function MyApp({ Component, pageProps }) {
    const [showMobileBar, setShowMobileBar] = useState(false);

    const isCafe = useStore((state) => state.isCafe);
    const showOverlay = useStore((state) => state.showOverlay);
    const setShowOverlay = useStore((state) => state.setShowOverlay);

    const showMobileMenu = useStore((state) => state.showMobileMenu);
    const setShowMobileMenu = useStore((state) => state.setShowMobileMenu);

    const setShowMobileModal = useStore((state) => state.setShowMobileModal);

    //router
    const router = useRouter();

    useEffect(() => {
        // Function to call when the route changes
        const handleRouteChange = () => {
            // Set the mobile menu state to false on route change
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
        <>
            <Menu1
                logo={Logo.src}
                menuItems={menuItems}
                socialMedia={socialMedia}
                burgerIcon={burger.src}
                onBurgerClick={(e) => {
                    console.log(e);
                }}
                onClick={() => {
                    console.log("IS CLICKED");
                    setIsOpen(true);
                }}
            ></Menu1>{" "}
            {showOverlay ? (
                <Overlay
                    onClick={(e) => {
                        setShowOverlay(false);
                        setShowMobileMenu(false);
                        setShowMobileModal(false);
                    }}
                ></Overlay>
            ) : null}
            {/* ...other components */}
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
                <Full></Full>
                <Sub></Sub>
            </ParallaxProvider>
        </>
    );
}

export default MyApp;
