const express       = require("express");
const app           = express();
const path          = require("path");
const fs            = require("fs");
const invoiceRoute  = require("./routes/invoice");

app.use(invoiceRoute);

app.listen("8080", () => {
    console.log("Server running on port 8080")
});