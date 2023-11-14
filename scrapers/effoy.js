import fs from "fs";
import { success, warn } from "../msg.js";
import sites, { delay } from "../sites.js";
import { insertJob } from "../db/db-scrap.js";
async function theGetterForEffoySira(browser, thepage) {
  const page = await browser.newPage();
  try {
    console.log("Getting Pages");
    await page.goto(thepage);
    const joblinks = await page.evaluate(() =>
      Array.from(document.querySelectorAll(".entry-card"), (e) => ({
        title: e.querySelector(".entry-title a").innerText,
        url: e.querySelector(".entry-title a").href,
        date: e.querySelector(".meta-date time").innerText,
        from: e.querySelector(".meta-author a").innerText,
        content: e.querySelector(".entry-excerpt p").innerText,
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
  }
  // finally {
  //   page.close();
  // }
}
async function theBzuGetterForEffoySira(browser, thyJson) {
  const page = await browser.newPage();
  let jobless = [];
  try {
    for (const job of thyJson) {
      console.log("Navigate to: " + job.url);
      await page.goto(job.url);
      // success("Navigated");
      await delay(2000);
      const joblesss = await page.evaluate(
        () => document.querySelectorAll(".ct-container article")[0].innerText
      );
      // jobless.push({ ...joblesss[0], url: job.url, oldTitle: job.title });
      jobless.push({
        ...job,
        content: joblesss,
      });
    }
    console.log("the Type ", typeof jobless);
    fs.writeFile("jobTitles.json", JSON.stringify(jobless), (err) => {
      if (err) throw err;
      success("File Saved Successfully as jobTitles");
    });
  } catch (error) {
    console.error("Error from theBzuGetter: ", error);
  }
}
async function getPagesFromEffoySira(browser) {
  const page = await browser.newPage();
  try {
    console.log("Getting Page Numbers");
    await page.goto(sites.effoysira);
    const joblinks = await page.evaluate(() =>
      Array.from(
        document.querySelectorAll(".ct-pagination .ct-hidden-sm a"),
        (e) => +e.innerText
      )
    );
    console.log("GOAT ", joblinks);

    success("page numbers getted");
    return joblinks.pop();
  } catch (erro) {
    console.error("Scrap Failed In The Page Number Getter ", erro);
  } finally {
    page.close();
  }
}
async function theMainGetterForEffoySira(browser) {
  const page = await browser.newPage();
  try {
    const GOAT = await getPagesFromEffoySira(browser);
    const theBiggerJobs = [];
    for (let index = 1; index <= GOAT; index++) {
      console.log(
        "Navigate to: " + `https://effoysira.com/category/job/page/${index}/`
      );
      theBiggerJobs.push(...(await theGetterForEffoySira(browser, `https://effoysira.com/category/job/page/${index}/`))
      );
      // await delay(2000)
    }
    // TODO: instead of saving this shit to theBiggerJobs.json
    //  make a function that fetches the inner content after checking
    //  if the link exists in the data base (for now the JSON)
    for(const job of theBiggerJobs){
      await insertJob({_id:job.url, ...job});
    }
    // fs.writeFile("theBiggerJobs.json", JSON.stringify(theBiggerJobs), (err) => {
    //   if (err) throw err;
    //   warn("File Saved Successfully");
    // });
  } catch (error) {
    console.error("Scrap Failed In The Main Getter ", error);
  } finally {
    page.close();
  }
}
export {
  theGetterForEffoySira,
  theMainGetterForEffoySira,
  theBzuGetterForEffoySira,
  getPagesFromEffoySira,
};
