import "fs";
import puppeteer from "puppeteer";
import puppeteerCore from "puppeteer-core";
import { success, warn } from "./msg.js";
import { theBzuGetterForEffoySira, theGetterForEffoySira } from "./effoy.js";
import { insertJob } from "./db/insertIntoJobs.js";
import { jobs } from "./db/jobs.js";

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
  for(const job of jobs){
    await insertJob({_id:job.url, ...job});
  }
  success("Runned");
  // browser = await createBrowserOnline(false);

  // await theBzuGetterForEffoySira(browser, thejobs);
  // await theGetter(browser);
  // getJobContentsFromEffoySira(browser, await getJobsListFromEffoysira(browser));
  // await getJobsListFromEffoysira(browser)

  // await browser.close();
  // success("Browser Closed!");
}
// warn("Hello")
await run();
