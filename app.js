const express = require('express')
const app = express()
const mysql = require('mysql');
const Db = require('./mysqlPromise')
const connectionString = 'mysql://root@localhost/wp3f'

app.set("view engine", "ejs")
app.use(express.static(__dirname + "/views"))




app.get("/", (req, res) => {
    const connection = mysql.createConnection(connectionString);
    const sql = 'SELECT ID, nazev, cena, img FROM produkt'
    connection.query(sql, (err, resultData) => {
        if (err) {
            res.status(500).send(err.message);
            return
        }
        console.log(resultData)
    
        res.render('index', {
            titulek:"Zdravá žrádelna",
            nadpis:"Node.js funguje",
            produkty: resultData
        })
        
    })
    connection.end(err => console.log(err)); 
        console.log("text");

})

const userRouter = require("./routes/users")
app.use("/users", userRouter)


app.listen(1500); 