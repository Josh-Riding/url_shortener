import dotenv from "dotenv";
dotenv.config();
import { findObject, uploadUrlObject, updateObject } from "./db.js";
import mongoose from "mongoose";
import { urlSchema } from "./schema.js";
import createID from "./shorten.js";
import isUrlHttp from "is-url-http";

export async function returnUrl(req, res, client) {
  try {
    //validate url and exit if bad
    const url = req.body.url;
    if (!isUrlHttp(url)) {
      return res.status(400).json({ error: "The URL provided is not valid." });
    }
    //search url and return or create entry and return
    const urlObject = await findObject(client, { originalUrl: url });
    if (urlObject) {
      return res.status(200).json({ generatedUrl: urlObject.generatedUrl });
    } else {
      const UrlBatch = mongoose.model("UrlBatch", urlSchema);

      const urlPayload = new UrlBatch({
        originalUrl: url,
        generatedUrl: await createID(client),
        creationDate: Date.now(),
        clicks: 0,
      });
      await uploadUrlObject(client, urlPayload);
      return res.status(201).json({ generatedUrl: urlPayload.generatedUrl });
    }
  } catch (error) {
    console.error("Error in returnUrl:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function redirectUrl(req, res, client) {
  const id = req.params.id;
  try {
    // Fetch the URL object
    const urlObject = await findObject(client, { generatedUrl: id });

    // If found, return the original URL and update the clicks
    if (urlObject) {
      await updateObject(client, id);
      res.redirect(urlObject.originalUrl); // Redirect to the original URL
    } else {
      res.status(404).json({ error: "URL path is nonexistent" });
    }
  } catch (error) {
    // Handle any other errors accordingly
    console.error("Error in redirectUrl:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function returnClicks(req, res, client) {
  const id = req.params.id;
  try {
    const urlObject = await findObject(client, { generatedUrl: id });

    if (urlObject) {
      res.send(`This URL has ${urlObject.clicks} clicks`);
    } else {
      res.status(404).json({ error: "Shortened URL is non-identifiable" });
    }
  } catch (error) {
    console.error("Error in returnClciks:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
