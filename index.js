const puppeteer = require("puppeteer");

async function run() {
  const sites = {
    hahujobs: "https://hahu.jobs",
    elelanajobs: "https://elelanajobs.com/",
    shegerjobs: "https://shegerjobs.net/",
    effoysira: "https://effoysira.com/",
    harmejobs: "https://www.harmeejobs.com",
    ethioJobs: "https://www.ethiojobs.net/",
  };

  const browser = await puppeteer.launch({ headless: "new" });
  // sites.forEach(site => {

  try {
    const page = await browser.newPage();
    // await page.setDefaultNavigationTimeout(0);
    await page.goto(sites.elelanajobs);
    /* 
    await page.screenshot({
      path: "example.jpg",
    });

    htmlCont=await page.evaluate(()=>)

    const html = await page.evaluate(() =>
      Array.from(document.querySelectorAll("a"), (e) => e.href)
    );

    const jobs = await page.evaluate(() =>
      Array.from(
        document.querySelectorAll(
          "#widget_recent_jobs-6 .job_listings .type-job_listing"
        ),
        (e) => ({ title: e.querySelector(".position h3").innerText })
      )
    );
    console.log(jobs);
    */

    console.log(page.status());
    console.log("closed");
  } catch (error) {
    console.log("error : ");
    console.log("");
    console.log(error);
  } finally {
    await browser.close();
  }
  // });
}

run();
