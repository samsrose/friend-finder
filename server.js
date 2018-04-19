// Pull in required dependencies
const express = require("express"); //Express.js core
const hbs = require("express-handlebars"); //Express.js Handlebars templating
const http = require("http"); // default node http library
const path = require("path"); // default node path library
const favicon = require("serve-favicon"); //favicon serving
const logger = require("morgan"); //logger for debugging/development
const cookieParser = require("cookie-parser"); // Cookies
const bodyParser = require("body-parser"); //
const routes = require(path.join(__dirname, "./app/routes/index"));

// Configure the Express application

const app = express();
const PORT = process.env.PORT || 9000;

// view engine setup
app.use("/", routes);

app.engine(
  "hbs",
  hbs({
    extname: "hbs",
    defaultLayout: "layout",
    layoutsDir: __dirname + "app/views/",
  })
);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

// Expose the public directory to access CSS files
app.use(express.static(path.join(__dirname, "./app/public/css")));
// Add middleware for parsing incoming request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(cookieParser());
app.use(logger("dev"));
app.use(favicon(path.join(__dirname, "./app/public", "favicon.ico")));
// Original Homework Application
//require(path.join(__dirname, "./app/routing/apiRoutes"))(app);
//require(path.join(__dirname, "./app/routing/htmlRoutes"))(app);
//app.use(express.static(path.join(__dirname, "./app/public/css")));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.text());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render("error", {
      message: err.message,
      error: err,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: {},
  });
});

module.exports = app;
