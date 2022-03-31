const express       = require("express");
const fs            = require("fs");
const path          = require("path");
const easyinvoice   = require("easyinvoice");
const router        = express.Router();
const { PDFNet }    = require('@pdftron/pdfnet-node');
PDFNet.initialize("demo:1648614229918:7bc8a8e80300000000d6dcbe2ff100bca23a574a8bb67722afcf9f5d72");

router.get("/", (req, res) => {
  res.send("Welcome")
});

let data = {
  "images": {
      "background": "https://public.easyinvoice.cloud/pdf/sample-background.pdf"
    },
  "sender": {
    "company": "sender company",
    "address": "sender address",
    "zip": "sender zip",
    "city": "sender city",
    "country": "sender country"
  },
  "client": {
    "company": "client company",
    "address": "client address",
    "zip": "client zip",
    "city": "client city",
    "country": "client country"
  },
  "information": {
    "number": "invnum",
    "date": "date",
    "due-date": "due date"
  },
  "products": [
    {
      "quantity": "0",
      "description": "product1",
      "tax-rate": 0,
      "price": 0
    },
    {
      "quantity": "0",
      "description": "product2",
      "tax-rate": 0,
      "price": 0
    }
  ],
  "bottom-notice": "Kindly pay your invoice within 15 days.",
  "settings": {
    "currency": "IDR",
    "tax-notation": "vat",
    "margin-top": 25,
    "margin-right": 25,
    "margin-left": 25,
    "margin-bottom": 25
  }
}

const invoicePdf  = async () => {
  let result    = await easyinvoice.createInvoice(data);
  fs.writeFileSync(`../files/invoice.pdf`, result.pdf, "base64");
}

router.get("/invoice", (req, res) => {
  invoicePdf();
  res.send(data);
});

// convert from word
router.get("/convertFromOffice", (req, res) => {
  const inputPath     = path.resolve(__dirname, `../files/docx/invoice.docx`);
  const outputPath    = path.resolve(__dirname, `../files/pdf/invoice.pdf`);

  const convertToPDF  = async () => {
    const pdfdoc    = await PDFNet.PDFDoc.create();
    await pdfdoc.initSecurityHandler();
    await PDFNet.Convert.toPdf(pdfdoc, inputPath);
    pdfdoc.save(outputPath, PDFNet.SDFDoc.SaveOptions.e_linearized);
  }

  PDFNet.runWithCleanup(convertToPDF).then(() => {
    fs.readFile(outputPath, (err, data) => {
      if(err) {
        res.statusCode  = 500;
        res.end(err);
      } else {
        res.setHeader("contentType", "application/pdf");
        res.end(data);
      }
    })
  }).catch(err => {
    res.statusCode  = 500;
    res.end(err);
  });
});

// replace text
router.get("/generateInvoice", (req, res) => {
  const inputPath     = path.resolve(__dirname, `../files/pdf/invoice.pdf`);
  const outputPath    = path.resolve(__dirname, `../files/pdf/invoice_replace.pdf`);

  const replaceText   = async () => {
    const pdfdoc    = await PDFNet.PDFDoc.createFromFilePath(inputPath);
    await pdfdoc.initSecurityHandler();
    const replacer  = await PDFNet.ContentReplacer.create();
    const page      = await pdfdoc.getPage(1);

    // sender
    await replacer.addString("sender company", "PT SERU");
    await replacer.addString("sender address", "Jl. Merpati");
    await replacer.addString("sender zip", "Blok P No.6");
    await replacer.addString("sender city", "Jakarta");
    await replacer.addString("sender country", "Indonesia");

    // customer
    await replacer.addString("client company", "PT TBK");
    await replacer.addString("client address", "Jl. Kebon Jeruk");
    await replacer.addString("client zip", "11730");
    await replacer.addString("client city", "Jakarta");
    await replacer.addString("client country", "Indonesia");

    // product
    await replacer.addString("name1", "Soap");
    await replacer.addString("name2", "Shampoo");

    await replacer.process(page);

    pdfdoc.save(outputPath, PDFNet.SDFDoc.SaveOptions.e_linearized);
  }

  PDFNet.runWithCleanup(replaceText).then(() => {
    fs.readFile(outputPath, (err, data) => {
      if(err) {
          res.statusCode  = 500;
          res.end(err);
      } else {
          res.setHeader("contentType", "application/pdf");
          res.end(data);
      }
    })
  }).catch(err => {
    res.statusCode  = 500;
    res.end(err);
  });
});

// create watermark
router.get("/watermark", (req, res) => {
  const { filename, watermark } = req.query;

  const inputPath     = path.resolve(__dirname, `../files/pdf/${filename}.pdf`);
  const outputPath    = path.resolve(__dirname, `../files/pdf/${filename}_watermark.pdf`);

  const watermarkPDF  = async () => {
    const pdfdoc    = await PDFNet.PDFDoc.createFromFilePath(inputPath);
    await pdfdoc.initSecurityHandler();

    const stamper   = await PDFNet.Stamper.create(
      PDFNet.Stamper.SizeType.e_relative_scale,
      0.5,
      0.5
    );

    stamper.setAlignment(
      PDFNet.Stamper.HorizontalAlignment.e_horizontal_center,
      PDFNet.Stamper.VerticalAlignment.e_vertical_center
    );

    const redColorPt = await PDFNet.ColorPt.init(1, 0, 0);
    stamper.setFontColor(redColorPt);
    const pgSet     = await PDFNet.PageSet.createRange(
      1,
      await pdfdoc.getPageCount()
    );

    await stamper.stampText(pdfdoc, watermark, pgSet);

    await pdfdoc.save(outputPath, PDFNet.SDFDoc.SaveOptions.e_linearized);
  }

  PDFNet.runWithCleanup(watermarkPDF).then(() => {
    fs.readFile(outputPath, (err, data) => {
      if(err) {
        res.statusCode  = 500;
        res.end(err);
      } else {
        res.setHeader("contentType", "application/pdf");
        res.end(data);
      }
    })
  }).catch(err => {
    res.statusCode  = 500;
    res.end(err);
  });
});

// create as image
router.get("/thumbnail", (req, res) => {
  const { filename } = req.query;

  const inputPath     = path.resolve(__dirname, `../files/pdf/${filename}.pdf`);
  const outputPath    = path.resolve(__dirname, `../files/pdf/${filename}_img.pdf`);

  const getThumbFromPDF = async () => {
    const doc       = await PDFNet.PDFDoc.createFromFilePath(inputPath);
    await doc.initSecurityHandler();
    const pdfDraw   = await PDFNet.PDFDraw.create(92);
    const currPage  = await doc.getPage(1);
    await pdfDraw.export(currPage, outputPath, "PNG");
  }

  PDFNet.runWithCleanup(getThumbFromPDF).then(() => {
    fs.readFile(outputPath, (err, data) => {
      if(err) {
        res.statusCode  = 500;
        res.end(err);
      } else {
        res.setHeader("ContentType", "image/png");
        res.end(data);
      }
    })
  }).catch(err => {
    res.statusCode  = 500;
    res.end(err);
  });
});

// get text
router.get("/textExtract", (req, res) => {
  const { filename, pageNumber } = req.query;

  const inputPath     = path.resolve(__dirname, `../files/pdf/${filename}.pdf`);

  const extractText   = async () => {
    const doc       = await PDFNet.PDFDoc.createFromFilePath(inputPath);
    await doc.initSecurityHandler();
    const page      = await doc.getPage(Number(pageNumber));

    const txt       = await PDFNet.TextExtractor.create();
    const rect      = new PDFNet.Rect(0, 0, 612, 794);

    txt.begin(page, rect);

    const text      = await txt.getAsText();

    res.status(200).json({
      status: "success",
      data: text
    });
  }

  PDFNet.runWithCleanup(extractText).then(() => {
      
  }).catch(err => {
    console.log(err);
    res.statusCode  = 500;
    res.end(err);
  });
});

// convert to docx
router.get("/convertFromPDF", (req, res) => {
  async function main() {
    await PDFNet.addResourceSearchPath("./");
    if(!(await PDFNet.StructuredOutputModule.isModuleAvailable())) {
      return;
    }

    await PDFNet.Convert.fileToWord("../files/pdf/abstrak.pdf", "../files/docx/ouput.docx");
  }

  PDFNet.runWithCleanup(main);
});

module.exports = router;