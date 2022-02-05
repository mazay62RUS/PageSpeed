const express = require('express');
const app = express();

const logic = require('./logic')

const PORT = 1337;

app.get('/sites', (req, res) => {
    const site = req.query.search;
    logic.main(site, res)
})

app.listen(PORT, () => {
    console.log(`server started at port ${PORT}`);
})
