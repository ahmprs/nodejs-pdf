// ## Note:
// Head over to https://pdfkit.org/docs/guide.pdf

const PORT = 2620;
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const PATH_TO_OUT = 'out/pdf/'
const PDFDocument = require('pdfkit');

init()

// ## Middleware Section ------------------------------
app.use(bodyParser.json());
// ## Middleware Section ==============================


// ## Endpoints  --------------------------------------
app.all('/convert-to-pdf', (req, res) => {
    const doc = new PDFDocument({font: 'Courier'});
    // const doc = new PDFDocument({font: 'Consolas'});

    // Pipe the PDF content to a writable stream
    const stream = fs.createWriteStream(`${PATH_TO_OUT}\\test.pdf`);

    // Pipe the PDF document to the stream
    doc.pipe(stream);

    // Add content to the PDF
    doc.fontSize(20).text('Hello, PDF!', { align: 'center' });
    
    doc.fontSize(14).text('This is another line here', { align: 'right' });
    doc.fontSize(14).text('There are Tons of things one can do with this tool', { align: 'left' });


    // Finalize the PDF
    doc.end();

    // Notify once the PDF is generated
    stream.on('finish', () => {
        console.log('PDF file generated successfully.');
    });
    res.send('Converting to PDF');
});
// ## Endpoints  ======================================


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});


function init() {
    let pth = `${__dirname}\\${PATH_TO_OUT}`
    if (fs.existsSync(pth) === false) {
        fs.mkdirSync(pth, { recursive: true })
    }
}