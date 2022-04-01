const express       = require("express");
const app           = express();
const invoiceRoute  = require("./routes/invoice");
const tableRoute    = require("./routes/table");
const layoutRoute   = require("./routes/layout");
const peopleRoute   = require("./routes/people");
const pdfDownload   = require("./routes/download");

const axios         = require("axios");
const path          = require("path"); 
const fs            = require("fs");
const PDFDocument   = require("pdfkit-table"); 
const doc           = new PDFDocument({margin: 30, size: "A4"});
const pdf           = path.resolve(__dirname, `./files/pdf`);

app.use(invoiceRoute);

app.get("/layout", (req, res) => {
    layoutRoute.createLayout();
    res.send("layout has been created");
});

app.get("/download", (req, res) => {
    const stream    = res.writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment;filename=invoice.pdf"
    });

    pdfDownload.buildPDF(
        (chunk) => stream.write(chunk),
        ()  => stream.end()
    );
})

app.listen("8080", () => {
    console.log("Server running on port 8080")
});
