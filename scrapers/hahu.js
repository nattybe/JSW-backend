import { success, warn } from "../msg.js";

import puppeteer from "puppeteer";
import sites from "../sites.js";

async function extractPositions(url) {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  console.log("Browser Created");
  await page.goto(url);

  const positions = await page.evaluate(() => {
    const positionElements = document.querySelectorAll("#job_description");
    const positions = [];

    positionElements.forEach((element) => {
      const position = {
        title: element.textContent.trim(),
        requirements: "",
        responsibilities: "",
        applicationMethods: "",
      };

      let nextElement = element.nextElementSibling;
      while (nextElement && nextElement.tagName !== "STRONG") {
        if (nextElement.tagName === "P") {
          if (nextElement.querySelector("strong")) {
            position[
              `${nextElement.querySelector("strong").textContent.trim()}`
            ] = nextElement.textContent.trim();
          } else if (nextElement.textContent.includes("RESPONSIBILITIES:")) {
            position.responsibilities = nextElement.textContent.trim();
          } else if (nextElement.textContent.includes("How to Apply:")) {
            position.applicationMethods = nextElement.textContent.trim();
          }
        }
        nextElement = nextElement.nextElementSibling;
      }

      positions.push(position);
    });

    return positions;
  });

  await browser.close();
  return positions;
}
async function getFromHahuJobs(browser) {
  const page = await browser.newPage();
  success("go to : " + sites.hahujobs);
  await page.goto(sites.hahujobs);
  const joblinks = await page.evaluate(() =>
      Array.from(document.querySelectorAll("#__nuxt > div > div:nth-child(2) > div.xl\\:px-3.min-h-screen.min-w-full.lg\\:pt-20.\\32 xl\\:pl-16.w-full.mt-20.xl\\:mt-10.lg\\:mt-0.max-w-\\[1920px\\].centerContent > div.relative.flex.flex-col.xl\\:flex-row.max-w-\\[1920px\\].centerContent.mx-auto > div.w-full.xl\\:w-9\\/12.\\32 xl\\:w-10\\/12 > div:nth-child(2) > div > div > div.w-full > div.grid.grid-cols-1.lg\\:grid-cols-2.\\32 xl\\:grid-cols-3.gap-x-3.gap-y-10.xl\\:gap-y-4.xl\\:ml\\:0.mt-5"), (e) => ({
        title: e.querySelector("div").innerText
      }))
    );
  // const elemental = await page.$(
  //   "#__nuxt > div > div:nth-child(2) > div.xl\\:px-3.min-h-screen.min-w-full.lg\\:pt-20.\\32 xl\\:pl-16.w-full.mt-20.xl\\:mt-10.lg\\:mt-0.max-w-\\[1920px\\].centerContent > div.relative.flex.flex-col.xl\\:flex-row.max-w-\\[1920px\\].centerContent.mx-auto > div.w-full.xl\\:w-9\\/12.\\32 xl\\:w-10\\/12 > div:nth-child(2) > div > div > div.w-full > div.grid.grid-cols-1.lg\\:grid-cols-2.\\32 xl\\:grid-cols-3.gap-x-3.gap-y-10.xl\\:gap-y-4.xl\\:ml\\:0.mt-5"
  // );
  warn(joblinks);
}

export { getFromHahuJobs };
