const puppeteer = require("puppeteer");

async function extractPositions(url) {
  const browser = await puppeteer.launch({ headless: "new" });
  console.log("Browser Created");
  const page = await browser.newPage();
  await page.goto(url);
  console.log("Run em up");
  const positions = await page.evaluate(() => {
    const positionElements = document.querySelectorAll(".entry-content h4");
    const positions = [];

    positionElements.forEach((element) => {
      const position = {
        title: element.textContent.trim(),
      };

      let nextElement = element.nextElementSibling;
      while (nextElement && (nextElement.tagName !== "blockquote" ) ) {
        if (nextElement.tagName === "j") {
          if (nextElement.textContent.includes("QUALIFICATION REQUIREMENTS:")) {
            position[`${nextElement.innerText}`] =
              nextElement.nextElementSibling.textContent.trim();
          } else if (
            nextElement.textContent.includes("Skills, Experience & Education")
          ) {
            position[`${nextElement.textContent.trim()}`] =
              nextElement.nextElementSibling.textContent.trim();
          } else if (nextElement.textContent.includes("Location")) {
            position.applicationMethods = nextElement.textContent.trim();
          }
        } else if (nextElement.tagName === "H") {
          if (nextElement.textContent.includes("Location")) {
            position.location = nextElement.textContent.replace('Location:','').trim();
          } else if (nextElement.textContent.includes("closing date:")) {
            position.closingDate = nextElement.textContent.replace('closing date::','').trim();
          } else if (nextElement.querySelector("strong")) {
            position[`${nextElement.textContent.trim()}`] =
              nextElement.nextElementSibling.textContent.trim();
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

const url = "https://effoysira.com/coca-cola-job-vacancy-sept-2023/";
extractPositions(url)
  .then((positions) => {
    console.log("From : " + url);
    console.log("Extracted positions:", positions);
  })
  .catch((error) => {
    console.error("Error extracting positions:", error);
  });
