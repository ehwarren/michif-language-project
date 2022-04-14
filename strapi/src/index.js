"use strict";

const { contentAPI } = require("@strapi/utils/lib/sanitize");
const md = require('markdown-it')();

const {
  transformResponse,
} = require("@strapi/strapi/lib/core-api/controller/transform");

module.exports = {
  register({ strapi }) {
    const extension = ({ nexus }) => {
      return {
        types: [
          nexus.extendType({
            type: "Query",
            definition: (t) => {
              t.field("pageBySlug", {
                type: "PageEntityResponse",
                args: { slug: nexus.stringArg("slug of the page") },
                resolve: async (root, args, ctx) => {
                  const data = await strapi.entityService.findMany(
                    "api::page.page",
                    { filters: { slug: args.slug } }
                  );
                  if (data && data[0]) {
                    const schema = strapi.getModel("api::page.page");
                    const sanitaized = await contentAPI.output(
                      data[0],
                      schema,
                      {
                        auth: ctx.auth,
                      }
                    );
                    const entity = await strapi
                      .plugin("graphql")
                      .service("format")
                      .returnTypes.toEntityResponse(sanitaized, {
                        resourceUID: "api::page.page",
                      });
                    return entity;
                  }
                  return null;
                },
              });
            },
          }),
          nexus.extendType({
            type: "ComponentBlocksTextBlock",
            definition: (t) => {
              t.field("Content", {
                type: "String",
                resolve: async (root, args, ctx) => {
                  return md.render(root.Content);
                },
              });
            },
          }),
        ],
        resolversConfig: {
          "Query.pageBySlug": {
            auth: {
              scope: ["api::page.page.findOne"],
            },
          },
        },
      };
    };

    strapi.plugin("graphql").service("extension").use(extension);
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) {},
};
