const PORT = 2620;
const express = require('express');
const bodyParser = require('body-parser');
const app = express();


// ## Middleware Section ------------------------------
app.use(bodyParser.json());
// ## Middleware Section ==============================


// ## Endpoints  --------------------------------------
app.post('/convert-to-pdf', (req, res) => {
    res.send('Converting to PDF');
});
// ## Endpoints  ======================================


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});
