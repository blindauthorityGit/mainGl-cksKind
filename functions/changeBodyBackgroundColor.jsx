export default function changeBackgroundColor(data) {
    console.log(data._type, data.title, data.kategorie?.name);
    if (data._type == "home" || data._type == "raumvermietung") {
        document.body.style.backgroundColor = "#CDE4C4";
    }
    if (data._type == "kindergeburtstag") {
        document.body.style.backgroundColor = "#F3D7E2";
    }
    if (
        data._type == "schwangerschaft" ||
        data.title === "Schwangerschaft" ||
        data.kategorie?.name == "Schwangerschaft"
    ) {
        document.body.style.backgroundColor = "#C8C1E1";
    }
    if (
        data._type == "baby-&-kleinkind" ||
        data.title === "Baby & Kleinkind" ||
        data.kategorie?.name == "Baby & Kleinkind"
    ) {
        document.body.style.backgroundColor = "#F3E894";
    }
    if (
        data._type == "beratung-&-workshops" ||
        data.title === "Beratung & Workshops" ||
        data.kategorie?.name == "Beratung & Workshops"
    ) {
        document.body.style.backgroundColor = "#3E55AB";
    }
    // setBackgroundColor(color);
}
