if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routing
var controller = require("./controllers/pagecontrollers");
var usercontroller = require("./controllers/usercontroller");
var admincontroller = require("./controllers/admincontroller");
app.use("/", controller);

app.use("/user", usercontroller);

app.use("/admin", admincontroller);

app.listen(process.env.PORT || 3001, (err) => {
  if (
    (err) => {
      console.log("error occured");
    }
  )
    console.log("running at port 3001");
});
