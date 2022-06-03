"use strict";

/**
 *  glossary-item controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::glossary-item.glossary-item",
  ({ strapi }) => ({
    // Method 1: Creating an entirely custom action
    async import(ctx) {
      const csvFilePath = "./data/import.csv";
      console.log(process.cwd());

      const csv = require("csvtojson");
      const jsonArray = await csv().fromFile(csvFilePath);
      const item = jsonArray[0];

      //todo create categories
      //todo relate all items as required
      //import the first item
      const entry = await strapi.entityService.create(
        "api::glossary-item.glossary-item",
        {
          data: {
            English: item["English Phrase"],
            Michif: item["Michif Word"],
            ExampleEnglish: item["Example usage"],
            PartOfSpeech: item["Part of speech"] || null,
            Note: item["Note"],
            VariantType: item["Variant Type"] || null,
            Phonetics: item["Pronunciation"],
            SoundUrl: item["Sound file"],
            SoundSpeaker: item["Speaker"],
            SoundLocation: item["Location"],
            SoundDate: item["Date"] || null,
            French: item["French Phrase(s)"],
            Registrar: item["Registrar"],
          },
        }
      );

      console.log(jsonArray);
    },
  })
);
