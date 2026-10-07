import Head from "next/head";
import styles from "../styles/Closure.module.css";

export default function Home() {
    return (
        <>
            <Head>
                <title>Danke von Herzen | MAIN GLÜCKSKIND</title>
                <meta
                    name="description"
                    content="Ein herzlicher Abschied von MAIN GLÜCKSKIND. PEKiP geht mit Arlett weiter."
                />
            </Head>
            <main className={styles.page}>
                <article className={styles.message}>
                    <div className={styles.heart} aria-hidden="true">
                        💛
                    </div>
                    <p className={styles.eyebrow}>MAIN GLÜCKSKIND</p>
                    <h1>Danke von Herzen</h1>

                    <div className={styles.copy}>
                        <p>
                            MAIN GLÜCKSKIND geht zu Ende, zumindest in der Form, in der ihr es kennt und in der wir es
                            gemeinsam mit euch aufgebaut und gelebt haben.
                        </p>
                        <p>
                            Wir haben diesen Ort mit einer großen Vision begonnen: einen Platz zu schaffen, an dem
                            Familien willkommen sind, Kinder sich entfalten dürfen und Gemeinschaft ganz
                            selbstverständlich entsteht.
                        </p>
                        <p>
                            Danke an alle Familien, an alle Kursleiterinnen und an alle, die diesen Ort mitgetragen
                            haben, fürs Mitfiebern, Mitfühlen und Mitmachen.
                        </p>
                        <p>
                            Und was bleibt? PEKiP geht mit Arlett weiter. Wenn ihr Interesse habt, meldet euch unter{" "}
                            <a href="mailto:info@mainglueckskind.de">info@mainglueckskind.de</a>.
                        </p>
                    </div>

                    <p className={styles.signoff}>
                        Alles Liebe,
                        <br />
                        Anja &amp; Arlett
                    </p>
                </article>
            </main>
        </>
    );
}
