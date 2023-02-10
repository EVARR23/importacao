const mysql = require("mysql"),


xlsx = require("xlsx");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "exceltomysql",
});

const filePath = process.argv.slice(2)[0];

var workbook = xlsx.readFile(filePath),
worksheet = workbook.Sheets[workbook.SheetNames[0]],
range  = xlsx.utils.decode_range(worksheet["!ref"]);

for (let row = range.s.r; row <= range.e.r; row++) {
    let data = [];
    for (let col = range.s.c; col <= range.e.c; col++) {
        let cell = worksheet[xlsx.utils.encode_cell({ row, col })]
        data.push(cell.v);
        //data.push("EU"); 
    }
    
    let sql = "INSERT INTO users (user_name, user_email ) VALUES ( ? , ? ) "
    db.query(sql, data, (err,results, fields) =>{
        if (err) {
            return console.error(err.message);

        }
        console.log("USER ID:" + results.insertId);
    });
}

db.end();