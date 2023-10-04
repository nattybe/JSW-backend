const puppeteer = require("puppeteer");

async function sup(){
  const browser = await puppeteer.launch({ headless: "new" });
  console.log("created");
  browser.close().then(()=>{
    console.log('closed');
  })
}
sup();