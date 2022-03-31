const express       = require("express");
const app           = express();
const invoiceRoute  = require("./routes/invoice");
const tableRoute    = require("./routes/table");
const layoutRoute   = require("./routes/layout");

app.use(invoiceRoute);

app.get("/layout", (req, res) => {
    layoutRoute.createLayout();
    res.send("layout has been created");
});

app.get("/table", (req, res) => {
    res.send("table has been created");
    // const table     = tableRoute.create();
    tableRoute.pipe(res);
    tableRoute.end();
});


app.listen("8080", () => {
    console.log("Server running on port 8080")
});