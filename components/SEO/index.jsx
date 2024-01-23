// components/Meta.js
import Head from "next/head";

import urlFor from "../../functions/urlFor";

const Meta = ({ data }) => {
    return (
        <Head>
            <title>{data.mainSEO.title}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta charSet="utf-8" />
            <meta name="description" content={data.mainSEO.description} />
            <meta name="keywords" content={data.mainSEO.keywords.map((e) => e)} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            {/* <meta property="og:url" content={url} /> */}
            <meta property="og:title" content={data.mainSEO.title} />
            <meta property="og:description" content={data.mainSEO.description} />
            <meta property="og:image" content={urlFor(data.advancedSEO.ogImage)} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            {/* <meta property="twitter:url" content={url} /> */}
            <meta property="twitter:title" content={data.mainSEO.title} />
            <meta property="twitter:description" content={data.mainSEO.description} />
            <meta property="twitter:image" content={data.advancedSEO.description} />
        </Head>
    );
};

export default Meta;
