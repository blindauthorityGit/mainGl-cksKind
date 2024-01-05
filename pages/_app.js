import "../styles/globals.css";

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
    const isCafe = useStore((state) => state.isCafe);

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
            {isCafe ? (
                <MobileBarCafe
                    // props for MobileBar1
                    onClick={() => {
                        console.log("IS CLICKED");
                    }}
                ></MobileBarCafe>
            ) : (
                <MobileBar1
                    // props for MobileBar1
                    onClick={() => {
                        console.log("IS CLICKED");
                    }}
                ></MobileBar1>
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
