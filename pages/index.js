import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import MainContainer from "../components/layout/mainContainer";
import Hero from "../components/Hero/hero";

export default function Home() {
    return (
        <MainContainer width="max-w-[80%]">
            <Head>
                <title>Site title</title>
            </Head>
            <Hero fullHeight={true} colspan="col-span-12"></Hero>
            <h1 className="font-sans">Hallo ich bin ein Text</h1>
        </MainContainer>
    );
}
