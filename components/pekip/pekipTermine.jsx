import { parseISO, format } from "date-fns";
import urlFor from "../../functions/urlFor";
import { PortableTextEvent, RegularText, AnmeldeContent, AnmeldeButton } from "../content";

import { H2, H4, H3, P } from "../typography";
// If you have a global store or a modal for "Anfrage," import or connect it.
// import useStore from "../../store/store";

export default function PekipTermine({ sessions, data }) {
    if (!sessions?.length) return null;

    // Example: mock handler for "Anfrage" button
    const handleAnfrage = (trainer) => {
        // If you have a global store or modal: e.g. setShowAnfrage(true);
        // or pass a callback prop from the parent component.
        console.log("Anfrage clicked for trainer:", trainer?.name);
    };

    return (
        <div className="my-8 font-sans">
            <h3 className="text-2xl font-bold mb-4 text-primaryColor">PEKiP-Termine</h3>
            <div className="space-y-4">
                {sessions.map((session, idx) => {
                    const startDate = parseISO(session.startDate);
                    const dateFormatted = format(startDate, "dd.MM.yyyy");
                    const startTime = session.timeslot?.startTime;
                    const endTime = session.timeslot?.endTime;

                    console.log(session);

                    return (
                        <div
                            key={session._key || idx}
                            className="border border-gray-200 rounded-md p-4 lg:p-8 bg-white shadow-sm"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-xl font-semibold text-primaryColor mb-1">{session.title}</div>
                                    <div className="text-base  text-textColor mb-1">{session.subTitle}</div>
                                    <div className="text-sm text-gray-500">
                                        <P>Nächster Termin:</P>
                                        <P>
                                            {" "}
                                            {dateFormatted} | {startTime} – {endTime}
                                        </P>
                                    </div>
                                </div>
                                {session.trainer?.image && (
                                    <img
                                        src={urlFor(session.trainer.image).width(80).height(80).url()}
                                        alt={session.trainer.name}
                                        className="w-16 h-16 object-cover rounded-full"
                                    />
                                )}
                            </div>
                            <div className="mt-2 text-base text-gray-700">
                                <span className="font-medium">Trainer:</span> {session.trainer?.name || "Unbekannt"}
                            </div>
                            <div className="mt-4">
                                {/* <button
                                    onClick={() => handleAnfrage(session.trainer)}
                                    className="inline-block px-4 py-2 text-sm font-semibold text-white bg-primaryColor rounded-md shadow hover:bg-primaryColor-dark"
                                >
                                    Anfrage
                                </button> */}
                                <AnmeldeButton
                                    email={session.trainer.email}
                                    events={
                                        data.pekipSingle
                                            ? {
                                                  ...data,
                                                  eventDetails: {
                                                      ...data.eventDetails,
                                                      // Overwrite "partner" to be the trainer
                                                      partner: {
                                                          image: session.trainer?.image,
                                                          name: session.trainer?.name,
                                                          email: session.trainer?.email,
                                                          slug: { current: session.trainer?.slug },
                                                          // etc.
                                                      },
                                                  },
                                              }
                                            : data
                                    }
                                    // data={dataKontakt[0]}
                                    isPekip={true}
                                    klasse="justify-end"
                                    anfrage={true}
                                ></AnmeldeButton>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
