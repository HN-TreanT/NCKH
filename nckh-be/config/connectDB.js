const mongoose = require("mongoose")
async function connect() {
    // try {
    //   // await mongoose.connect("mongodb://localhost:27017/nckh");
    //   await mongoose.connect("mongodb://root:hnam23012002@64.176.85.32:27017/nckh?authMechanism=DEFAULT");

    //   console.log("connect succeeded");
    // } catch (e) {
    //   console.log(e)
    //   console.log("connect fail");
    // }
    
      mongoose
      .connect("mongodb://root:hnam23012002@64.176.85.32:27017/?authMechanism=DEFAULT", {
        dbName: "nckh",
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Database connection Success.");
      })
      .catch((err) => {
        console.error("Mongo Connection Error", err);
      });
  }
  
  module.exports = { connect };
  