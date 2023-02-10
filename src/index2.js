const mysql = require("mysql");
const xlsx = require('xlsx');

const filePath = process.argv.slice(2)[0];
const workbook = xlsx.readFile(filePath);
const worksheet = workbook.Sheets[workbook.SheetNames[0]];

let posts = [];
let post = {};

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "exceltomysql",
});

for (let cell in worksheet) {
    const cellAsString = cell.toString();

    if(cellAsString[1] !== 'r'
        && cellAsString !== 'm' && cellAsString[1] > 1) {
            if (cellAsString[0] === 'A') {
                post = worksheet[cell].v;
            }
            if (cellAsString[0] === 'B') {
                post = worksheet[cell].v;
                posts.push(post);
                post = {};                
            }
        }
}

// let sql = "INSERT INTO users (user_name, user_email ) VALUES ( ? , ? ) "
// db.query(sql, posts, (err,results, fields) =>{
//     if (err) {
//         return console.error(err.message);

//     }
//     console.log("USER ID:" + results.insertId);
// });


console.log(posts);