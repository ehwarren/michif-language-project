const fs = require("fs");
module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: "aws-cloudfront",
      providerOptions: {
        accessKeyId: env("AWS_ACCESS_KEY_ID"),
        secretAccessKey: env("AWS_ACCESS_SECRET"),
        region: env("AWS_REGION"),
        bucket: env("AWS_BUCKET_NAME"),
        cdn: env("AWS_CLOUDFRONT"),
      },
      breakpoints: {
        widescreen: 2560,
        hd: 1920,
        large: 1000,
        medium: 750,
        small: 500,
        xsmall: 64,
      },
    },
  },
  "cache-invalidate": {
    enabled: true,
    resolve: "./src/plugins/cache-invalidate",
  },
  seo: {
    enabled: true,
  },
  email: {
    config: {
      provider: "sendgrid",
      providerOptions: {
        apiKey: env("SENDGRID_API_KEY"),
      },
      settings: {
        defaultFrom: "no-reply@bgrv.dev",
        defaultReplyTo: "no-reply@bgrv.dev",
      },
    },
  },
});
