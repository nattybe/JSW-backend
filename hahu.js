const puppeteer = require('puppeteer');

async function extractPositions(url) {
  const browser = await puppeteer.launch({headless:"new"});
  const page = await browser.newPage();
  console.log("Browser Created");
  await page.goto(url);

  const positions = await page.evaluate(() => {
    const positionElements = document.querySelectorAll('#job_description');
    const positions = [];

    positionElements.forEach(element => {
      const position = {
        title: element.textContent.trim(),
        requirements: '',
        responsibilities: '',
        applicationMethods: ''
      };

      let nextElement = element.nextElementSibling;
      while (nextElement && nextElement.tagName !== 'STRONG') {
        if (nextElement.tagName === 'P') {
          if (nextElement.querySelector('strong')) {
            position[`${nextElement.querySelector('strong').textContent.trim()}`] = nextElement.textContent.trim();
          } else if (nextElement.textContent.includes('RESPONSIBILITIES:')) {
            position.responsibilities = nextElement.textContent.trim();
          } else if (nextElement.textContent.includes('How to Apply:')) {
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

const url = 'https://hahu.jobs/jobs/6504029cd2694b2313e928ae';
extractPositions(url)
  .then(positions => {
    console.log('Extracted positions:', positions);
  })
  .catch(error => {
    console.error('Error extracting positions:', error);
  });
