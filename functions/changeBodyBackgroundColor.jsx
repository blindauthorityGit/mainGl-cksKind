export default function changeBackgroundColor(data) {
    console.log(data._type, data.title);
    if (data._type == "home") {
        document.body.style.backgroundColor = "#CDE4C4";
    }
    if (data._type == "schwangerschaft" || data.title === "Schwangerschaft") {
        document.body.style.backgroundColor = "#C8C1E1";
    }
    if (data._type == "baby-&-kleinkind" || data.title === "Baby & Kleinkind") {
        document.body.style.backgroundColor = "#F3E894";
    }
    if (data._type == "beratung-&-workshops" || data.title === "Beratung & Workshops") {
        document.body.style.backgroundColor = "#3E55AB";
    }
    // setBackgroundColor(color);
}
