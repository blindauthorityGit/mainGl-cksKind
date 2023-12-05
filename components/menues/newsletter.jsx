import { useState } from "react";
import { FaEnvelope, FaPaperPlane } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { MdEmail } from "react-icons/md";

function Newsletter(props) {
    const [showForm, setShowForm] = useState(false);

    function handleButtonClick() {
        setShowForm(true);
    }

    return (
        <div onClick={props.onClick} className="md:w-[10rem]">
            <div className="navbar-container bg-primaryColor-200 rounded-md h-full flex items-center justify-around px-3 py-1 md:py-3">
                <div className="navbar-brand text-blackText text-xs md:text-sm font-semibold">Newsletter</div>
                <div className="navbar-button text-blackText">
                    <FaPaperPlane className="navbar-icon" />
                </div>
            </div>
        </div>
    );
}

export default Newsletter;
