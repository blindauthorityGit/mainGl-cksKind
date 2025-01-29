import React from "react";
import urlFor from "../../functions/urlFor";
import { P } from "../typography";

import Person from "../../assets/kontakt.svg";

const ListElement = ({ session, i }) => {
    return (
        <div key={session._key} className=" rounded-md mb-2">
            <div
                className={`grid grid-cols-3 items-center gap-8 px-2 lg:px-16 ${
                    i % 2 !== 0 ? "bg-white" : "bg-[#f1edcc]"
                }`}
            >
                {/* Title Column */}
                <P klasse="!font-bold" className="text-xl font-semibold text-textColor text-start">
                    {session.title.split(" ")[1]}
                </P>

                {/* Time Slot Column */}
                <P className="text-xl font-semibold text-textColor text-center">
                    {session.timeslot.startTime} - {session.timeslot.endTime}
                </P>

                {/* Trainer Column */}
                <div className="flex justify-start items-center gap-3 p-2">
                    {session.trainer?.image ? (
                        <img
                            src={urlFor(session.trainer.image).width(80).height(80).url()}
                            alt={session.trainer.name}
                            className="w-12 h-12 object-cover rounded-full"
                        />
                    ) : (
                        <img
                            src={Person.src}
                            alt={session.trainer.name}
                            className="w-12 h-12 object-cover rounded-full"
                        />
                    )}
                    <P klasse=" hidden lg:block">{session.trainer?.name || "Unbekannt"}</P>
                </div>
            </div>
        </div>
    );
};

export default ListElement;
