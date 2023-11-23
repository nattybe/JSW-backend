import mongoose from "mongoose";

const { Schema } = mongoose;

const Job = mongoose.model("Jobs", new Schema({
  _id: String,
  title: String,
  url: {
    type: String,
    required: true,
    unique: true,
  },
  date: String,
  from: String,
  content: String,
  image_url:String,
  all_content:String,
}));

export {Job}