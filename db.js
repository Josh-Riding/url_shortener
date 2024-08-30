import dotenv from "dotenv";
dotenv.config();
const { DB, COLLECTION } = process.env;

async function uploadUrlObject(client, urlPayload) {
  try {
    // Insert payload
    await client.db(DB).collection(COLLECTION).insertOne(urlPayload);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

async function findObject(client, url) {
  try {
    const result = await client.db(DB).collection(COLLECTION).findOne(url);
    return result;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

async function updateObject(client, id) {
  try {
    await client.connect();
    await client
      .db(DB)
      .collection(COLLECTION)
      .updateOne({ generatedUrl: id }, { $inc: { clicks: 1 } });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

export { uploadUrlObject, findObject, updateObject };
