async function theGetterForEffoySira(browser) {
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
  export {theGetterForEffoySira, theBzuGetterForEffoySira}