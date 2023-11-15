// import db from '../db/db.js'
import { MeiliSearch } from "meilisearch";
import { Job } from "../db/models.js";
import mongoose from "mongoose";

const connectToMongoDB = async () => {
  console.log("Hello MFS");

  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/jswDb", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = mongoose.connection;

    db.on("error", console.error.bind(console, "MongoDB connection error:"));
    db.once("open", () => {
      console.log("Connected to MongoDB");
    });

    const foundJobs = await Job.find();
    const sanitizedDocuments = foundJobs.map((job) => ({
      ...job._doc,
      _id: job._id
        .toString()
        .replace(/\//g, "3451")
        .replace(/:/g, "3452")
        .replace(/\./g, "3453"),
    }));
    // console.warn(sanitizedDocuments);
    const client = new MeiliSearch({ host: "http://127.0.0.1:7700" });
    // client.deleteIndex("jobs");
    // client.deleteIndex("job");
    // console.warn("Both Deleted");
    const index = client.index("jobs");

    try {
      index.addDocuments(sanitizedDocuments).then(async (res) => {
        console.log(await client.getTask(res.taskUid));
      });
      // const taskStatus = await client.getTask();
      // console.log(taskStatus);
      const searchResults = (await index.search("safaricomሳዳስፍድሳፍ"));
      console.log("result ብዛት",searchResults.hits.length);
      // console.log(addDocumentsResponse);
    } catch (indexingError) {
      console.error("Error indexing data:", indexingError);
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  } finally {
    // Close the MongoDB connection when done
    mongoose.connection.close();
  }
};

// Call the asynchronous function
connectToMongoDB();
