export default function changeBackgroundColor(data) {
    console.log(data._type);
    if (data._type == "home") {
        document.body.style.backgroundColor = "#CDE4C4";
    }
    // setBackgroundColor(color);
}
