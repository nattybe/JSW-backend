import "fs";
import puppeteer from "puppeteer";
import puppeteerCore from "puppeteer-core";
import { success, warn } from "../msg.js";
import { theMainGetterForEffoySira } from "./effoy.js";
import { jobs } from "./db/jobs.js";
import { getFromHahuJobs } from "./hahu.js";
import getFromElelanajobs from "./elelana.js";
import { theMainGetterForHarme } from "./harme.js";

const SBR_WS_ENDPOINT =
  "wss://brd-customer-hl_a849742c-zone-scraping_browser-country-et:uii7n0wins3a@brd.superproxy.io:9222";

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
  const browser = await createBrowserOnline(false);

  // Working
  await theMainGetterForEffoySira(browser);
  await theMainGetterForHarme(browser);
  await getFromElelanajobs(browser);
  await getFromHahuJobs(browser);

  // development

  await browser.close();
  success("Browser Closed!");
}

export default run;
