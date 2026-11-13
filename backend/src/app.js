

const express = require("express");
const cors = require("cors");


const routers = require("./routers");

const app = express();


app.use(express.json());
app.use(cors());

app.use("/api", routers);
module.exports = app;
