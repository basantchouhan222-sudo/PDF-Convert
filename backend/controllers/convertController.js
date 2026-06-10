const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const { deleteFiles } = require('../utils/fileUtils');

// Handle conversion of uploaded image(s) to PDF
async function handleConvert(req, res, next) {
  try {
    const files = req.files || [];
    if (!files.length) {
      const err = new Error('No files uploaded');
      err.status = 400;
      throw err;
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="converted.pdf"');

    const doc = new PDFDocument({ autoFirstPage: false });
    doc.pipe(res);

    for (const file of files) {
      const imgPath = path.resolve(file.path);
      const img = fs.readFileSync(imgPath);
      const { width, height } = doc
        .openImage ? doc.openImage(img) : { width: 595, height: 842 };

      // add a page sized to image aspect ratio
      doc.addPage({ size: [width, height] });
      doc.image(imgPath, 0, 0, { fit: [width, height] });
    }

    doc.end();

    // once response finished, cleanup uploaded files
    res.on('finish', async () => {
      try {
        const paths = files.map(f => f.path);
        await deleteFiles(paths);
      } catch (e) {
        console.error('Cleanup failed', e);
      }
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { handleConvert };
