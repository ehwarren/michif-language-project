"use strict";

const { CloudFront } = require("@aws-sdk/client-cloudfront");

module.exports = ({ strapi }) => ({
  async invalidate() {
    let cf = new CloudFront({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_ACCESS_SECRET,
      },
    });
    const invalidationRequest = await cf.createInvalidation({
      DistributionId: process.env.AWS_CLOUDFRONT_ID,
      InvalidationBatch: {
        CallerReference: new Date().toString(),
        Paths: {
          Items: ["/*"],
          Quantity: 1,
        },
      },
    });

    strapi.log.info("Invalidating Cloudfront " + process.env.AWS_CLOUDFRONT_ID);
    return invalidationRequest;
  },
});
