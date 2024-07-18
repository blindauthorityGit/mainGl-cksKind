// client.js
import { createClient } from "@sanity/client";

const client = createClient({
    projectId: "prz88za0",
    dataset: "production",
    apiVersion: "2024-07-18", // use current UTC date - see "specifying API version"!
    useCdn: true, // `false` if you want to ensure fresh data
});

export default client;
