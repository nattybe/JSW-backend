import mongoose from "mongoose";

const { Schema } = mongoose;

const jobSchema = new Schema({
    _id: String, // Use the url as the ID
    title: String,
    url: {
      type: String,
      required: true,
      unique: true,
    },
    date: String,
    from: String,
    content: String,
  });
const Job = mongoose.model("Jobs", jobSchema);

export {Job}