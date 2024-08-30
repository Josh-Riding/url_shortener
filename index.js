import dotenv from "dotenv";
dotenv.config();
import { MongoClient, ServerApiVersion } from "mongodb";
import express from "express";
import { returnUrl, redirectUrl, returnClicks } from "./posted.js";
import rateLimit from "express-rate-limit";

const uri = process.env.DB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const app = express();
const port = 3000;

app.use(express.json());
app.listen(port, () => {
  console.log(`Listening on Port: ${port}`);
});

client
  .connect()
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 15 minutes
  limit: 10, // Limit each IP to 10 requests per `window` (here, per 60 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: "You can only make 10 requests every hour",
});

app.get("/", async function (req, res) {
  res.send("Welcome to the URL Shortener");
});

//create get route to take you to the actual website

app.get("/:id", async function (req, res) {
  //reroute to new website
  await redirectUrl(req, res, client);
});

//add post route for shortening a url
app.post("/", limiter, async function (req, res) {
  await returnUrl(req, res, client);
});

app.post("/:id", async function (req, res) {
  await returnClicks(req, res, client);
});

process.on("SIGINT", async () => {
  try {
    await client.close();
    console.log("MongoDB connection closed.");
    process.exit(0);
  } catch (error) {
    console.error("Error closing MongoDB connection:", error);
    process.exit(1);
  }
});
