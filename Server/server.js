const express = require("express");
require("dotenv").config({ path: "./.env" });
const app = express();
const project_routes = require("./routes/project.js");
const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: true }));
mongoose.connect(process.env.DATABASE_URL)
.then(()=>{
    app.listen(process.env.PORT, () => {
        console.log("Server started");
      });
})
.catch((error)=>{
    console.log(error);
})

// routes
app.use("/projects", project_routes);