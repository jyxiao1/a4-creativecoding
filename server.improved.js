import parseSongDirectory from "./game.js";

const compression = require("compression");
const bodyParser = require("body-parser");
const helmet = require("helmet");

const express = require("express");
const app = express();
const port = 3000;

function shouldCompress(req, res) {
    if (req.headers["x-no-compression"]) {
        return false;
    }
    return compression.filter(req, res);
}

app.use(helmet());
app.use(compression({filter: shouldCompress}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use(express.static("public"));

// const adapter = new FileAsync("json/users.json");

// Create database instance and start server
app.use(compression());
app.set("view engine", "ejs");
app.use(express.static("public"));


app.get("/", function (request, response) {
    response.sendFile(__dirname + "/index.html");
});

app.get("/index", function (request, response) {
    response.sendFile(__dirname + "/index.html");
});

app.post("/songRequest", function (request, response) {
    response.json(parseSongDirectory());
});

app.listen(port);