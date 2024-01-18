import { FaFacebook, FaInstagram } from "react-icons/fa";

const menuItems = [
    {
        title: "Programm",
        slug: "programm",
        subMenu: true,
        subMenuItems: [
            {
                title: "Schwangerschaft",
                slug: "kurse/schwangerschaft",
            },
            {
                title: "Beratung & Workshops",
                slug: "kurse/beratung-&-workshops",
            },

            {
                title: "Baby & Kleinkind",
                slug: "kurse/baby-&-kleinkind",
            },
        ],
    },
    {
        title: "Cafe",
        slug: "cafe",
        subMenu: false,
    },
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
];
const socialMedia = [
    {
        title: "Facebook",
        link: "http://www.facebook.com/piz1000",
        icon: <FaFacebook></FaFacebook>,
    },
    {
        title: "Inbstagram",
        link: "http://www.instagram.com",
        icon: <FaInstagram></FaInstagram>,
    },
];

export { menuItems, socialMedia };
