"use strict";

/**
 * Module dependencies
 */

/* eslint-disable no-unused-vars */
// Public node modules.
const _ = require("lodash");
const {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const { Upload } = require("@aws-sdk/lib-storage");

module.exports = {
  init(config) {
    const S3 = new S3Client({
      apiVersion: "2006-03-01",
      region: config.region,
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
    });

    const upload = async (file, customParams = {}) =>
      new Promise(async (resolve, reject) => {
        // upload file on S3 bucket
        const path = file.path ? `${file.path}/` : "";
        try {
          const key = `${path}${file.hash}${file.ext}`;
          const upload = new Upload({
            client: S3,
            params: {
              Bucket: config.bucket,
              Key: key,
              Body: file.stream || Buffer.from(file.buffer, "binary"),
              ContentType: file.mime,
              CacheControl: 'max-age=604800',
              ACL: "public-read",
            },
          });
          const data = await upload.done();

          if (config.cdn) {
            file.url = `//${config.cdn}/${key}`;
          } else {
            file.url = data.Location;
          }
          resolve();
        } catch (err) {
          return reject(err);
        }
      });

    return {
      uploadStream(file, customParams = {}) {
        return upload(file, customParams);
      },
      upload(file, customParams = {}) {
        return upload(file, customParams);
      },
      delete(file, customParams = {}) {
        return new Promise(async (resolve, reject) => {
          // delete file on S3 bucket
          const path = file.path ? `${file.path}/` : "";
          try {
            const response = await S3.send(
              new DeleteObjectCommand({
                Bucket: config.bucket,
                Key: `${path}${file.hash}${file.ext}`,
              })
            );
          } catch (err) {
            return reject(err);
          }
          resolve();
        });
      },
    };
  },
};
