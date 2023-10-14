import mongoose from "mongoose";
import { success } from "../msg.js";
import { Job } from "./models.js";

success("DB Connection");

mongoose
  .connect("mongodb://127.0.0.1:27017/jswDb")
  .then(() => {
    success("Connected to MongoDB");

    const newJob = new Job({
      title: "Safaricom Telecom Job Vacancy 2023",
      url: "https://effoysira.com/safaricom-telecommunications-vacancy-2023/",
      date: "OCTOBER 4, 2023",
      from: "EFFOY",
      content:
        "Safaricom Telecommunications Ethiopia Vacancy Announcement: Safaricom Ethiopia is looking for a qualified person who meets the criteria indicated below. Safaricom Ethiopia is owned by an international consortium including Vodafone Group; Safaricom PLC; Vodacom Group; Sumitomo Corporation – one of the…",
    });
    newJob
      .save()
      .then(() => {
        console.log("Job created successfully");
      })
      .catch((error) => {
        console.error("Error creating job:", error.message);
      })
      .finally(() => {
        mongoose.connection
          .close()
          .then(() => {
            success("Disconnected from MongoDB");
          })
          .catch((error) => {
            console.error("Error disconnecting from MongoDB:", error);
          });
      });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });
