const express = require("express");
require("dotenv").config({ path: "./.env" });
const app = express();
const cors = require("cors"); 
const project_routes = require("./routes/project.js");
const employee_routes = require("./routes/employee.js");
const timeCard_routes = require("./routes/timeCard.js");
const designJobs_routes = require("./routes/designJobs.js");
const user_routes = require("./routes/user.js");
const mongoose = require("mongoose");
app.use(cors({
  origin: "https://acceleratedfp.onrender.com", // Replace with your frontend URL
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
}));
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
//middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/projects", project_routes);
app.use("/user", user_routes);
app.use("/employees", employee_routes);
//timeCard is for testing. these routes will only be used by employees
app.use("/timeCards", timeCard_routes);
app.use("/designJobs", designJobs_routes);