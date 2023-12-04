import Head from "next/head";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import MainContainer from "../components/layout/mainContainer";

// SANITY
import client from "../client";

//COMPS
import { MainHero } from "../components/Hero";

//FUNCTIONS
import changeBodyBackgroundColor from "../functions/changeBodyBackgroundColor";

export default function Home({ dataHome }) {
    useEffect(() => {
        console.log(dataHome);
        changeBodyBackgroundColor(dataHome);
    }, []);
    return (
        <MainContainer width="">
            <Head>
                <title>Site title</title>
            </Head>
            <MainHero data={dataHome.components[0]}></MainHero>
            {/* <h1 className="font-sans">Hallo ich bin ein Textor</h1> */}
        </MainContainer>
    );
}

export const getStaticProps = async (context) => {
    const resHome = await client.fetch(`
  *[_type == "home"][0]
`);
    const dataHome = await resHome;

    return {
        props: {
            dataHome,
        },
        revalidate: 1, // 10 seconds
    };
};
