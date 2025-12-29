import { FaFacebook, FaInstagram } from "react-icons/fa";

const menuItems = [
    {
        title: "Programm",
        slug: "programm",
        subMenu: true,
        subMenuItems: [
            {
                title: "Erwachsene",
                slug: "kurse/erwachsene",
            },
            {
                title: "Beratung & Workshops",
                slug: "kurse/beratung-&-coachings",
            },

            {
                title: "Baby & Kleinkind",
                slug: "kurse/baby-&-kleinkind",
            },
        ],
    },
    // {
    //     title: "Cafe",
    //     slug: "cafe",
    //     subMenu: false,
    // },
    {
        title: "Raumvermietung",
        slug: "raumvermietung",
        subMenu: false,
    },
    {
        title: "Kindergeburtstag",
        slug: "kindergeburtstag",
        subMenu: false,
    },
    {
        title: "Über uns",
        slug: "ueber-uns",
        subMenu: false,
    },
    {
        title: "Anfahrt",
        slug: "anfahrt",
        subMenu: false,
    },
];
const socialMedia = [
    {
        title: "Facebook",
        link: "https://www.facebook.com/MainGlueckskind.dreieich/",
        icon: <FaFacebook></FaFacebook>,
    },
    {
        title: "Instagram",
        link: "https://www.instagram.com/mainglueckskind.dreieich/",
        icon: <FaInstagram></FaInstagram>,
    },
];

export { menuItems, socialMedia };
