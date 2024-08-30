import mongoose from "mongoose";

export const urlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    require: true,
  },
  generatedUrl: {
    type: String,
    require: true,
  },
  creationDate: {
    type: Number,
    require: true,
  },
  clicks: Number,
});
