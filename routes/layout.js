const express        = require("express");
const fs             = require("fs");
const path           = require("path");
const PDFDocument    = require('pdfkit');
// const PDFDocument       = require('pdfkit-table');
const router         = express.Router();
const doc            = new PDFDocument;

function createLayout() {
   // image
   const img      = path.resolve(__dirname, `../files/images/invoice.png`);
   const pdf      = path.resolve(__dirname, `../files/pdf`);

   doc.image(img, 30, 40, {width: 100, });
   
   doc.fontSize(18);
   doc.font('Helvetica-Bold').text("INVOICE", 480, 40, {
   width: 100,
   align: 'right'
   });

   // Sender
   doc.fontSize(12);
   doc.font('Helvetica-Bold').text("Sender Company", 480, 70, {
   width: 100,
   align: 'right'
   });

   doc.fontSize(12);
   doc.font('Helvetica').text("Sender Address", 480, 85, {
   width: 100,
   align: 'right'
   });

   doc.fontSize(12);
   doc.text("zip, Sender City", 480, 100, {
   width: 100,
   align: 'right'
   });

   doc.fontSize(12);
   doc.text("Sender Country", 480, 115, {
   width: 100,
   align: 'right'
   });

   // create line horizontal
   doc.lineWidth(0.5);
   doc.lineCap('round')
      .moveTo(30, 150)
      .lineTo(580, 150)
      .stroke();

   doc.lineWidth(0.5);
   doc.lineCap('round')
      .moveTo(30, 250)
      .lineTo(580, 250)
      .stroke();

   doc.lineWidth(0.5);
   doc.lineCap('round')
      .moveTo(30, 280)
      .lineTo(580, 280)
      .stroke();

   doc.lineWidth(0.5);
   doc.lineCap('round')
      .moveTo(30, 400)
      .lineTo(580, 400)
      .stroke();

   // vertical
   doc.lineWidth(0.5);
   doc.lineCap('round')
      .moveTo(30, 250)
      .lineTo(30, 400)
      .stroke();

   doc.lineWidth(0.5);
   doc.lineCap('round')
      .moveTo(220, 250)
      .lineTo(220, 400)
      .stroke();

   doc.lineWidth(0.5);
   doc.lineCap('round')
      .moveTo(320, 250)
      .lineTo(320, 400)
      .stroke();

   doc.lineWidth(0.5);
   doc.lineCap('round')
      .moveTo(430, 250)
      .lineTo(430, 400)
      .stroke();

   doc.lineWidth(0.5);
   doc.lineCap('round')
      .moveTo(580, 250)
      .lineTo(580, 400)
      .stroke();

   // client
   doc.fontSize(12);
   doc.font('Helvetica-Bold').text("Client Company", 30, 180, {
      width: 100,
      align: 'left'
   });

   doc.fontSize(12);
   doc.font('Helvetica').text("Client Address", 30, 195, {
      width: 100,
      align: 'left'
   });

   doc.fontSize(12);
   doc.text("zip, Client City", 30, 210, {
      width: 100,
      align: 'left'
   });

   doc.fontSize(12);
   doc.text("Client Country", 30, 225, {
      width: 100,
      align: 'left'
   });

   // det inv
   doc.fontSize(12);
   doc.text("Number: invoice number", 430, 180, {
   width: 150,
   align: 'right'
   });

   doc.fontSize(12);
   doc.text("Date: date", 430, 195, {
   width: 150,
   align: 'right'
   });

   doc.fontSize(12);
   doc.text("Due Date: due date", 430, 210, {
   width: 150,
   align: 'right'
   });

   // product
   doc.fontSize(12);
   doc.font('Helvetica-Bold').text("Products", 80, 260, {
   width: 100,
   align: 'center'
   });

   doc.fontSize(12);
   doc.font('Helvetica').text("Product name1", 40, 290, {
   width: 100,
   align: 'left'
   });

   doc.fontSize(12);
   doc.font('Helvetica').text("Product name2", 40, 315, {
   width: 100,
   align: 'left'
   });

   doc.fontSize(12);
   doc.font('Helvetica').text("Product name3", 40, 340, {
   width: 100,
   align: 'left'
   });

   doc.fontSize(12);
   doc.font('Helvetica').text("Product name4", 40, 365, {
   width: 100,
   align: 'left'
   });

   // qty
   doc.fontSize(12);
   doc.font('Helvetica-Bold').text("QTY", 215, 260, {
   width: 100,
   align: 'center'
   });

   doc.fontSize(12);
   doc.font('Helvetica').text("0", 215, 285, {
   width: 100,
   align: 'right'
   });

   doc.fontSize(12);
   doc.font('Helvetica').text("0", 215, 310, {
   width: 100,
   align: 'right'
   });

   doc.fontSize(12);
   doc.font('Helvetica').text("0", 215, 335, {
   width: 100,
   align: 'right'
   });

   doc.fontSize(12);
   doc.font('Helvetica').text("0", 215, 360, {
   width: 100,
   align: 'right'
   });

   // price
   doc.fontSize(12);
   doc.font('Helvetica-Bold').text("Price", 320, 260, {
   width: 100,
   align: 'center'
   });

   doc.fontSize(12);
   doc.font('Helvetica').text("0", 325, 285, {
   width: 100,
   align: 'right'
   });

   doc.fontSize(12);
   doc.font('Helvetica').text("0", 325, 310, {
   width: 100,
   align: 'right'
   });

   doc.fontSize(12);
   doc.font('Helvetica').text("0", 325, 335, {
   width: 100,
   align: 'right'
   });

   doc.fontSize(12);
   doc.font('Helvetica').text("0", 325, 360, {
   width: 100,
   align: 'right'
   });

   // total
   doc.fontSize(12);
   doc.font('Helvetica-Bold').text("Total", 450, 260, {
   width: 100,
   align: 'center'
   });

   doc.fontSize(12);
   doc.font('Helvetica').text("0", 475, 285, {
   width: 100,
   align: 'right'
   });

   doc.fontSize(12);
   doc.font('Helvetica').text("0", 475, 310, {
   width: 100,
   align: 'right'
   });

   doc.fontSize(12);
   doc.font('Helvetica').text("0", 475, 335, {
   width: 100,
   align: 'right'
   });

   doc.fontSize(12);
   doc.font('Helvetica').text("0", 475, 360, {
   width: 100,
   align: 'right'
   });

   // subtotal
   doc.fontSize(12);
   doc.font('Helvetica-Bold').text("Subtotal: ", 380, 430, {
   width: 100,
   align: 'right'
   });

   // grandtotal
   doc.fontSize(12);
   doc.font('Helvetica-Bold').text("Grandtotal: ", 380, 455, {
   width: 100,
   align: 'right'
   });


   doc.fontSize(11);
   doc.font('Helvetica').text("Kindly pay your invoice within 15 days.", 150, 600, {
   width: 300,
   align: 'center'
   });

   // output
   doc.pipe(fs.createWriteStream(`${pdf}/layout.pdf`));

   doc.end();
}

module.exports = { createLayout }