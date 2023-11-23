
import { success, warn } from "../msg.js";
import sites, { delay } from "../sites.js";


const getFromTheFrontPage=async(browser)=>{
  const page = await browser.newPage();
  try {
    console.log("Going to page");
    // await page.setDefaultNavigationTimeout(60000);
    await page.goto("https://elelanajobs.com/job-list/", {waitUntil: 'documentcommit'});
    await page.waitForSelector('.job_listing');
    success("Arrived")
    // const joblinks = await page.evaluate(() =>
    //   Array.from(document.querySelectorAll(".job_listing"), (e) => ({
    //     title: e.querySelector(".position").innerText,
    //     url: e.querySelector("a").href,
    //     // date: e.querySelector(".meta-date time").innerText,
    //     // from: e.querySelector(".meta-author a").innerText,
    //     // content: e.querySelector(".entry-excerpt p").innerText,
    //   }))
    // );
    // console.log(joblinks);
    // fs.writeFile("jsons/jobsFromElelena.json", JSON.stringify(joblinks), (err) => {
    //   if (err) throw err;
    //   console.log("File Saved Successfully");
    // });
    // await page.close();
    success("page getted");
  } catch (erro) {
    console.error("Scrap Failed In The Getter ", erro);
  }
}

const getFromElelanajobs=async(browser)=>{
  await getFromTheFrontPage(browser);
}
export default getFromElelanajobs;