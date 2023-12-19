import { useEffect, useState } from "react";

export default function useBreakpoints() {
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const mobileQuery = window.matchMedia("(max-width: 600px)");
        const tabletQuery = window.matchMedia("(min-width: 601px) and (max-width: 960px)");
        const desktopQuery = window.matchMedia("(min-width: 961px)");

        const updateBreakpoints = () => {
            setIsMobile(mobileQuery.matches);
            setIsTablet(tabletQuery.matches);
            setIsDesktop(desktopQuery.matches);
        };

        updateBreakpoints();

        mobileQuery.addEventListener("change", updateBreakpoints);
        tabletQuery.addEventListener("change", updateBreakpoints);
        desktopQuery.addEventListener("change", updateBreakpoints);

        return () => {
            mobileQuery.removeEventListener("change", updateBreakpoints);
            tabletQuery.removeEventListener("change", updateBreakpoints);
            desktopQuery.removeEventListener("change", updateBreakpoints);
        };
    }, []);

    return { isMobile, isTablet, isDesktop };
}
