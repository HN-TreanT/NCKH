const puppeteer = require("puppeteer")
const {responseInValid, responseServerError, reponseSuccess, responseSuccessWithData} = require("../helper/ResponseRequests")
// const getWebsite = async (req, res) => {
//     if(!req.query.website) {
//         return responseInValid({res, message:"website required"})
//     }
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto(req.query.website);
//     const html = await page.content()
//     return res.status(200).send(html)

// }

const testWebsite = async (req,res) => {
  const website = req.query.website
  if(!website) {
    return responseInValid({res, message:"website required"})
  }
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(website) 
  const content = await page.$eval("*", el => el.innerHTML)
  console.log("check content", content)
  return responseSuccessWithData({res, data: content})
}

const getWebsite = async (req, res) => {
    const website = req.query.website
    if(!website) {
        return responseInValid({res, message:"website required"})
    }
    const browser = await puppeteer.launch();

    const registry = {};
    let queue = [website];

    while (queue.length > 0) {
      const url = queue[queue.length - 1];
      console.log("current url", url);
      const page = await browser.newPage();
      await page.goto(url);
      registry[url] = await page.$eval("*", (el) => el.innerText);
      queue.pop();
      console.log("queue length", queue);

      const hrefs = await page.$$eval("a", (anchorEls) =>
        anchorEls.map((a) => a.href)
      );

      const filteredHrefs = hrefs.filter(
        (href) => href.startsWith(website) && registry[href] === undefined
      );
      const uniqueHrefs = [...new Set(filteredHrefs)];
      queue.push(...uniqueHrefs);
      queue = [...new Set(queue)];

      await page.close();
    }

    browser.close();

    return res.status(200).send(registry);
    
}

module.exports = {
    getWebsite,
    testWebsite
}