

const express = require("express");
const cors = require("cors");
const app = express();
const clienteRoutes = require("./routers/index");




app.use(express.json());
app.use(cors());

app.use("/api", clienteRoutes);

module.exports = app;