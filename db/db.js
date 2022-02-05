const insertBenchmark = (url, benchmark, timestamp) => {
   return `INSERT INTO pagespeed (url, benchmark, timestamp)
                     VALUES ('${url}', '${benchmark}', '${timestamp}');`
}

const getBenchmarks = (url) => {
    return `
        SELECT  *
        FROM    pagespeed
        WHERE 1=1
        AND url = '${url}'
        ORDER BY timestamp DESC
        LIMIT 1
        ;
    `
}

module.exports = { insertBenchmark, getBenchmarks}