// src/components/listElement.jsx
import React from "react";
import urlFor from "../../functions/urlFor";
import { P } from "../typography";
import Person from "../../assets/kontakt.svg";

const ListElement = ({ session, i }) => {
    return (
        <div key={session._key} className="rounded-md mb-2">
            <div
                className={`
          grid
          grid-cols-1        /* mobile: 1 Spalte */
          lg:grid-cols-3     /* ab lg: 3 Spalten wie bisher */
          items-center
          gap-4              /* engerer Abstand auf mobile */
          px-4 py-3          /* mobile Padding */
          lg:px-16 lg:py-2   /* Desktop-Padding wie gehabt */
          ${i % 2 !== 0 ? "bg-white" : "bg-[#f1edcc]"}
        `}
            >
                {/* Title Column */}
                <P klasse="!font-bold text-lg lg:text-xl text-textColor text-start">
                    {session.title}
                    <br />
                    <span className="text-sm font-medium">{session.subTitle}</span>
                </P>

                {/* Time Slot Column */}
                <P klasse="text-lg lg:text-xl font-semibold text-textColor lg:text-center mt-2 lg:mt-0">
                    {session.timeslot.startTime} – {session.timeslot.endTime}
                </P>

                {/* Trainer Column */}
                <div className="flex items-center gap-3 mt-2 lg:mt-0 lg:justify-center">
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
                    {/* Name auch auf Mobile anzeigen */}
                    <P klasse="text-sm lg:text-base">{session.trainer?.name || "Unbekannt"}</P>
                </div>
            </div>
        </div>
    );
};

export default ListElement;
