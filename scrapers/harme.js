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
  export {theGetterForHarme,theBzuGetterForHarme};