import React, { useEffect } from "react";
import MainContainer from "../../components/layout/mainContainer";
import { H1, H2, H3, H4, H5, P } from "../../components/typography";
//FUNCTIONS
import changeBodyBackgroundColor from "../../functions/changeBodyBackgroundColor";
import Divider from "../../components/layout/divider";

const Impressum = () => {
    useEffect(() => {
        changeBodyBackgroundColor("");
    }, []);
    return (
        <MainContainer width="container mx-auto">
            <div className="col-span-12 px-8 lg:px-0 pt-32 pb-36 lg:pt-48  lg:pb-24">
                <H1>Impressum</H1>
                <P>
                    Hoessle und Kreil GbR - MAIN GLÜCKSKIND
                    <br />
                    Robert-Bosch-Straße 28
                    <br />
                    63303 Dreieich-Sprendlingen
                    <br />
                    Deutschland
                    <br />
                    E-Mail: info@mainglueckskind.de
                    <br />
                    Fax: 06103/3984956
                </P>
                <Divider></Divider>
                <H3 klasse="mb-4">Vertretungsberechtigte Gesellschafterinnen:</H3>
                <P>
                    Anja Kreil
                    <br />
                    Arlett von Hoessle
                </P>
                <Divider></Divider>
                <H3 klasse="mb-4">Verantwortlich für den Inhalt:</H3>
                <P>Hoessle und Kreil GbR - MAIN GLÜCKSKIND, Anschrift siehe oben</P>
                <Divider></Divider>
                <H3 klasse="mb-4">Außergerichtliche Streitbeilegung</H3>
                <P>
                    Die Plattform der EU zur außergerichtlichen Online-Streitbeilegung finden Sie hier:
                    https://ec.europa.eu/consumers/odr/ Der Betreiber ist weder bereit noch verpflichtet, an einem
                    Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
                </P>
                <Divider></Divider>
                <H3 klasse="mb-4">Haftung für Inhalte</H3>
                <P>
                    Der Seitenbetreiber übernimmt keine Haftung für von Dritten übermittelte oder gespeicherte
                    Informationen. Eine Pflicht zur Überwachung dieser Informationen besteht seitens des
                    Seitenbetreibers nicht. Sofern rechtswidrige Informationen von Dritten übermittelt oder gespeichert
                    werden, haftet der Seitenbetreiber erst, wenn er einer berechtigten Aufforderung zur Löschung der
                    Informationen nicht nachkommt. Offensichtlich rechtswidrige Informationen werden umgehend nach
                    Bekanntwerden gelöscht.
                </P>
                <Divider></Divider>
                <H3 klasse="mb-4">Haftung für Links</H3>
                <P>
                    Der Seitenbetreiber hat keinen Einfluss auf externe Links. Vor Veröffentlichung der Links auf diesen
                    Seiten wurden diese im zumutbaren Rahmen auf Übereinstimmung mit den gesetzlichen Bestimmungen
                    geprüft. Der Seitenbetreiber ist nicht verantwortlich für Änderungen, die sich auf den über externen
                    Links aufrufbaren Seiten ergeben. Insbesondere ist eine durchgehende Kontrolle von externen Links
                    auf Rechtsverletzungen nicht zumutbar. Sofern der Seitenbetreiber auf rechtswidrige Inhalte
                    hingewiesen wird, die über externe Links abrufbar sind, entfernt er diese Links umgehend.
                </P>
                <Divider></Divider>
                <H3 klasse="mb-4">Urheberrecht</H3>
                <P>
                    Das Urheberrecht an allen auf den Seiten des Betreibers abrufbaren Texten und multimedialen Inhalten
                    liegt beim Seitenbetreiber, soweit abweichende Urheberrechte nicht gesondert ausgewiesen werden.
                    Sofern die Urheberrechte Dritter nicht ausgewiesen sind, wird um eine Mitteilung via E-Mail gebeten.
                    Der Seitenbetreiber wird solche Inhalte umgehend entfernen. Die Verarbeitung, Verbreitung und
                    Vervielfältigung von Inhalten ist ohne die ausdrückliche Zustimmung des Seitenbetreibers nicht
                    zulässig.
                </P>
                <Divider></Divider>

                <H3 klasse="mb-4">Webdesign & Programmierung</H3>
                <P>
                    <a href="https://www.sabocon.com">Sabocon GmbH</a>
                </P>
            </div>
        </MainContainer>
    );
};

export default Impressum;
