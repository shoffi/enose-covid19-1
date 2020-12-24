const fs = require('fs');
const path = require('path');
const mysql = require('mysql');
const Json2csvParser = require("json2csv").Parser;

let connection = mysql.createConnection({
    host    :   'localhost',
    user    :   'root',
    password:   'adminadmin',
    database:   'enose'
})

connection.connect(function (err) {
    console.log(err)
})

const getSampling = () => {
    return new Promise( (resolve, reject) => {
        connection.query('select * from sampling', (err, res) => {
            if (err){
                reject()
            }
            else {
                console.log(res)
                resolve(res)
            }
        })
    } )
}

const fungsi = async () => {
    let sampling_rows = await getSampling()
    console.log(sampling_rows)
    const json2csvParser = new Json2csvParser({ header: true});
    const csv = json2csvParser.parse(sampling_rows);
    // console.log(csv)
    let alamat = path.join('/Users/azzamjiul/Documents/hahaha.csv')
    
    // fs.writeFile( alamat, csv, function(error) {
    //     if (error) throw error;
    //     console.log("Write to hahaha.csv successfully!");
    // })
}

fungsi()