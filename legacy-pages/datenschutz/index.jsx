import React, { useEffect } from "react";
import MainContainer from "../../components/layout/mainContainer";
import { H1, H2, H3, H4, H5, P } from "../../components/typography";
//FUNCTIONS
import changeBodyBackgroundColor from "../../functions/changeBodyBackgroundColor";

const Datenschutz = () => {
    useEffect(() => {
        changeBodyBackgroundColor("");
    }, []);
    return (
        <MainContainer width="container mx-auto">
            <div className="col-span-12 px-8 lg:px-0 pt-32 pb-36 lg:pt-48  lg:pb-24">
                <H1 klasse="hyphens-auto">Datenschutzerklärung</H1>
                <H2 id="m716">Präambel</H2>
                <P>
                    Mit der folgenden Datenschutzerklärung möchten wir Sie darüber aufklären, welche Arten Ihrer
                    personenbezogenen Daten (nachfolgend auch kurz als "Daten" bezeichnet) wir zu welchen Zwecken und in
                    welchem Umfang verarbeiten. Die Datenschutzerklärung gilt für alle von uns durchgeführten
                    Verarbeitungen personenbezogener Daten, sowohl im Rahmen der Erbringung unserer Leistungen als auch
                    insbesondere auf unseren Webseiten, in mobilen Applikationen sowie innerhalb externer
                    Onlinepräsenzen, wie z.&nbsp;B. unserer Social-Media-Profile (nachfolgend zusammenfassend bezeichnet
                    als "Onlineangebot").
                </P>
                <div className="h-4 lg:h-8"></div>
                <P>Die verwendeten Begriffe sind nicht geschlechtsspezifisch.</P>
                <div className="h-4 lg:h-8"></div>
                <P>Stand: 1. Februar 2024</P>
                <div className="h-4 lg:h-8"></div>
                <H3>Inhaltsübersicht</H3> <div className="h-4 lg:h-8"></div>
                <ul className="index list-disc pl-5 space-y-2 font-sans">
                    <li>
                        <a className="index-link" href="#m716">
                            Präambel
                        </a>
                    </li>
                    <li>
                        <a className="index-link" href="#m3">
                            Verantwortlicher
                        </a>
                    </li>
                    <li>
                        <a className="index-link" href="#mOverview">
                            Übersicht der Verarbeitungen
                        </a>
                    </li>
                    <li>
                        <a className="index-link" href="#m2427">
                            Maßgebliche Rechtsgrundlagen
                        </a>
                    </li>
                    <li>
                        <a className="index-link" href="#m27">
                            Sicherheitsmaßnahmen
                        </a>
                    </li>
                    <li>
                        <a className="index-link" href="#m25">
                            Übermittlung von personenbezogenen Daten
                        </a>
                    </li>
                    <li>
                        <a className="index-link" href="#m24">
                            Internationale Datentransfers
                        </a>
                    </li>
                    <li>
                        <a className="index-link" href="#m10">
                            Rechte der betroffenen Personen
                        </a>
                    </li>
                    <li>
                        <a className="index-link" href="#m134">
                            Einsatz von Cookies
                        </a>
                    </li>
                    <li>
                        <a className="index-link" href="#m225">
                            Bereitstellung des Onlineangebotes und Webhosting
                        </a>
                    </li>
                    <li>
                        <a className="index-link" href="#m182">
                            Kontakt- und Anfragenverwaltung
                        </a>
                    </li>
                    <li>
                        <a className="index-link" href="#m17">
                            Newsletter und elektronische Benachrichtigungen
                        </a>
                    </li>
                    <li>
                        <a className="index-link" href="#m638">
                            Werbliche Kommunikation via E-Mail, Post, Fax oder Telefon
                        </a>
                    </li>
                    <li>
                        <a className="index-link" href="#m263">
                            Webanalyse, Monitoring und Optimierung
                        </a>
                    </li>
                    <li>
                        <a className="index-link" href="#m136">
                            Präsenzen in sozialen Netzwerken (Social Media)
                        </a>
                    </li>
                    <li>
                        <a className="index-link" href="#m328">
                            Plugins und eingebettete Funktionen sowie Inhalte
                        </a>
                    </li>
                </ul>
                <div className="h-4 lg:h-8"></div>
                <H3 id="m3">Verantwortlicher</H3>
                <div className="h-4 lg:h-8"></div>
                <P>
                    Hoessle und Kreil GbR - MAIN GLÜCKSKIND
                    <br />
                    Robert-Bosch-Straße 28
                    <br />
                    63303 Dreieich-Sprendlingen
                    <br />
                    Deutschland
                    <br />
                    E-Mail: <a href="mailto:info@mainglueckskind.de">info@mainglueckskind.de</a>
                    <br />
                    Fax: 06103/3984956
                </P>
                <div className="h-4 lg:h-8"></div>
                <P>
                    E-Mail-Adresse: <a href="mailto:info@mainglueckskind.de">info@mainglueckskind.de</a>
                </P>
                <div className="h-4 lg:h-8"></div>
                <P>
                    Impressum:{" "}
                    <a href="https://www.mainglueckskind.de/impressum" target="_blank">
                        https://www.mainglueckskind.de/impressum
                    </a>
                </P>
                <div className="h-4 lg:h-8"></div>
                <H3 id="mOverview">Übersicht der Verarbeitungen</H3>
                <div className="h-4 lg:h-8"></div>
                <P>
                    Die nachfolgende Übersicht fasst die Arten der verarbeiteten Daten und die Zwecke ihrer Verarbeitung
                    zusammen und verweist auf die betroffenen Personen.
                </P>
                <div className="h-4 lg:h-8"></div>
                <H4>Arten der verarbeiteten Daten</H4>
                <div className="h-4 lg:h-8"></div>
                <ul className="index list-disc pl-5 space-y-2 font-sans">
                    <li>Bestandsdaten.</li>
                    <li>Kontaktdaten.</li>
                    <li>Inhaltsdaten.</li>
                    <li>Nutzungsdaten.</li>
                    <li>Meta-, Kommunikations- und Verfahrensdaten.</li>
                </ul>
                <div className="h-4 lg:h-8"></div>
                <H4>Kategorien betroffener Personen</H4>
                <div className="h-4 lg:h-8"></div>
                <ul className="index list-disc pl-5 space-y-2 font-sans">
                    <li>Kommunikationspartner.</li>
                    <li>Nutzer.</li>
                </ul>
                <div className="h-4 lg:h-8"></div>
                <H4>Zwecke der Verarbeitung</H4>
                <div className="h-4 lg:h-8"></div>
                <ul className="index list-disc pl-5 space-y-2 font-sans">
                    <li>Kontaktanfragen und Kommunikation.</li>
                    <li>Sicherheitsmaßnahmen.</li>
                    <li>Direktmarketing.</li>
                    <li>Reichweitenmessung.</li>
                    <li>Verwaltung und Beantwortung von Anfragen.</li>
                    <li>Feedback.</li>
                    <li>Marketing.</li>
                    <li>Profile mit nutzerbezogenen Informationen.</li>
                    <li>Bereitstellung unseres Onlineangebotes und Nutzerfreundlichkeit.</li>
                    <li>Informationstechnische Infrastruktur.</li>
                </ul>
                <div className="h-4 lg:h-8"></div>
                <H3 id="m2427">Maßgebliche Rechtsgrundlagen</H3>
                <div className="h-4 lg:h-8"></div>
                <P>
                    <strong>Maßgebliche Rechtsgrundlagen nach der DSGVO: </strong>Im Folgenden erhalten Sie eine
                    Übersicht der Rechtsgrundlagen der DSGVO, auf deren Basis wir personenbezogene Daten verarbeiten.
                    Bitte nehmen Sie zur Kenntnis, dass neben den Regelungen der DSGVO nationale Datenschutzvorgaben in
                    Ihrem bzw. unserem Wohn- oder Sitzland gelten können. Sollten ferner im Einzelfall speziellere
                    Rechtsgrundlagen maßgeblich sein, teilen wir Ihnen diese in der Datenschutzerklärung mit.
                </P>
                <div className="h-4 lg:h-8"></div>
                <ul className="index list-disc pl-5 space-y-2 font-sans">
                    <li>
                        <strong>Einwilligung (Art. 6 Abs. 1 S. 1 lit. a) DSGVO)</strong> - Die betroffene Person hat
                        ihre Einwilligung in die Verarbeitung der sie betreffenden personenbezogenen Daten für einen
                        spezifischen Zweck oder mehrere bestimmte Zwecke gegeben.
                    </li>
                    <li>
                        <strong>
                            Vertragserfüllung und vorvertragliche Anfragen (Art. 6 Abs. 1 S. 1 lit. b) DSGVO)
                        </strong>{" "}
                        - Die Verarbeitung ist für die Erfüllung eines Vertrags, dessen Vertragspartei die betroffene
                        Person ist, oder zur Durchführung vorvertraglicher Maßnahmen erforderlich, die auf Anfrage der
                        betroffenen Person erfolgen.
                    </li>
                    <li>
                        <strong>Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO)</strong> - Die Verarbeitung
                        ist zur Wahrung der berechtigten Interessen des Verantwortlichen oder eines Dritten
                        erforderlich, sofern nicht die Interessen oder Grundrechte und Grundfreiheiten der betroffenen
                        Person, die den Schutz personenbezogener Daten erfordern, überwiegen.
                    </li>
                </ul>
                <div className="h-4 lg:h-8"></div>
                <P>
                    <strong>Nationale Datenschutzregelungen in Deutschland: </strong>Zusätzlich zu den
                    Datenschutzregelungen der DSGVO gelten nationale Regelungen zum Datenschutz in Deutschland. Hierzu
                    gehört insbesondere das Gesetz zum Schutz vor Missbrauch personenbezogener Daten bei der
                    Datenverarbeitung (Bundesdatenschutzgesetz – BDSG). Das BDSG enthält insbesondere Spezialregelungen
                    zum Recht auf Auskunft, zum Recht auf Löschung, zum Widerspruchsrecht, zur Verarbeitung besonderer
                    Kategorien personenbezogener Daten, zur Verarbeitung für andere Zwecke und zur Übermittlung sowie
                    automatisierten Entscheidungsfindung im Einzelfall einschließlich Profiling. Ferner können
                    Landesdatenschutzgesetze der einzelnen Bundesländer zur Anwendung gelangen.
                </P>
                <div className="h-4 lg:h-8"></div>
                <P>
                    <strong>Hinweis auf Geltung DSGVO und Schweizer DSG: </strong>Diese Datenschutzhinweise dienen
                    sowohl der Informationserteilung nach dem schweizerischen Bundesgesetz über den Datenschutz
                    (Schweizer DSG) als auch nach der Datenschutzgrundverordnung (DSGVO). Aus diesem Grund bitten wir
                    Sie zu beachten, dass aufgrund der breiteren räumlichen Anwendung und Verständlichkeit die Begriffe
                    der DSGVO verwendet werden. Insbesondere statt der im Schweizer DSG verwendeten Begriffe
                    „Bearbeitung" von „Personendaten", "überwiegendes Interesse" und "besonders schützenswerte
                    Personendaten" werden die in der DSGVO verwendeten Begriffe „Verarbeitung" von „personenbezogenen
                    Daten" sowie "berechtigtes Interesse" und "besondere Kategorien von Daten" verwendet. Die
                    gesetzliche Bedeutung der Begriffe wird jedoch im Rahmen der Geltung des Schweizer DSG weiterhin
                    nach dem Schweizer DSG bestimmt.
                </P>
                <div className="h-4 lg:h-8"></div>
                <H3 id="m27">Sicherheitsmaßnahmen</H3>
                <div className="h-4 lg:h-8"></div>
                <P>
                    Wir treffen nach Maßgabe der gesetzlichen Vorgaben unter Berücksichtigung des Stands der Technik,
                    der Implementierungskosten und der Art, des Umfangs, der Umstände und der Zwecke der Verarbeitung
                    sowie der unterschiedlichen Eintrittswahrscheinlichkeiten und des Ausmaßes der Bedrohung der Rechte
                    und Freiheiten natürlicher Personen geeignete technische und organisatorische Maßnahmen, um ein dem
                    Risiko angemessenes Schutzniveau zu gewährleisten.
                </P>
                <div className="h-4 lg:h-8"></div>
                <P>
                    Zu den Maßnahmen gehören insbesondere die Sicherung der Vertraulichkeit, Integrität und
                    Verfügbarkeit von Daten durch Kontrolle des physischen und elektronischen Zugangs zu den Daten als
                    auch des sie betreffenden Zugriffs, der Eingabe, der Weitergabe, der Sicherung der Verfügbarkeit und
                    ihrer Trennung. Des Weiteren haben wir Verfahren eingerichtet, die eine Wahrnehmung von
                    Betroffenenrechten, die Löschung von Daten und Reaktionen auf die Gefährdung der Daten
                    gewährleisten. Ferner berücksichtigen wir den Schutz personenbezogener Daten bereits bei der
                    Entwicklung bzw. Auswahl von Hardware, Software sowie Verfahren entsprechend dem Prinzip des
                    Datenschutzes, durch Technikgestaltung und durch datenschutzfreundliche Voreinstellungen.
                </P>
                <div className="h-4 lg:h-8"></div>
                <P>
                    TLS/SSL-Verschlüsselung (https): Um die Daten der Benutzer, die über unsere Online-Dienste
                    übertragen werden, zu schützen, verwenden wir TLS/SSL-Verschlüsselung. Secure Sockets Layer (SSL)
                    ist die Standardtechnologie zur Sicherung von Internetverbindungen durch Verschlüsselung der
                    zwischen einer Website oder App und einem Browser (oder zwischen zwei Servern) übertragenen Daten.
                    Transport Layer Security (TLS) ist eine aktualisierte und sicherere Version von SSL. Hyper Text
                    Transfer Protocol Secure (HTTPS) wird in der URL angezeigt, wenn eine Website durch ein
                    SSL/TLS-Zertifikat gesichert ist.
                </P>
                <div className="h-4 lg:h-8"></div>
                <H3 id="m25">Übermittlung von personenbezogenen Daten</H3>
                <div className="h-4 lg:h-8"></div>
                <P>
                    Im Rahmen unserer Verarbeitung von personenbezogenen Daten kommt es vor, dass die Daten an andere
                    Stellen, Unternehmen, rechtlich selbstständige Organisationseinheiten oder Personen übermittelt oder
                    sie ihnen gegenüber offengelegt werden. Zu den Empfängern dieser Daten können z.&nbsp;B. mit
                    IT-Aufgaben beauftragte Dienstleister oder Anbieter von Diensten und Inhalten, die in eine Webseite
                    eingebunden werden, gehören. In solchen Fällen beachten wir die gesetzlichen Vorgaben und schließen
                    insbesondere entsprechende Verträge bzw. Vereinbarungen, die dem Schutz Ihrer Daten dienen, mit den
                    Empfängern Ihrer Daten ab.
                </P>
                <div className="h-4 lg:h-8"></div>
                <P>
                    Datenübermittlung innerhalb der Organisation: Wir können personenbezogene Daten an andere Stellen
                    innerhalb unserer Organisation übermitteln oder ihnen den Zugriff auf diese Daten gewähren. Sofern
                    diese Weitergabe zu administrativen Zwecken erfolgt, beruht die Weitergabe der Daten auf unseren
                    berechtigten unternehmerischen und betriebswirtschaftlichen Interessen oder erfolgt, sofern sie
                    Erfüllung unserer vertragsbezogenen Verpflichtungen erforderlich ist oder wenn eine Einwilligung der
                    Betroffenen oder eine gesetzliche Erlaubnis vorliegt.
                </P>
                <div className="h-4 lg:h-8"></div>
                <H3 id="m24">Internationale Datentransfers</H3>
                <div className="h-4 lg:h-8"></div>
                <P>
                    Datenverarbeitung in Drittländern: Sofern wir Daten in einem Drittland (d.&nbsp;h., außerhalb der
                    Europäischen Union (EU), des Europäischen Wirtschaftsraums (EWR)) verarbeiten oder die Verarbeitung
                    im Rahmen der Inanspruchnahme von Diensten Dritter oder der Offenlegung bzw. Übermittlung von Daten
                    an andere Personen, Stellen oder Unternehmen stattfindet, erfolgt dies nur im Einklang mit den
                    gesetzlichen Vorgaben. Sofern das Datenschutzniveau in dem Drittland mittels eines
                    Angemessenheitsbeschlusses anerkannt wurde (Art. 45 DSGVO), dient dieser als Grundlage des
                    Datentransfers. Im Übrigen erfolgen Datentransfers nur dann, wenn das Datenschutzniveau anderweitig
                    gesichert ist, insbesondere durch Standardvertragsklauseln (Art. 46 Abs. 2 lit. c) DSGVO),
                    ausdrückliche Einwilligung oder im Fall vertraglicher oder gesetzlich erforderlicher Übermittlung
                    (Art. 49 Abs. 1 DSGVO). Im Übrigen teilen wir Ihnen die Grundlagen der Drittlandübermittlung bei den
                    einzelnen Anbietern aus dem Drittland mit, wobei die Angemessenheitsbeschlüsse als Grundlagen
                    vorrangig gelten. Informationen zu Drittlandtransfers und vorliegenden Angemessenheitsbeschlüssen
                    können dem Informationsangebot der EU-Kommission entnommen werden:{" "}
                    <a
                        href="https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection_en?prefLang=de"
                        target="_blank"
                    >
                        https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection_en?prefLang=de.
                    </a>
                </P>
                <div className="h-4 lg:h-8"></div>
                <P>
                    EU-US Trans-Atlantic Data Privacy Framework: Im Rahmen des sogenannten „Data Privacy Framework"
                    (DPF) hat die EU-Kommission das Datenschutzniveau ebenfalls für bestimmte Unternehmen aus den USA im
                    Rahmen der Angemessenheitsbeschlusses vom 10.07.2023 als sicher anerkannt. Die Liste der
                    zertifizierten Unternehmen als auch weitere Informationen zu dem DPF können Sie der Webseite des
                    Handelsministeriums der USA unter{" "}
                    <a href="https://www.dataprivacyframework.gov/" target="_blank">
                        https://www.dataprivacyframework.gov/
                    </a>{" "}
                    (in Englisch) entnehmen. Wir informieren Sie im Rahmen der Datenschutzhinweise, welche von uns
                    eingesetzten Diensteanbieter unter dem Data Privacy Framework zertifiziert sind.
                </P>
                <div className="h-4 lg:h-8"></div>
                <H3 id="m10">Rechte der betroffenen Personen</H3>
                <div className="h-4 lg:h-8"></div>
                <P>
                    Rechte der betroffenen Personen aus der DSGVO: Ihnen stehen als Betroffene nach der DSGVO
                    verschiedene Rechte zu, die sich insbesondere aus Art. 15 bis 21 DSGVO ergeben:
                </P>
                <div className="h-4 lg:h-8"></div>
                <ul className="index list-disc pl-5 space-y-2 font-sans">
                    <li>
                        <strong>
                            Widerspruchsrecht: Sie haben das Recht, aus Gründen, die sich aus Ihrer besonderen Situation
                            ergeben, jederzeit gegen die Verarbeitung der Sie betreffenden personenbezogenen Daten, die
                            aufgrund von Art. 6 Abs. 1 lit. e oder f DSGVO erfolgt, Widerspruch einzulegen; dies gilt
                            auch für ein auf diese Bestimmungen gestütztes Profiling. Werden die Sie betreffenden
                            personenbezogenen Daten verarbeitet, um Direktwerbung zu betreiben, haben Sie das Recht,
                            jederzeit Widerspruch gegen die Verarbeitung der Sie betreffenden personenbezogenen Daten
                            zum Zwecke derartiger Werbung einzulegen; dies gilt auch für das Profiling, soweit es mit
                            solcher Direktwerbung in Verbindung steht.
                        </strong>
                    </li>
                    <li>
                        <strong>Widerrufsrecht bei Einwilligungen:</strong> Sie haben das Recht, erteilte Einwilligungen
                        jederzeit zu widerrufen.
                    </li>
                    <li>
                        <strong>Auskunftsrecht:</strong> Sie haben das Recht, eine Bestätigung darüber zu verlangen, ob
                        betreffende Daten verarbeitet werden und auf Auskunft über diese Daten sowie auf weitere
                        Informationen und Kopie der Daten entsprechend den gesetzlichen Vorgaben.
                    </li>
                    <li>
                        <strong>Recht auf Berichtigung:</strong> Sie haben entsprechend den gesetzlichen Vorgaben das
                        Recht, die Vervollständigung der Sie betreffenden Daten oder die Berichtigung der Sie
                        betreffenden unrichtigen Daten zu verlangen.
                    </li>
                    <li>
                        <strong>Recht auf Löschung und Einschränkung der Verarbeitung:</strong> Sie haben nach Maßgabe
                        der gesetzlichen Vorgaben das Recht, zu verlangen, dass Sie betreffende Daten unverzüglich
                        gelöscht werden, bzw. alternativ nach Maßgabe der gesetzlichen Vorgaben eine Einschränkung der
                        Verarbeitung der Daten zu verlangen.
                    </li>
                    <li>
                        <strong>Recht auf Datenübertragbarkeit:</strong> Sie haben das Recht, Sie betreffende Daten, die
                        Sie uns bereitgestellt haben, nach Maßgabe der gesetzlichen Vorgaben in einem strukturierten,
                        gängigen und maschinenlesbaren Format zu erhalten oder deren Übermittlung an einen anderen
                        Verantwortlichen zu fordern.
                    </li>
                    <li>
                        <strong>Beschwerde bei Aufsichtsbehörde:</strong> Sie haben unbeschadet eines anderweitigen
                        verwaltungsrechtlichen oder gerichtlichen Rechtsbehelfs das Recht auf Beschwerde bei einer
                        Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres gewöhnlichen Aufenthaltsorts, ihres
                        Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes, wenn Sie der Ansicht sind, dass die
                        Verarbeitung der Sie betreffenden personenbezogenen Daten gegen die Vorgaben der DSGVO verstößt.
                    </li>
                </ul>
                <div className="h-4 lg:h-8"></div>
                <H3 id="m134">Einsatz von Cookies</H3>
                <div className="h-4 lg:h-8"></div>
                <P>
                    Cookies sind kleine Textdateien, bzw. sonstige Speichervermerke, die Informationen auf Endgeräten
                    speichern und Informationen aus den Endgeräten auslesen. Z.&nbsp;B. um den Login-Status in einem
                    Nutzerkonto, einen Warenkorbinhalt in einem E-Shop, die aufgerufenen Inhalte oder verwendete
                    Funktionen eines Onlineangebotes speichern. Cookies können ferner zu unterschiedlichen Zwecken
                    eingesetzt werden, z.&nbsp;B. zu Zwecken der Funktionsfähigkeit, Sicherheit und Komfort von
                    Onlineangeboten sowie der Erstellung von Analysen der Besucherströme.{" "}
                </P>
                <div className="h-4 lg:h-8"></div>
                <P>
                    <strong>Hinweise zur Einwilligung: </strong>Wir setzen Cookies im Einklang mit den gesetzlichen
                    Vorschriften ein. Daher holen wir von den Nutzern eine vorhergehende Einwilligung ein, außer wenn
                    diese gesetzlich nicht gefordert ist. Eine Einwilligung ist insbesondere nicht notwendig, wenn das
                    Speichern und das Auslesen der Informationen, also auch von Cookies, unbedingt erforderlich sind, um
                    dem den Nutzern einen von ihnen ausdrücklich gewünschten Telemediendienst (also unser Onlineangebot)
                    zur Verfügung zu stellen. Zu den unbedingt erforderlichen Cookies gehören in der Regel Cookies mit
                    Funktionen, die der Anzeige und Lauffähigkeit des Onlineangebotes , dem Lastausgleich, der
                    Sicherheit, der Speicherung der Präferenzen und Auswahlmöglichkeiten der Nutzer oder ähnlichen mit
                    der Bereitstellung der Haupt- und Nebenfunktionen des von den Nutzern angeforderten Onlineangebotes
                    zusammenhängenden Zwecken dienen. Die widerrufliche Einwilligung wird gegenüber den Nutzern deutlich
                    kommuniziert und enthält die Informationen zu der jeweiligen Cookie-Nutzung.
                </P>
                <div className="h-4 lg:h-8"></div>
                <P>
                    <strong>Hinweise zu datenschutzrechtlichen Rechtsgrundlagen: </strong>Auf welcher
                    datenschutzrechtlichen Rechtsgrundlage wir die personenbezogenen Daten der Nutzer mit Hilfe von
                    Cookies verarbeiten, hängt davon ab, ob wir Nutzer um eine Einwilligung bitten. Falls die Nutzer
                    einwilligen, ist die Rechtsgrundlage der Verarbeitung Ihrer Daten die erklärte Einwilligung.
                    Andernfalls werden die mithilfe von Cookies verarbeiteten Daten auf Grundlage unserer berechtigten
                    Interessen (z.&nbsp;B. an einem betriebswirtschaftlichen Betrieb unseres Onlineangebotes und
                    Verbesserung seiner Nutzbarkeit) verarbeitet oder, wenn dies im Rahmen der Erfüllung unserer
                    vertraglichen Pflichten erfolgt, wenn der Einsatz von Cookies erforderlich ist, um unsere
                    vertraglichen Verpflichtungen zu erfüllen. Zu welchen Zwecken die Cookies von uns verarbeitet
                    werden, darüber klären wir im Laufe dieser Datenschutzerklärung oder im Rahmen von unseren
                    Einwilligungs- und Verarbeitungsprozessen auf.
                </P>
                <div className="h-4 lg:h-8"></div>
                <P>
                    <strong>Speicherdauer:&nbsp;</strong>Im Hinblick auf die Speicherdauer werden die folgenden Arten
                    von Cookies unterschieden:
                </P>
                <div className="h-4 lg:h-8"></div>
                <ul className="index list-disc pl-5 space-y-2 font-sans">
                    <li>
                        <strong>Temporäre Cookies (auch: Session- oder Sitzungs-Cookies):</strong>&nbsp;Temporäre
                        Cookies werden spätestens gelöscht, nachdem ein Nutzer ein Online-Angebot verlassen und sein
                        Endgerät (z.&nbsp;B. Browser oder mobile Applikation) geschlossen hat.
                    </li>
                    <li>
                        <strong>Permanente Cookies:</strong> Permanente Cookies bleiben auch nach dem Schließen des
                        Endgerätes gespeichert. So können beispielsweise der Login-Status gespeichert oder bevorzugte
                        Inhalte direkt angezeigt werden, wenn der Nutzer eine Website erneut besucht. Ebenso können die
                        mit Hilfe von Cookies erhobenen Daten der Nutzer zur Reichweitenmessung verwendet werden. Sofern
                        wir Nutzern&nbsp;keine expliziten Angaben zur Art und Speicherdauer von Cookies mitteilen
                        (z.&nbsp;B. im Rahmen der Einholung der Einwilligung), sollten Nutzer davon ausgehen, dass
                        Cookies permanent sind und die Speicherdauer bis zu zwei Jahre betragen kann.
                    </li>
                </ul>
                <div className="h-4 lg:h-8"></div>
                <P>
                    <strong>Allgemeine Hinweise zum Widerruf und Widerspruch (sog. "Opt-Out"): </strong>Nutzer können
                    die von ihnen abgegebenen Einwilligungen jederzeit widerrufen und der Verarbeitung entsprechend den
                    gesetzlichen Vorgaben widersprechen. Hierzu können Nutzer unter anderem die Verwendung von Cookies
                    in den Einstellungen ihres Browsers einschränken (wobei dadurch auch die Funktionalität unseres
                    Onlineangebotes eingeschränkt sein kann). Ein Widerspruch gegen die Verwendung von Cookies zu
                    Online-Marketing-Zwecken kann auch über die Websites{" "}
                    <a href="https://optout.aboutads.info/" target="_new">
                        https://optout.aboutads.info
                    </a>{" "}
                    und{" "}
                    <a href="https://www.youronlinechoices.com/" target="_new">
                        https://www.youronlinechoices.com/
                    </a>{" "}
                    erklärt werden.
                </P>
                <div className="h-4 lg:h-8"></div>
                <ul className="index list-disc pl-5 space-y-2 font-sans">
                    <li className>
                        <strong>Rechtsgrundlagen:</strong> Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO).
                        Einwilligung (Art. 6 Abs. 1 S. 1 lit. a) DSGVO).
                    </li>
                </ul>
                <div className="h-4 lg:h-8"></div>
                <P>
                    <strong>Weitere Hinweise zu Verarbeitungsprozessen, Verfahren und Diensten:</strong>
                </P>
                <div className="h-4 lg:h-8"></div>
                <ul className="index list-disc pl-5 space-y-2 font-sans">
                    <li>
                        <strong>Verarbeitung von Cookie-Daten auf Grundlage einer Einwilligung: </strong>Wir setzen ein
                        Verfahren zum Einwilligungsmanagement: Verfahren zur Einholung, Protokollierung, Verwaltung und
                        des Widerrufs von Einwilligungen, insbesondere für den Einsatz von Cookies und ähnlichen
                        Technologien zur Speicherung, Auslesen und Verarbeitung von Informationen auf Endgeräten der
                        Nutzer sowie deren Verarbeitung ein, in dessen Rahmen die Einwilligungen der Nutzer in den
                        Einsatz von Cookies, bzw. der im Rahmen des Einwilligungsmanagement: Verfahren zur Einholung,
                        Protokollierung, Verwaltung und des Widerrufs von Einwilligungen, insbesondere für den Einsatz
                        von Cookies und ähnlichen Technologien zur Speicherung, Auslesen und Verarbeitung von
                        Informationen auf Endgeräten der Nutzer sowie deren Verarbeitung-Verfahrens genannten
                        Verarbeitungen und Anbieter eingeholt sowie von den Nutzern verwaltet und widerrufen werden
                        können. Hierbei wird die Einwilligungserklärung gespeichert, um deren Abfrage nicht erneut
                        wiederholen zu müssen und die Einwilligung entsprechend der gesetzlichen Verpflichtung
                        nachweisen zu können. Die Speicherung kann serverseitig und/oder in einem Cookie (sogenanntes
                        Opt-In-Cookie, bzw. mithilfe vergleichbarer Technologien) erfolgen, um die Einwilligung einem
                        Nutzer, bzw. dessen Gerät zuordnen zu können. Vorbehaltlich individueller Angaben zu den
                        Anbietern von Cookie-Management-Diensten, gelten die folgenden Hinweise: Die Dauer der
                        Speicherung der Einwilligung kann bis zu zwei Jahren betragen. Hierbei wird ein pseudonymer
                        Nutzer-Identifikator gebildet und mit dem Zeitpunkt der Einwilligung, Angaben zur Reichweite der
                        Einwilligung (z.&nbsp;B. welche Kategorien von Cookies und/oder Diensteanbieter) sowie dem
                        Browser, System und verwendeten Endgerät gespeichert;{" "}
                        <span className>
                            <strong>Rechtsgrundlagen:</strong> Einwilligung (Art. 6 Abs. 1 S. 1 lit. a) DSGVO).
                        </span>
                    </li>
                </ul>
                <div className="h-4 lg:h-8"></div>
                <H3 id="m225">Bereitstellung des Onlineangebotes und Webhosting</H3>
                <div className="h-4 lg:h-8"></div>
                <P>
                    Wir verarbeiten die Daten der Nutzer, um ihnen unsere Online-Dienste zur Verfügung stellen zu
                    können. Zu diesem Zweck verarbeiten wir die IP-Adresse des Nutzers, die notwendig ist, um die
                    Inhalte und Funktionen unserer Online-Dienste an den Browser oder das Endgerät der Nutzer zu
                    übermitteln.
                </P>
                <div className="h-4 lg:h-8"></div>
                <ul className="index list-disc pl-5 space-y-2 font-sans">
                    <li>
                        <strong>Verarbeitete Datenarten:</strong> Nutzungsdaten (z.&nbsp;B. besuchte Webseiten,
                        Interesse an Inhalten, Zugriffszeiten); Meta-, Kommunikations- und Verfahrensdaten (z.&nbsp;.B.
                        IP-Adressen, Zeitangaben, Identifikationsnummern, Einwilligungsstatus).
                    </li>
                    <li>
                        <strong>Betroffene Personen:</strong> Nutzer (z.&nbsp;.B. Webseitenbesucher, Nutzer von
                        Onlinediensten).
                    </li>
                    <li>
                        <strong>Zwecke der Verarbeitung:</strong> Bereitstellung unseres Onlineangebotes und
                        Nutzerfreundlichkeit; Informationstechnische Infrastruktur (Betrieb und Bereitstellung von
                        Informationssystemen und technischen Geräten (Computer, Server etc.).). Sicherheitsmaßnahmen.
                    </li>
                    <li className>
                        <strong>Rechtsgrundlagen:</strong> Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO).
                    </li>
                </ul>
                <div className="h-4 lg:h-8"></div>
                <P>
                    <strong>Weitere Hinweise zu Verarbeitungsprozessen, Verfahren und Diensten:</strong>
                </P>
                <div className="h-4 lg:h-8"></div>
                <ul className="index list-disc pl-5 space-y-2 font-sans">
                    <li>
                        <strong>Erhebung von Zugriffsdaten und Logfiles: </strong>Der Zugriff auf unser Onlineangebot
                        wird in Form von so genannten "Server-Logfiles" protokolliert. Zu den Serverlogfiles können die
                        Adresse und Name der abgerufenen Webseiten und Dateien, Datum und Uhrzeit des Abrufs,
                        übertragene Datenmengen, Meldung über erfolgreichen Abruf, Browsertyp nebst Version, das
                        Betriebssystem des Nutzers, Referrer URL (die zuvor besuchte Seite) und im Regelfall IP-Adressen
                        und der anfragende Provider gehören. Die Serverlogfiles können zum einen zu Zwecken der
                        Sicherheit eingesetzt werden, z.&nbsp;B., um eine Überlastung der Server zu vermeiden
                        (insbesondere im Fall von missbräuchlichen Angriffen, sogenannten DDoS-Attacken) und zum
                        anderen, um die Auslastung der Server und ihre Stabilität sicherzustellen;{" "}
                        <span className>
                            <strong>Rechtsgrundlagen:</strong> Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f)
                            DSGVO).{" "}
                        </span>
                        <strong>Löschung von Daten:</strong> Logfile-Informationen werden für die Dauer von maximal 30
                        Tagen gespeichert und danach gelöscht oder anonymisiert. Daten, deren weitere Aufbewahrung zu
                        Beweiszwecken erforderlich ist, sind bis zur endgültigen Klärung des jeweiligen Vorfalls von der
                        Löschung ausgenommen.
                    </li>
                </ul>
                <div className="h-4 lg:h-8"></div>
                <H3 id="m182">Kontakt- und Anfragenverwaltung</H3>
                <div className="h-4 lg:h-8"></div>
                <P>
                    Bei der Kontaktaufnahme mit uns (z.&nbsp;B. per Post, Kontaktformular, E-Mail, Telefon oder via
                    soziale Medien) sowie im Rahmen bestehender Nutzer- und Geschäftsbeziehungen werden die Angaben der
                    anfragenden Personen verarbeitet soweit dies zur Beantwortung der Kontaktanfragen und etwaiger
                    angefragter Maßnahmen erforderlich ist.
                </P>
                <div className="h-4 lg:h-8"></div>
                <ul className="index list-disc pl-5 space-y-2 font-sans">
                    <li>
                        <strong>Verarbeitete Datenarten:</strong> Kontaktdaten (z.&nbsp;B. E-Mail, Telefonnummern);
                        Inhaltsdaten (z.&nbsp;B. Eingaben in Onlineformularen); Nutzungsdaten (z.&nbsp;B. besuchte
                        Webseiten, Interesse an Inhalten, Zugriffszeiten); Meta-, Kommunikations- und Verfahrensdaten
                        (z.&nbsp;.B. IP-Adressen, Zeitangaben, Identifikationsnummern, Einwilligungsstatus).
                    </li>
                    <li>
                        <strong>Betroffene Personen:</strong> Kommunikationspartner.
                    </li>
                    <li>
                        <strong>Zwecke der Verarbeitung:</strong> Kontaktanfragen und Kommunikation; Verwaltung und
                        Beantwortung von Anfragen; Feedback (z.&nbsp;B. Sammeln von Feedback via Online-Formular).
                        Bereitstellung unseres Onlineangebotes und Nutzerfreundlichkeit.
                    </li>
                    <li className>
                        <strong>Rechtsgrundlagen:</strong> Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO).
                        Vertragserfüllung und vorvertragliche Anfragen (Art. 6 Abs. 1 S. 1 lit. b) DSGVO).
                    </li>
                </ul>
                <div className="h-4 lg:h-8"></div>
                <P>
                    <strong>Weitere Hinweise zu Verarbeitungsprozessen, Verfahren und Diensten:</strong>
                </P>
                <div className="h-4 lg:h-8"></div>
                <ul className="m-elements">
                    <li>
                        <strong>Kontaktformular: </strong>Wenn Nutzer über unser Kontaktformular, E-Mail oder andere
                        Kommunikationswege mit uns in Kontakt treten, verarbeiten wir die uns in diesem Zusammenhang
                        mitgeteilten Daten zur Bearbeitung des mitgeteilten Anliegens;{" "}
                        <span className>
                            <strong>Rechtsgrundlagen:</strong> Vertragserfüllung und vorvertragliche Anfragen (Art. 6
                            Abs. 1 S. 1 lit. b) DSGVO), Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO).
                        </span>
                    </li>
                </ul>
                <div className="h-4 lg:h-8"></div>
                <H3 id="m17">Newsletter und elektronische Benachrichtigungen</H3>
                <div className="h-4 lg:h-8"></div>
                <P>
                    Wir versenden Newsletter, E-Mails und weitere elektronische Benachrichtigungen (nachfolgend
                    "Newsletter") nur mit der Einwilligung der Empfänger oder einer gesetzlichen Erlaubnis. Sofern im
                    Rahmen einer Anmeldung zum Newsletter dessen Inhalte konkret umschrieben werden, sind sie für die
                    Einwilligung der Nutzer maßgeblich. Im Übrigen enthalten unsere Newsletter Informationen zu unseren
                    Leistungen und uns.
                </P>
                <div className="h-4 lg:h-8"></div>
                <P>
                    Um sich zu unseren Newslettern anzumelden, reicht es grundsätzlich aus, wenn Sie Ihre E-Mail-Adresse
                    angeben. Wir können Sie jedoch bitten, einen Namen, zwecks persönlicher Ansprache im Newsletter,
                    oder weitere Angaben, sofern diese für die Zwecke des Newsletters erforderlich sind, zu tätigen.
                </P>
                <div className="h-4 lg:h-8"></div>
                <P>
                    <strong>Double-Opt-In-Verfahren:</strong> Die Anmeldung zu unserem Newsletter erfolgt grundsätzlich
                    in einem sogenannten Double-Opt-In-Verfahren. D.&nbsp;h., Sie erhalten nach der Anmeldung eine
                    E-Mail, in der Sie um die Bestätigung Ihrer Anmeldung gebeten werden. Diese Bestätigung ist
                    notwendig, damit sich niemand mit fremden E-Mail-Adressen anmelden kann. Die Anmeldungen zum
                    Newsletter werden protokolliert, um den Anmeldeprozess entsprechend den rechtlichen Anforderungen
                    nachweisen zu können. Hierzu gehört die Speicherung des Anmelde- und des Bestätigungszeitpunkts als
                    auch der IP-Adresse. Ebenso werden die Änderungen Ihrer bei dem Versanddienstleister gespeicherten
                    Daten protokolliert.
                </P>
                <div className="h-4 lg:h-8"></div>
                <P>
                    <strong>Löschung und Einschränkung der Verarbeitung: </strong> Wir können die ausgetragenen
                    E-Mail-Adressen bis zu drei Jahren auf Grundlage unserer berechtigten Interessen speichern, bevor
                    wir sie löschen, um eine ehemals gegebene Einwilligung nachweisen zu können. Die Verarbeitung dieser
                    Daten wird auf den Zweck einer möglichen Abwehr von Ansprüchen beschränkt. Ein individueller
                    Löschungsantrag ist jederzeit möglich, sofern zugleich das ehemalige Bestehen einer Einwilligung
                    bestätigt wird. Im Fall von Pflichten zur dauerhaften Beachtung von Widersprüchen behalten wir uns
                    die Speicherung der E-Mail-Adresse alleine zu diesem Zweck in einer Sperrliste (sogenannte
                    "Blocklist") vor.
                </P>
                <div className="h-4 lg:h-8"></div>
                <P>
                    Die Protokollierung des Anmeldeverfahrens erfolgt auf Grundlage unserer berechtigten Interessen zu
                    Zwecken des Nachweises seines ordnungsgemäßen Ablaufs. Soweit wir einen Dienstleister mit dem
                    Versand von E-Mails beauftragen, erfolgt dies auf Grundlage unserer berechtigten Interessen an einem
                    effizienten und sicheren Versandsystem.
                </P>
                <div className="h-4 lg:h-8"></div>
                <strong>Inhalte:</strong> <p>Informationen zu uns, unseren Leistungen, Aktionen und Angeboten.</p>
                <div className="h-4 lg:h-8"></div>
                <ul className="index list-disc pl-5 space-y-2 font-sans">
                    <li>
                        <strong>Verarbeitete Datenarten:</strong> Bestandsdaten (z.&nbsp;B. Namen, Adressen);
                        Kontaktdaten (z.&nbsp;B. E-Mail, Telefonnummern); Meta-, Kommunikations- und Verfahrensdaten
                        (z.&nbsp;B. IP-Adressen, Zeitangaben, Identifikationsnummern, Einwilligungsstatus);
                        Nutzungsdaten (z.&nbsp;.B. besuchte Webseiten, Interesse an Inhalten, Zugriffszeiten).
                    </li>
                    <li>
                        <strong>Betroffene Personen:</strong> Kommunikationspartner.
                    </li>
                    <li>
                        <strong>Zwecke der Verarbeitung:</strong> Direktmarketing (z.&nbsp;.B. per E-Mail oder
                        postalisch).
                    </li>
                    <li className>
                        <strong>Rechtsgrundlagen:</strong> Einwilligung (Art. 6 Abs. 1 S. 1 lit. a) DSGVO).
                    </li>
                    <li>
                        <strong>Widerspruchsmöglichkeit (Opt-Out): </strong>Sie können den Empfang unseres Newsletters
                        jederzeit kündigen, d.&nbsp;.h. Ihre Einwilligungen widerrufen, bzw. dem weiteren Empfang
                        widersprechen. Einen Link zur Kündigung des Newsletters finden Sie entweder am Ende eines jeden
                        Newsletters oder können sonst eine der oben angegebenen Kontaktmöglichkeiten, vorzugswürdig
                        E-Mail, hierzu nutzen.
                    </li>
                </ul>
                <div className="h-4 lg:h-8"></div>
                <P>
                    <strong>Weitere Hinweise zu Verarbeitungsprozessen, Verfahren und Diensten:</strong>
                </P>
                <div className="h-4 lg:h-8"></div>
                <ul className="index list-disc pl-5 space-y-2 font-sans">
                    <li>
                        <strong>Messung von Öffnungs- und Klickraten: </strong>Die Newsletter enthalten einen sogenannte
                        "web-beacon", d.&nbsp;h., eine pixelgroße Datei, die beim Öffnen des Newsletters von unserem
                        Server, bzw., sofern wir einen Versanddienstleister einsetzen, von dessen Server abgerufen wird.
                        Im Rahmen dieses Abrufs werden zunächst technische Informationen, wie Informationen zum Browser
                        und Ihrem System, als auch Ihre IP-Adresse und der Zeitpunkt des Abrufs, erhoben. <br />
                        <br />
                        Diese Informationen werden zur technischen Verbesserung unseres Newsletters anhand der
                        technischen Daten oder der Zielgruppen und ihres Leseverhaltens auf Basis ihrer Abruforte (die
                        mit Hilfe der IP-Adresse bestimmbar sind) oder der Zugriffszeiten genutzt. Diese Analyse
                        beinhaltet ebenfalls die Feststellung, ob die Newsletter geöffnet werden, wann sie geöffnet
                        werden und welche Links geklickt werden. Diese Informationen werden den einzelnen
                        Newsletterempfängern zugeordnet und in deren Profilen bis zu deren Löschung gespeichert. Die
                        Auswertungen dienen uns dazu, die Lesegewohnheiten unserer Nutzer zu erkennen und unsere Inhalte
                        an sie anzupassen oder unterschiedliche Inhalte entsprechend den Interessen unserer Nutzer zu
                        versenden.
                        <br />
                        <br />
                        Die Messung der Öffnungsraten und der Klickraten sowie Speicherung der Messergebnisse in den
                        Profilen der Nutzer
                        <span
                            className="dsg-license-content-blurred de dsg-ttip-activate"
                            title="Bitte geben Sie einen Lizenzschlüssel ein, um die Texte freizuschalten."
                        >
                            {" "}
                            - Dieser Textbereich muss mit einer Premium Lizenz freischaltet werden. - premiumtext
                            premiumtext premiumtext premiumtext premiumtext premiumtext premiumtext premiumtext
                            premiumtext premiumtext premiumtext premiumtext premiumtext premiumtext premiumtext
                            premiumtext premiumtext premiumtext premiumtext premiumtext premiumtext premiumtext
                            premiumtext premiumtext premiumtext premiumtext premiumtext premiumtext premiumtext
                            premiumtext premiumtext premiumtext premiumtext premiumtext premiumtext premiumtext
                            premiumtext premiumtext premiumtext premiumtext premiumtext premiumtext premiumtext{" "}
                        </span>
                        ;{" "}
                        <span className>
                            <strong>Rechtsgrundlagen:</strong> Einwilligung (Art. 6 Abs. 1 S. 1 lit. a) DSGVO).
                        </span>
                    </li>
                </ul>
                <div className="h-4 lg:h-8"></div>
                <H3 id="m638">Werbliche Kommunikation via E-Mail, Post, Fax oder Telefon</H3>
                <div className="h-4 lg:h-8"></div>
                <P>
                    Wir verarbeiten personenbezogene Daten zu Zwecken der werblichen Kommunikation, die über diverse
                    Kanäle, wie z.&nbsp;B. E-Mail, Telefon, Post oder Fax, entsprechend den gesetzlichen Vorgaben
                    erfolgen kann.
                </P>
                <div className="h-4 lg:h-8"></div>
                <P>
                    Die Empfänger haben das Recht, erteilte Einwilligungen jederzeit zu widerrufen oder der werblichen
                    Kommunikation jederzeit zu widersprechen.
                </P>
                <div className="h-4 lg:h-8"></div>
                <P>
                    Nach Widerruf oder Widerspruch speichern wir die zum Nachweis der bisherigen Berechtigung
                    erforderlichen Daten zur Kontaktaufnahme oder Zusendung bis zu drei Jahre nach Ablauf des Jahres des
                    Widerrufs oder Widerspruchs auf der Grundlage unserer berechtigten Interessen. Die Verarbeitung
                    dieser Daten ist auf den Zweck einer möglichen Abwehr von Ansprüchen beschränkt. Auf der Grundlage
                    des berechtigten Interesses, den Widerruf bzw. Widerspruch der Nutzer dauerhaft zu beachten,
                    speichern wir ferner die zur Vermeidung einer erneuten Kontaktaufnahme erforderlichen Daten
                    (z.&nbsp;B. je nach Kommunikationskanal die E-Mail-Adresse, Telefonnummer, Name).
                </P>
                <div className="h-4 lg:h-8"></div>
                <ul className="index list-disc pl-5 space-y-2 font-sans">
                    <li>
                        <strong>Verarbeitete Datenarten:</strong> Bestandsdaten (z.&nbsp;B. Namen, Adressen);
                        Kontaktdaten (z.&nbsp;.B. E-Mail, Telefonnummern).
                    </li>
                    <li>
                        <strong>Betroffene Personen:</strong> Kommunikationspartner.
                    </li>
                    <li>
                        <strong>Zwecke der Verarbeitung:</strong> Direktmarketing (z.&nbsp;.B. per E-Mail oder
                        postalisch).
                    </li>
                    <li className>
                        <strong>Rechtsgrundlagen:</strong> Einwilligung (Art. 6 Abs. 1 S. 1 lit. a) DSGVO). Berechtigte
                        Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO).
                    </li>
                </ul>
                <div className="h-4 lg:h-8"></div>
                <H3 id="m263">Webanalyse, Monitoring und Optimierung</H3>
                <div className="h-4 lg:h-8"></div>
                <P>
                    Die Webanalyse (auch als "Reichweitenmessung" bezeichnet) dient der Auswertung der Besucherströme
                    unseres Onlineangebotes und kann Verhalten, Interessen oder demographische Informationen zu den
                    Besuchern, wie z.&nbsp;B. das Alter oder das Geschlecht, als pseudonyme Werte umfassen. Mit Hilfe
                    der Reichweitenanalyse können wir z.&nbsp;B. erkennen, zu welcher Zeit unser Onlineangebot oder
                    dessen Funktionen oder Inhalte am häufigsten genutzt werden oder zur Wiederverwendung einladen.
                    Ebenso können wir nachvollziehen, welche Bereiche der Optimierung bedürfen.{" "}
                </P>
                <div className="h-4 lg:h-8"></div>
                <P>
                    Neben der Webanalyse können wir auch Testverfahren einsetzen, um z.&nbsp;B. unterschiedliche
                    Versionen unseres Onlineangebotes oder seiner Bestandteile zu testen und optimieren.
                </P>
                <div className="h-4 lg:h-8"></div>
                <P>
                    Sofern nachfolgend nicht anders angegeben, können zu diesen Zwecken Profile, d.&nbsp;h. zu einem
                    Nutzungsvorgang zusammengefasste Daten angelegt und Informationen in einem Browser, bzw. in einem
                    Endgerät gespeichert und aus diesem ausgelesen werden. Zu den erhobenen Angaben gehören insbesondere
                    besuchte Webseiten und dort genutzte Elemente sowie technische Angaben, wie der verwendete Browser,
                    das verwendete Computersystem sowie Angaben zu Nutzungszeiten. Sofern Nutzer in die Erhebung ihrer
                    Standortdaten uns gegenüber oder gegenüber den Anbietern der von uns eingesetzten Dienste
                    einverstanden erklärt haben, können auch Standortdaten verarbeitet werden.
                </P>
                <div className="h-4 lg:h-8"></div>
                <P>
                    Es werden ebenfalls die IP-Adressen der Nutzer gespeichert. Jedoch nutzen wir ein
                    IP-Masking-Verfahren (d.&nbsp;h., Pseudonymisierung durch Kürzung der IP-Adresse) zum Schutz der
                    Nutzer. Generell werden die im Rahmen von Webanalyse, A/B-Testings und Optimierung keine Klardaten
                    der Nutzer (wie z.&nbsp;B. E-Mail-Adressen oder Namen) gespeichert, sondern Pseudonyme. D.&nbsp;h.,
                    wir als auch die Anbieter der eingesetzten Software kennen nicht die tatsächliche Identität der
                    Nutzer, sondern nur den für Zwecke der jeweiligen Verfahren in deren Profilen gespeicherten Angaben.
                </P>
                <div className="h-4 lg:h-8"></div>
                <ul className="index list-disc pl-5 space-y-2 font-sans">
                    <li>
                        <strong>Verarbeitete Datenarten:</strong> Nutzungsdaten (z.&nbsp;B. besuchte Webseiten,
                        Interesse an Inhalten, Zugriffszeiten); Meta-, Kommunikations- und Verfahrensdaten (z.&nbsp;.B.
                        IP-Adressen, Zeitangaben, Identifikationsnummern, Einwilligungsstatus).
                    </li>
                    <li>
                        <strong>Betroffene Personen:</strong> Nutzer (z.&nbsp;.B. Webseitenbesucher, Nutzer von
                        Onlinediensten).
                    </li>
                    <li>
                        <strong>Zwecke der Verarbeitung:</strong> Reichweitenmessung (z.&nbsp;B. Zugriffsstatistiken,
                        Erkennung wiederkehrender Besucher). Profile mit nutzerbezogenen Informationen (Erstellen von
                        Nutzerprofilen).
                    </li>
                    <li>
                        <strong>Sicherheitsmaßnahmen:</strong> IP-Masking (Pseudonymisierung der IP-Adresse).
                    </li>
                </ul>
                <div className="h-4 lg:h-8"></div>
                <H3 id="m136">Präsenzen in sozialen Netzwerken (Social Media)</H3>
                <div className="h-4 lg:h-8"></div>
                <P>
                    Wir unterhalten Onlinepräsenzen innerhalb sozialer Netzwerke und verarbeiten in diesem Rahmen Daten
                    der Nutzer, um mit den dort aktiven Nutzern zu kommunizieren oder um Informationen über uns
                    anzubieten.
                </P>
                <div className="h-4 lg:h-8"></div>
                <P>
                    Wir weisen darauf hin, dass dabei Daten der Nutzer außerhalb des Raumes der Europäischen Union
                    verarbeitet werden können. Hierdurch können sich für die Nutzer Risiken ergeben, weil so z.&nbsp;B.
                    die Durchsetzung der Rechte der Nutzer erschwert werden könnte.
                </P>
                <div className="h-4 lg:h-8"></div>
                <P>
                    Ferner werden die Daten der Nutzer innerhalb sozialer Netzwerke im Regelfall für Marktforschungs-
                    und Werbezwecke verarbeitet. So können z.&nbsp;B. anhand des Nutzungsverhaltens und sich daraus
                    ergebender Interessen der Nutzer Nutzungsprofile erstellt werden. Die Nutzungsprofile können
                    wiederum verwendet werden, um z.&nbsp;B. Werbeanzeigen innerhalb und außerhalb der Netzwerke zu
                    schalten, die mutmaßlich den Interessen der Nutzer entsprechen. Zu diesen Zwecken werden im
                    Regelfall Cookies auf den Rechnern der Nutzer gespeichert, in denen das Nutzungsverhalten und die
                    Interessen der Nutzer gespeichert werden. Ferner können in den Nutzungsprofilen auch Daten
                    unabhängig der von den Nutzern verwendeten Geräte gespeichert werden (insbesondere, wenn die Nutzer
                    Mitglieder der jeweiligen Plattformen sind und bei diesen eingeloggt sind).
                </P>
                <div className="h-4 lg:h-8"></div>
                <P>
                    Für eine detaillierte Darstellung der jeweiligen Verarbeitungsformen und der
                    Widerspruchsmöglichkeiten (Opt-Out) verweisen wir auf die Datenschutzerklärungen und Angaben der
                    Betreiber der jeweiligen Netzwerke.
                </P>
                <div className="h-4 lg:h-8"></div>
                <P>
                    Auch im Fall von Auskunftsanfragen und der Geltendmachung von Betroffenenrechten weisen wir darauf
                    hin, dass diese am effektivsten bei den Anbietern geltend gemacht werden können. Nur die Anbieter
                    haben jeweils Zugriff auf die Daten der Nutzer und können direkt entsprechende Maßnahmen ergreifen
                    und Auskünfte geben. Sollten Sie dennoch Hilfe benötigen, dann können Sie sich an uns wenden.
                </P>
                <div className="h-4 lg:h-8"></div>
                <ul className="index list-disc pl-5 space-y-2 font-sans">
                    <li>
                        <strong>Verarbeitete Datenarten:</strong> Kontaktdaten (z.&nbsp;B. E-Mail, Telefonnummern);
                        Inhaltsdaten (z.&nbsp;B. Eingaben in Onlineformularen); Nutzungsdaten (z.&nbsp;B. besuchte
                        Webseiten, Interesse an Inhalten, Zugriffszeiten); Meta-, Kommunikations- und Verfahrensdaten
                        (z.&nbsp;.B. IP-Adressen, Zeitangaben, Identifikationsnummern, Einwilligungsstatus).
                    </li>
                    <li>
                        <strong>Betroffene Personen:</strong> Nutzer (z.&nbsp;.B. Webseitenbesucher, Nutzer von
                        Onlinediensten).
                    </li>
                    <li>
                        <strong>Zwecke der Verarbeitung:</strong> Kontaktanfragen und Kommunikation; Feedback
                        (z.&nbsp;B. Sammeln von Feedback via Online-Formular). Marketing.
                    </li>
                    <li className>
                        <strong>Rechtsgrundlagen:</strong> Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO).
                    </li>
                </ul>
                <div className="h-4 lg:h-8"></div>
                <P>
                    <strong>Weitere Hinweise zu Verarbeitungsprozessen, Verfahren und Diensten:</strong>
                </P>
                <div className="h-4 lg:h-8"></div>
                <ul className="index list-disc pl-5 space-y-2 font-sans">
                    <li>
                        <strong>Instagram: </strong>Soziales Netzwerk; <strong>Dienstanbieter:</strong> Meta Platforms
                        Ireland Limited, Merrion Road, Dublin 4, D04 X2K5, Irland;{" "}
                        <span className>
                            <strong>Rechtsgrundlagen:</strong> Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f)
                            DSGVO);{" "}
                        </span>
                        <strong>Website:</strong>{" "}
                        <a href="https://www.instagram.com" target="_blank">
                            https://www.instagram.com
                        </a>
                        . <strong>Datenschutzerklärung:</strong>{" "}
                        <a href="https://instagram.com/about/legal/privacy" target="_blank">
                            https://instagram.com/about/legal/privacy
                        </a>
                        .
                    </li>
                </ul>
                <H3 id="m328">Plugins und eingebettete Funktionen sowie Inhalte</H3>
                <div className="h-4 lg:h-8"></div>
                <P>
                    Wir binden in unser Onlineangebot Funktions- und Inhaltselemente ein, die von den Servern ihrer
                    jeweiligen Anbieter (nachfolgend bezeichnet als "Drittanbieter") bezogen werden. Dabei kann es sich
                    zum Beispiel um Grafiken, Videos oder Stadtpläne handeln (nachfolgend einheitlich bezeichnet als
                    "Inhalte").
                </P>
                <div className="h-4 lg:h-8"></div>
                <P>
                    Die Einbindung setzt immer voraus, dass die Drittanbieter dieser Inhalte die IP-Adresse der Nutzer
                    verarbeiten, da sie ohne die IP-Adresse die Inhalte nicht an deren Browser senden könnten. Die
                    IP-Adresse ist damit für die Darstellung dieser Inhalte oder Funktionen erforderlich. Wir bemühen
                    uns, nur solche Inhalte zu verwenden, deren jeweilige Anbieter die IP-Adresse lediglich zur
                    Auslieferung der Inhalte verwenden. Drittanbieter können ferner sogenannte Pixel-Tags (unsichtbare
                    Grafiken, auch als "Web Beacons" bezeichnet) für statistische oder Marketingzwecke verwenden. Durch
                    die "Pixel-Tags" können Informationen, wie der Besucherverkehr auf den Seiten dieser Webseite,
                    ausgewertet werden. Die pseudonymen Informationen können ferner in Cookies auf dem Gerät der Nutzer
                    gespeichert werden und unter anderem technische Informationen zum Browser und zum Betriebssystem, zu
                    verweisenden Webseiten, zur Besuchszeit sowie weitere Angaben zur Nutzung unseres Onlineangebotes
                    enthalten als auch mit solchen Informationen aus anderen Quellen verbunden werden.
                </P>
                <div className="h-4 lg:h-8"></div>
                <ul className="index list-disc pl-5 space-y-2 font-sans">
                    <li>
                        <strong>Verarbeitete Datenarten:</strong> Nutzungsdaten (z.&nbsp;B. besuchte Webseiten,
                        Interesse an Inhalten, Zugriffszeiten); Meta-, Kommunikations- und Verfahrensdaten (z.&nbsp;.B.
                        IP-Adressen, Zeitangaben, Identifikationsnummern, Einwilligungsstatus).
                    </li>
                    <li>
                        <strong>Betroffene Personen:</strong> Nutzer (z.&nbsp;.B. Webseitenbesucher, Nutzer von
                        Onlinediensten).
                    </li>
                    <li>
                        <strong>Zwecke der Verarbeitung:</strong> Bereitstellung unseres Onlineangebotes und
                        Nutzerfreundlichkeit.
                    </li>
                    <li className>
                        <strong>Rechtsgrundlagen:</strong> Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO).
                    </li>
                </ul>
                <div className="h-4 lg:h-8"></div>
                <P>
                    <strong>Weitere Hinweise zu Verarbeitungsprozessen, Verfahren und Diensten:</strong>
                </P>
                <div className="h-4 lg:h-8"></div>
                <ul className="index list-disc pl-5 space-y-2 font-sans">
                    <li>
                        <strong>Google Fonts (Bezug vom Google Server): </strong>Bezug von Schriften (und Symbolen) zum
                        Zwecke einer technisch sicheren, wartungsfreien und effizienten Nutzung von Schriften und
                        Symbolen im Hinblick auf Aktualität und Ladezeiten, deren einheitliche Darstellung und
                        Berücksichtigung möglicher lizenzrechtlicher Beschränkungen. Dem Anbieter der Schriftarten wird
                        die IP-Adresse des Nutzers mitgeteilt, damit die Schriftarten im Browser des Nutzers zur
                        Verfügung gestellt werden können. Darüber hinaus werden technische Daten (Spracheinstellungen,
                        Bildschirmauflösung, Betriebssystem, verwendete Hardware) übermittelt, die für die
                        Bereitstellung der Schriften in Abhängigkeit von den verwendeten Geräten und der technischen
                        Umgebung notwendig sind. Diese Daten können auf einem Server des Anbieters der Schriftarten in
                        den USA verarbeitet werden - Beim Besuch unseres Onlineangebotes senden die Browser der Nutzer
                        ihre Browser HTTP-Anfragen an die Google Fonts Web API (d.&nbsp;h. eine Softwareschnittstelle
                        für den Abruf der Schriftarten). Die Google Fonts Web API stellt den Nutzern die Cascading Style
                        Sheets (CSS) von Google Fonts und danach die in der CCS angegebenen Schriftarten zur Verfügung.
                        Zu diesen HTTP-Anfragen gehören (1) die vom jeweiligen Nutzer für den Zugriff auf das Internet
                        verwendete IP-Adresse, (2) die angeforderte URL auf dem Google-Server und (3) die HTTP-Header,
                        einschließlich des User-Agents, der die Browser- und Betriebssystemversionen der Websitebesucher
                        beschreibt, sowie die Verweis-URL (d.&nbsp;h. die Webseite, auf der die Google-Schriftart
                        angezeigt werden soll). IP-Adressen werden weder auf Google-Servern protokolliert noch
                        gespeichert und sie werden nicht analysiert. Die Google Fonts Web API protokolliert Details der
                        HTTP-Anfragen (angeforderte URL, User-Agent und Verweis-URL). Der Zugriff auf diese Daten ist
                        eingeschränkt und streng kontrolliert. Die angeforderte URL identifiziert die Schriftfamilien,
                        für die der Nutzer Schriftarten laden möchte. Diese Daten werden protokolliert, damit Google
                        bestimmen kann, wie oft eine bestimmte Schriftfamilie angefordert wird. Bei der Google Fonts Web
                        API muss der User-Agent die Schriftart anpassen, die für den jeweiligen Browsertyp generiert
                        wird. Der User-Agent wird in erster Linie zum Debugging protokolliert und verwendet, um
                        aggregierte Nutzungsstatistiken zu generieren, mit denen die Beliebtheit von Schriftfamilien
                        gemessen wird. Diese zusammengefassten Nutzungsstatistiken werden auf der Seite „Analysen" von
                        Google Fonts veröffentlicht. Schließlich wird die Verweis-URL protokolliert, sodass die Daten
                        für die Wartung der Produktion verwendet und ein aggregierter Bericht zu den Top-Integrationen
                        basierend auf der Anzahl der Schriftartenanfragen generiert werden kann. Google verwendet laut
                        eigener Auskunft keine der von Google Fonts erfassten Informationen, um Profile von Endnutzern
                        zu erstellen oder zielgerichtete Anzeigen zu schalten; <strong>Dienstanbieter:</strong> Google
                        Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland;{" "}
                        <span className>
                            <strong>Rechtsgrundlagen:</strong> Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f)
                            DSGVO);{" "}
                        </span>
                        <strong>Website:</strong>{" "}
                        <a href="https://fonts.google.com/" target="_blank">
                            https://fonts.google.com/
                        </a>
                        ; <strong>Datenschutzerklärung:</strong>{" "}
                        <a href="https://policies.google.com/privacy" target="_blank">
                            https://policies.google.com/privacy
                        </a>
                        ; <strong>Grundlage Drittlandübermittlung:</strong>{" "}
                        <span className> EU-US Data Privacy Framework (DPF)</span>.{" "}
                        <strong>Weitere Informationen:</strong>{" "}
                        <a href="https://developers.google.com/fonts/faq/privacy?hl=de" target="_blank">
                            https://developers.google.com/fonts/faq/privacy?hl=de
                        </a>
                        .
                    </li>
                </ul>
                <div className="h-4 lg:h-8"></div>
                <P className="seal">
                    <a
                        href="https://datenschutz-generator.de/"
                        title="Rechtstext von Dr. Schwenke - für weitere Informationen bitte anklicken."
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                    >
                        Erstellt mit kostenlosem Datenschutz-Generator.de von Dr. Thomas Schwenke
                    </a>
                </P>
            </div>
        </MainContainer>
    );
};

export default Datenschutz;
