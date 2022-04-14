"use strict";

module.exports = {
  index(ctx) {
    ctx.body = strapi
      .plugin("cache-invalidate")
      .service("invalidatorService")
      .invalidate();
  },
};
