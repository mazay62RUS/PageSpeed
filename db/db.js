const Pool = require('pg').Pool
const AuthDbData = require('./db_connect.json');

const pool = new Pool(AuthDbData);

const insertBenchmark = (url, benchmark, timestamp) => {

   const queryStr = `INSERT INTO pagespeed (url, benchmark, timestamp)
                     VALUES ('${url}', '${benchmark}', '${timestamp}');`

    pool.query(queryStr, (err, data) => {

        if (err) {
            console.log(err)
        } 
        
        console.log("new rows added", data)

    })
}



const getBecnhmarkForOneDay = (url, res) => {

    const queryStr = `
        SELECT  *
        FROM    pagespeed
        WHERE 1=1
        AND url = '${url}'
        ;
    `
    let isLastData;
    let resObj = {};
    pool.query(queryStr, (err, data) => {

        if (err) {
            console.log(err);
            res.json("404");
        } else {

            dateArr = new Array();

            if ( data.rowCount !== 0 ) {
                for ( let i = 0; i < data.rows.length; i++ ) {
                    dateArr.push(data.rows[i].timestamp)
                }
        
                let maxDate = new Date(dateArr.reduce(function (a, b) { return a > b ? a : b; }));
                let currentTime = new Date();
                
                let resultHours = currentTime - maxDate
        
                if ( Math.floor((resultHours / (1000 * 60 * 60)) % 24) < 24 ) {
                    console.log('getting last data...')
                    isLastData = true;
                    for ( let i = 0; i < dateArr.length; i++ ) {
                        if ( data.rows[i].timestamp == dateArr.reduce(function (a, b) { return a > b ? a : b; }) ) {
                            resObj = {
                                "url": data.rows[i].url,
                                "benchmark": data.rows[i].benchmark,
                                "timestamp": data.rows[i].timestamp
                            }
                        
                        }
                    }
                    res.status(200).json(resObj);
        
                } else {
                    isLastData = false;
                }
            }
        }
    })
    
    return isLastData;
}


module.exports = { pool, insertBenchmark, getBecnhmarkForOneDay }