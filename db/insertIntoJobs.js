import mongoose from "mongoose";
import { success } from "../msg.js";
import { Job } from "./models.js";

export const insertJob = async (job) => {
  success("DB Connection");

  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/jswDb");
    success("Connected to MongoDB");

    const newJob = new Job(job);

    await newJob.save();
    console.log("Job created successfully");
  } catch (error) {
    console.error("Error creating job:", error.message);
  } finally {
    await mongoose.connection.close();
    success("Disconnected from MongoDB");
  }
};
