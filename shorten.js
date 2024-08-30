import dotenv from "dotenv";
dotenv.config();
import { nanoid } from "nanoid";
import { findObject } from "./db.js";

export default async function createID(client) {
  const id = nanoid();
  if (await findObject(client, { generatedUrl: id })) {
    return createID();
  } else {
    return id;
  }
}
