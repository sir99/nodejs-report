const PDFDocument    = require('pdfkit');
const doc            = new PDFDocument();
const path           = require("path");
const api            = require("../api/api");

function buildPDF(dataCallback, endCallback) {
    doc.on("data", dataCallback);
    doc.on("end", endCallback);

    const img      = path.resolve(__dirname, `../files/images/invoice.png`);
    const pdf      = path.resolve(__dirname, `../files/pdf`);
    const filename = `${pdf}/layout.pdf`;

    doc.image(img, 30, 40, {width: 100, });
    
    doc.fontSize(18);
    doc.font('Helvetica-Bold').text("INVOICE", 480, 40, {
    width: 100,
    align: 'right'
    });

    // Sender
    doc.fontSize(12);
    doc.font('Helvetica-Bold').text("PT SERU", 480, 70, {
    width: 100,
    align: 'right'
    });

    doc.fontSize(12);
    doc.font('Helvetica').text("Jl. Merpati Blok P", 480, 85, {
    width: 100,
    align: 'right'
    });

    doc.fontSize(12);
    doc.text("11830, Jakarta", 480, 100, {
    width: 100,
    align: 'right'
    });

    doc.fontSize(12);
    doc.text("Indonesia", 480, 115, {
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
    doc.font('Helvetica-Bold').text("PT Tbk", 30, 180, {
        width: 100,
        align: 'left'
    });

    doc.fontSize(12);
    doc.font('Helvetica').text("Jl. Arjuna Utara", 30, 195, {
        width: 100,
        align: 'left'
    });

    doc.fontSize(12);
    doc.text("11730, Jakarta", 30, 210, {
        width: 100,
        align: 'left'
    });

    doc.fontSize(12);
    doc.text("Indonesia", 30, 225, {
        width: 100,
        align: 'left'
    });

    // det inv
    doc.fontSize(12);
    doc.text("Number: 2022.001", 430, 180, {
    width: 150,
    align: 'right'
    });

    doc.fontSize(12);
    doc.text("Date: 2022/03/30", 430, 195, {
    width: 150,
    align: 'right'
    });

    doc.fontSize(12);
    doc.text("Due Date: 2022/04/05", 430, 210, {
    width: 150,
    align: 'right'
    });

    // product
    doc.fontSize(12);
    doc.font('Helvetica-Bold').text("Products", 80, 260, {
    width: 100,
    align: 'center'
    });

    const datalength  = api.length;
    
    let j = 285;
    let subtotal   = 0;
    let grandtotal = 0;
    for(let i=0; i<datalength; i++) {
        // product
        doc.fontSize(12);
        doc.font('Helvetica').text(api[i].name, 40, j, {
        width: 100,
        align: 'left'
        });

        // qty
        doc.fontSize(12);
        doc.font('Helvetica').text(api[i].qty, 215, j, {
        width: 100,
        align: 'right'
        });

        // price
        doc.fontSize(12);
        doc.font('Helvetica').text(api[i].price, 325, j, {
        width: 100,
        align: 'right'
        });

        // total
        doc.fontSize(12);
        doc.font('Helvetica').text(api[i].total, 475, j, {
        width: 100,
        align: 'right'
        });

        j = j+25;
        subtotal    = subtotal + api[i].total;
        grandtotal  = subtotal;
    }

    // qty
    doc.fontSize(12);
    doc.font('Helvetica-Bold').text("QTY", 215, 260, {
    width: 100,
    align: 'center'
    });

    // price
    doc.fontSize(12);
    doc.font('Helvetica-Bold').text("Price", 320, 260, {
    width: 100,
    align: 'center'
    });

    // total
    doc.fontSize(12);
    doc.font('Helvetica-Bold').text("Total", 450, 260, {
    width: 100,
    align: 'center'
    });

    // subtotal
    doc.fontSize(12);
    doc.font('Helvetica-Bold').text(`Subtotal: ${subtotal}`, 380, 430, {
    width: 150,
    align: 'right'
    });

    // grandtotal
    doc.fontSize(12);
    doc.font('Helvetica-Bold').text(`Grantotal: ${grandtotal}`, 380, 455, {
    width: 150,
    align: 'right'
    });


    doc.fontSize(11);
    doc.font('Helvetica').text("Kindly pay your invoice within 15 days.", 150, 600, {
    width: 300,
    align: 'center'
    });

    doc.end();
}

module.exports = { buildPDF };