const path           = require("path"); 
const fs = require("fs");
const PDFDocument = require("pdfkit-table"); 

// create document
let doc = new PDFDocument({margin: 30, size: "A4"});
// const img      = path.resolve(__dirname, `../files/images/invoice.png`);
const pdf      = path.resolve(__dirname, `../files/pdf`); 

// doc.image(img, 30, 40);

// file name
doc.pipe(fs.createWriteStream(`${pdf}/table.pdf`));

// table
const table = {
title: "Title",
subtitle: "Subtitle",
headers: [
    { label:"Name", property: 'name', width: 60, renderer: null },
    { label:"Description", property: 'description', width: 150, renderer: null }, 
    { label:"Price 1", property: 'price1', width: 100, renderer: null }, 
    { label:"Price 2", property: 'price2', width: 100, renderer: null }, 
    { label:"Price 3", property: 'price3', width: 80, renderer: null }, 
    { label:"Price 4", property: 'price4', width: 43, 
    renderer: (value, indexColumn, indexRow, row) => { return `U$ ${Number(value).toFixed(2)}` } 
    },
],
// complex data
datas: [
    { 
    name: 'Name 1', 
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mattis ante in laoreet egestas. ', 
    price1: '$1', 
    price3: '$ 3', 
    price2: '$2', 
    price4: '4', 
    },
    { 
    options: { fontSize: 10, separation: true},
    name: 'bold:Name 2', 
    description: 'bold:Lorem ipsum dolor.', 
    price1: 'bold:$1', 
    price3: { 
        label: 'PRICE $3', options: { fontSize: 12 } 
    }, 
    price2: '$2', 
    price4: '4', 
    },
    // {...},
],
// simeple data
rows: [
    [
    "Apple",
    "Nullam ut facilisis mi. Nunc dignissim ex ac vulputate facilisis.",
    "$ 105,99",
    "$ 105,99",
    "$ 105,99",
    "105.99",
    ],
    // [...],
],
};

doc.table(table, {
prepareHeader: () => doc.font("Helvetica-Bold").fontSize(11),
prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
    doc.font("Helvetica").fontSize(11);
    indexColumn === 0 && doc.addBackground(rectRow, 'blue', 0.15);
},
});
// the magic
// doc.table() is a Promise to async/await function 

// if your run express.js server
// to show PDF on navigator
// doc.pipe(res);

// done!
doc.end();