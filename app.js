let express = require("express");
let mongoose = require("mongoose");
let helmet = require("helmet");
let createError = require("http-errors");
let path = require("path");
let cors = require("cors");
require("dotenv").config();

let app = express();

//middlewares
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(cors());
app.use(express.static("client/build"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// connect to mongoDB atlas using mongoose
mongoose.set("useFindAndModify", false);
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose.set("useCreateIndex", true);
mongoose.connect(process.env.MONGO_URI, (err) => {
  console.log("mongodb connected ?", err ? false : true);
});

// route handler middlewares
let imageRouter = require("./routes/image");
let itemRouter = require("./routes/item");
app.use("/api/image", imageRouter);
app.use("/api/item", itemRouter);

// serving stating files
if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging"
) {
  app.get("*", (_req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
  });
}

// catch 404 and forward to error handler
app.use(function (_req, _res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, _req, res, _next) {
  console.log(err, "in error handler");
  // set locals, only providing error in development
  //   res.locals.message = err.message;
  //   res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.json({
    error: err,
  });
});

let PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
