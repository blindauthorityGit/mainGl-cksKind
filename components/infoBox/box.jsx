import React from "react";
import ListItem from "./listElement";
import { P, H2 } from "../typography";

const Box = ({ data, sessions }) => {
    return (
        <div className="lg:px-16 col-span-12">
            <H2 klasse="col-span-12 text-center  mt-16 lg:mt-24">Aktuelle Kurszeiten (Timetable):</H2>
            <P klasse="col-span-12 text-center font-bold mb-8">Unsere PEKiP-Kurse auf einen Blick</P>
            <div className="col-span-12 bg-yellowColor py-12 p-4 lg:p-20 lg:rounded-[140px] flex flex-col items-center">
                <div className="lg:max-w-5xl lg:px-8">
                    {sessions.map((e, i) => {
                        return <ListItem session={e} i={i}></ListItem>;
                    })}
                    <P klasse="font-bold mt-8">Hinweis:</P>
                    <P>
                        Diese Zeiten zeigen dir, wann PEKiP-Kurse bei uns stattfinden. Du kannst dir aber keinen festen
                        Tag oder eine bestimmte Uhrzeit aussuchen, da die Gruppen nach Altersstruktur zusammengestellt
                        werden.
                    </P>
                </div>
            </div>
        </div>
    );
};

export default Box;
