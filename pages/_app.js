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
import { MobileBar1 } from "../components/mobileBar";

//FX
import { ParallaxProvider } from "react-scroll-parallax";

function MyApp({ Component, pageProps }) {
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
            <MobileBar1
                // data={dataSetting}
                onClick={() => {
                    console.log("IS CLICKED");
                }}
            ></MobileBar1>
            <ParallaxProvider>
                <Component {...pageProps} />
            </ParallaxProvider>
        </>
    );
}

export default MyApp;
