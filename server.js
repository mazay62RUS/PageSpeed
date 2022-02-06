const express = require('express');
const res = require('express/lib/response');
const app = express();

const logic = require('./logic')

const PORT = 1337;

app.get('/sites', (req, res) => {
    const site = req.query.search;
    if ( site.includes('.') ) {
        logic.main(site, res);
    } else {
        console.log(`${site} bad url`)
        res.json(`${site} bad url`)
    }
})

app.use( (req, res, next ) => {
    console.log(`${req.url} is not found`)
    res.json({ error: 'Not found' });
});

process.on('uncaughtException', (err) => {
    console.log('Caught exception: ' + err);
    res.json('server error 500');
});

app.listen(PORT, () => {
    console.log(`server started at port ${PORT}`);
})
