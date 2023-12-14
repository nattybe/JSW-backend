import { warn } from "console";
import { success } from "../msg.js";
import sites from "../sites.js";
import fs from "fs";
import { insertBunchOfJobs, insertJob } from "../db/db-scrap.js";
async function theGetter(browser) {
  const page = await browser.newPage();
  try {
    console.log("Going to Page");
    await page.goto("https://harmeejobs.com/jobs/");
    success("Arrived");
    console.log("Loading Jobs");
    for (let i = 1; i <= 20; i++) {
      await page.click(".load_more_jobs");
      await page.waitForFunction(() => {
        const element = document.querySelectorAll(".fa-plus-circle");
        return element && element.length > 0;
      });
      // console.log(`Loading ${i}s`);
    }
    console.log("Loading Jobs");

    const joblinks = await page.evaluate(() =>
      Array.from(document.querySelectorAll(".job_listing"), (e) => ({
        title: e
          .querySelector(".listing-title h4")
          .innerText.trim()
          .replace("\n", " "),
        url: e.getAttribute("href"),
        image_url: e.querySelector("img.company_logo").src,
        date: e.querySelector(".listing-date time")
          ? new Date(
              e.querySelector(".listing-date time").getAttribute("datetime")
            ).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : (formattedDate = new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(new Date())),
        from: "harmejobs",
        content: e
          .querySelector(".listing-desc")
          .innerText.trim()
          .replace("\n", " "),
        all_content: e.innerText.trim().replace("\n", " "),
      }))
    );
    console.log(joblinks.length, "Jobs Scrapped");
    // fs.writeFile(
    //   "jsons/jobsFromHarme.json",
    //   JSON.stringify(joblinks),
    //   (err) => {
    //     if (err) throw err;
    //     console.log("File Saved Successfully");
    //   }
    // );
    page.close();
    success("page getted");
    return joblinks;
  } catch (erro) {
    console.error("Scrap Failed In The Getter ", erro);
  }
  // finally {
  //   page.close();
  // }
}
const theMainGetterForHarme = async (browser) => {
  const jobs = await theGetter(browser);
  success(`${await insertBunchOfJobs(jobs)} jobs inserted From Harme`);
};
export { theMainGetterForHarme };
