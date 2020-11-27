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

app.use("/", controller);

app.listen(process.env.PORT || 3001, (err) => {
  if (
    (err) => {
      console.log("error occured");
    }
  )
    console.log("running at port 3001");
});
