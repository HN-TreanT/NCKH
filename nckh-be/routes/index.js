const adminRoute = require("./admin.route")
const crawlRoute = require("./crawl.route")

const route = (app) => {
  app.use("/api/crawl", crawlRoute)
  app.use("/api/admin", adminRoute)
  
};
module.exports = route;
