export default function changeBackgroundColor(data) {
    if (data._type == "home" || data._type == "raumvermietung" || data._type == "ueberuns") {
        document.body.style.backgroundColor = "#CDE4C4";
        return;
    }
    if (data._type == "kindergeburtstag") {
        document.body.style.backgroundColor = "#F3D7E2";
        return;
    }
    if (data._type == "cafe") {
        document.body.style.backgroundColor = "#F3D7E2";
        return;
    }

    if (data._type == "erwachsene" || data.title === "Erwachsene" || data.kategorie?.name == "Erwachsene") {
        document.body.style.backgroundColor = "#C8C1E1";
        return;
    }
    if (
        data._type == "baby-&-kleinkind" ||
        data.title === "Baby & Kleinkind" ||
        data.kategorie?.name == "Baby & Kleinkind"
    ) {
        document.body.style.backgroundColor = "#F3E894";
        return;
    }
    if (
        data._type == "beratung-&-coachings" ||
        data.title === "Beratung, Coachings & Workshops" ||
        data.kategorie?.name == "Beratung, Coachings & Workshops" ||
        data.kategorie?.name == "Beratung & Coachings"
    ) {
        document.body.style.backgroundColor = "#3E55AB";
        return;
    }
    document.body.style.backgroundColor = "#CDE4C4";

    // setBackgroundColor(color);
}
