import { ApolloClient, InMemoryCache, NormalizedCacheObject } from "@apollo/client";

let strapi: ApolloClient<NormalizedCacheObject>;

const BASE_URL = "http://localhost:1337/graphql";

declare global {
    var __strapi: ApolloClient<NormalizedCacheObject> | undefined;
}

if (process.env.NODE_ENV === "production") {
    strapi = new ApolloClient({
        uri: BASE_URL,
        cache: new InMemoryCache(),
        ssrMode: true,
        defaultOptions: {
            query: {
                fetchPolicy: "no-cache",
            },
            watchQuery: {
                fetchPolicy: "no-cache",
            },
        },
    });
} else {
    if (!global.__strapi) {
        global.__strapi = new ApolloClient({
            uri: BASE_URL,
            cache: new InMemoryCache(),
            ssrMode: true,
            defaultOptions: {
                query: {
                    fetchPolicy: "no-cache",
                },
                watchQuery: {
                    fetchPolicy: "no-cache",
                },
            },
        });
    }
    strapi = global.__strapi;
}

export { strapi };
