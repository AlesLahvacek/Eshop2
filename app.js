const express = require('express')
const app = express()
const mysql = require('mysql');
const Db = require('./mysqlPromise')
const connectionString = 'mysql://root@localhost/wp3f'
const session = require('express-session')

app.set("view engine", "ejs")
app.use(express.static(__dirname + "/views"))
app.use(session({
    secret: 'velmitajneheslomoznanebone',
    resave: false,
    saveUninitialized: true
}))



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
            produkty: resultData,
            kosik: req.session.kosik || []
        })
        
    })
    connection.end(err => console.log(err)); 
        console.log("text");

})

const db = mysql.createConnection({
    host: 'localhost',
  user: 'root', 
  password: '', 
  database: 'wp3f'
}); 
  
  db.connect((err) => {
    if (err) throw err;
    console.log('Připojeno k databázi');
  });
  
  app.get('/pridat-do-kosiku', (req, res) => {
    let polozka_id = req.query.id;
    
    if (!req.session.kosik) {
        req.session.kosik = [];
    }
    
    req.session.kosik.push(polozka_id);
    
    res.redirect('/');
});
 
app.get('/kosik', function(req, res) {
    let produkty = req.session.kosik || [];
    
    if (produkty.length > 0) {
        let produktyKosik = [];
        let queries = produkty.map(id => {
            return new Promise((resolve, reject) => {
                let sql = `SELECT * FROM produkt WHERE id = ${mysql.escape(id)}`;
                db.query(sql, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result[0]);
                    }
                });
            });
        });

        Promise.all(queries)
            .then(results => {
                res.render('kosik', {produkty: results});
            })
            .catch(err => {
                throw err;
            });
    } else {
        res.render('kosik', {produkty: []});
    }
});

app.get('/vymazat-kosik', function(req, res) {
    req.session.kosik = [];
    res.redirect('/kosik');
});

const userRouter = require("./routes/users");
app.use("/users", userRouter)


app.listen(1500); 