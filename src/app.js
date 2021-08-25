// Require Variables //

const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const port = process.env.PORT || 8080;

// Static Path //

const publicPath = path.join(__dirname, "../public");
app.use(express.static(publicPath));

// View Engine HBS //

const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", template_path);

// Register Partials //

hbs.registerPartials(partials_path);

// Home Page //

app.get("/", (req, res) => {
    res.render("index");
});

// About Page //

app.get("/about", (req, res) => {
    res.render("about");
});

// Weather Page //

app.get("/current", (req, res) => {
    res.render("currentWeather");
});

// Error Page //

app.get("*", (req, res) => {
    res.render("404error", {
        errorMsg: "Opps! Page Not Found",
    });
});

// Listening Port //

app.listen(port, () => {
    console.log("Server Running");
});
