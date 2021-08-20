const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middlewares/errors");
require("dotenv").config({ path: "./config/config.env" });

const port = process.env.PORT || 4000;

//DB connection
const MONGODB_URL = process.env.MONGODB_URL;
const mongoose = require("mongoose");
mongoose
  .connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    //don't show the log when it is test
    if (process.env.NODE_ENV !== "test") {
      console.log("Connected to Database");
    }
  })
  .catch((err) => {
    console.error("App starting error:", err.message);
    process.exit(1);
  });
const db = mongoose.connection;
const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

//Route Prefixes
const auth = require("./routes/auth.routes");
const exams = require("./routes/exam.routes");
const results = require("./routes/result.routes");
app.use("/api", auth);
app.use("/api", exams);
app.use("/api", results);
app.use(errorMiddleware);

//start server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
console.log("=====>", "Node server");
console.log("=====>", process.version);
