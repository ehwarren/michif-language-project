module.exports = {
    client: {
        includes: ["app/utils/queries/**/*.tsx"],
        service: {
            name: "strapi",
            localSchemaFile: "./types/graphql-schema.json",
        },
    },
};
