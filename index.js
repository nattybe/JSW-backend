import "fs";
import puppeteer from "puppeteer";
import puppeteerCore from "puppeteer-core";
import { success, warn } from "./msg.js";
import {
  theMainGetterForEffoySira,
} from "./scrapers/effoy.js";
import { jobs } from "./db/jobs.js";
import { getFromHahuJobs } from "./scrapers/hahu.js";

const SBR_WS_ENDPOINT =
  "wss://brd-customer-hl_a849742c-zone-scraping_browser-country-et:uii7n0wins3a@brd.superproxy.io:9222";
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
  // for (const job of jobs) {
  //   await insertJob({ _id: job.url, ...job });
  // }
  success("Runned");
  const browser = await createBrowserOnline(false);


  // await theMainGetterForEffoySira(browser);

  await getFromHahuJobs(browser)

  await browser.close();
  success("Browser Closed!");
}
await run();
