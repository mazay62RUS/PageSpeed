const parseTagByKey = (key, arr, site) => {

    let resultArr = new Array();

    for ( let i = 0; i < arr.length; i++ ) {
        for ( let j = 0; j < arr[i].attributes.length; j++ ) {
            if ( arr[i].attributes[j].name == key ) {
                if ( 
                    arr[i].attributes[j].value.startsWith('http') ||
                    arr[i].attributes[j].value.startsWith('https') 
                ) {
                    resultArr.push(arr[i].attributes[j].value)
                  } else {
                    resultArr.push(`http://${site + arr[i].attributes[j].value}`)
                }
            }
        }
    }

    return resultArr;

}

module.exports = { parseTagByKey }