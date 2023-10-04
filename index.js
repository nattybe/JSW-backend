import "fs";
import thejobs from "./jobs.json";
import puppeteer from "puppeteer";
import puppeteerCore from "puppeteer-core";
import  {success, warn}  from "./msg.js";
import { theBzuGetterForEffoySira,theGetterForEffoySira } from "./effoy.js";

// const theBzuGetterForEffoySira = require('./effoy');
// import {theBzuGetterForEffoySira} from './effoy';
const SBR_WS_ENDPOINT =
  "wss://brd-customer-hl_a849742c-zone-scraping_browser-country-et:uii7n0wins3a@brd.superproxy.io:9222";
const delay = (ms) => new Promise((res) => setTimeout(res, ms));
const sites = {
  hahujobs: "https://hahu.jobs",
  elelanajobs: "https://elelanajobs.com/",
  shegerjobs: "https://shegerjobs.net/",
  effoysira: "https://effoysira.com/category/job/",
  harmejobs: "https://www.harmeejobs.com",
  ethioJobs: "https://www.ethiojobs.net/",
};
// const format = new Intl.DateTimeFormat("en-US", {
//   year: "numeric",
//   month: "long",
//   day: "numeric",
// });
// const parseDateString=(dateString)=> {
//   const parts = dateString.split(", ");
//   console.log(parts);
//   mon=(parts[0].split(" ")[0]).toLowerCase()
//   datenum=parts[0].split(" ")[1]
//   yearnum=parts[1]
//   console.log(datenum);
//   const monthMap = {
//     "january": 0,
//     "february": 1,
//     "march": 2,
//     "april": 3,
//     "may": 4,
//     "jun": 5,
//     "july": 6,
//     "august": 7,
//     "september": 8,
//     "october": 9,
//     "november": 10,
//     "december": 11
//   };
//   const month = monthMap[parts[1].toLowerCase()];
//   return new Date(yearnum, monthMap.mon, datenum);
// }
async function getJobsListFromEffoysira(browser) {
  const page = await browser.newPage();
  try {
    console.log("Getting Pages");
    await page.goto(sites.effoysira);
    // await page.screenshot({path: "pa.png",fullPage:true})
    // console.log("ScreenShotted");
    const joblinks = await page.evaluate(() =>
      Array.from(document.querySelectorAll(".entry-card"), (e) => ({
        title: e.querySelector(".entry-title a").innerText,
        url: e.querySelector(".entry-title a").href,
        date: e.querySelector(".meta-date time").innerText,
        from: e.querySelector(".meta-author a").innerText,
        desc: e.querySelector(".entry-excerpt").innerText,
      }))
    );
    // console.log(joblinks);// console.log(joblinks);
    fs.writeFile("jobsFromEffoySira.json", JSON.stringify(joblinks), (err) => {
      if (err) throw err;
      console.log("File Saved Successfully");
    });
    page.close();
    console.error("page Getted");
    return joblinks;
  } catch (error) {
    console.error("Error : " + error.stack);
  } finally {
    page.close();
  }
}
async function getJobContentsFromEffoySira(browser, joblinks) {
  // const page = await browser.newPage();
  console.log("page Created For Content retrieval");
  try {
    const bigJobs = [];
    joblinks.forEach(async (jobs) => {
      // console.log(jobs);
      try {
        const page = await browser.newPage();
        await page.goto(jobs.url);
        console.log("Getting links From :" + jobs.url);
        const content = await page.evaluate(() =>
          Array.from(
            document.querySelectorAll(".entry-header h1"),
            (e) => e.innerText
          )
        );
        // bigJobs.push({ jobs, content });
      } catch (error) {
        console.error(
          "Error From : " + jobs.url + "\n Message: " + error.message
        );
      } finally {
        await page.close();
      }
    });
  } catch (error) {
    console.error(error.message + " :" + error.lineNumber);
  }
}
async function theGetter(browser) {
  const page = await browser.newPage();
  try {
    console.log("Getting Pages");
    await page.goto(sites.effoysira);
    const joblinks = await page.evaluate(() =>
      Array.from(document.querySelectorAll(".entry-card"), (e) => ({
        title: e.querySelector(".entry-title a").innerText,
        url: e.querySelector(".entry-title a").href,
        date: e.querySelector(".meta-date time").innerText,
        from: e.querySelector(".meta-author a").innerText,
      }))
    );
    // console.log(joblinks);
    // fs.writeFile("jobs.json", JSON.stringify(joblinks), (err) => {
    //   if (err) throw err;
    //   console.log("File Saved Successfully");
    // });
    page.close();
    success("page getted");
    return joblinks;
  } catch (erro) {
    console.error("Scrap Failed In The Getter ", erro);
  } finally {
    page.close();
  }
}
// async function theBzuGetterForEffoySira(browser, thyJson) {
//   const page = await browser.newPage();
//   let jobless = [];
//   try {
//     for (const job of thyJson) {
//       console.log("Navigate to: " + job.url);
//       await page.goto(job.url);
//       await delay(2000);
//       const joblesss = await page.evaluate(
//         () => document.querySelectorAll(".ct-container article")[0].innerText
//       );
//       jobless.push({
//         ...job,
//         content: joblesss,
//       });
//     }
//     console.log("the Type ", typeof jobless);
//     fs.writeFile("jobTitles.json", JSON.stringify(jobless), (err) => {
//       if (err) throw err;
//       success("File Saved Successfully as jobTitles");
//     });
//   } catch (error) {
//     console.error("Error from theBzuGetter: ", error);
//   }
// }
async function createBrowserOnline(stat) {
  try {
    let browser;
    if (stat) {
      browser = await puppeteerCore.connect({
        browserWSEndpoint: SBR_WS_ENDPOINT,
      });
      console.log("Browser Connected Online");
    } else {
      browser = await puppeteer.launch({ headless: "new" });
      console.log("Browser Connected Offline");
    }
    return browser;
  } catch (error) {
    console.error("Create Browser: ", error);
  }
}
async function run() {
  success("Runned");
  browser = await createBrowserOnline(false);

  await theBzuGetterForEffoySira(browser, thejobs);
  // await theGetter(browser);
  // getJobContentsFromEffoySira(browser, await getJobsListFromEffoysira(browser));
  // await getJobsListFromEffoysira(browser)
  await browser.close();
  success("Browser Closed!");
}
// warn("Hello")
await run();
