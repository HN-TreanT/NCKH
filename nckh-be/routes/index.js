
const crawlRoute = require("./crawl.route")

const route = (app) => {
  app.use("/api/crawl", crawlRoute)
  
};
module.exports = route;
