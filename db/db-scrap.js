import mongoose from "mongoose";
import { success } from "../msg.js";
import { Job } from "./models.js";
const insertJob = async (job) => {
  let res=0;
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/jswDb");
    // success("Connected to MongoDB");

    const newJob = new Job(job);

    await newJob.save();
    console.log("Job created successfully");
  } catch (error) {
    if(error.code===11000){
      res=1;
    }else{
      console.error("Error creating job:", error.code);
    }
  } finally {
    await mongoose.connection.close();
    // success("Disconnected from MongoDB");
  }
  return res
};
const insertBunchOfJobs=async(jobs)=>{
  let res=jobs.length;
  for(const job of jobs){
    res=res-await insertJob({_id:job.url, ...job});
  }
  return res;
}
export  {insertJob, insertBunchOfJobs}
