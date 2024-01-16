const express = require('express')
const app = express()
const mysql = require('mysql');
const Db = require('./mysqlPromise')
const connectionString = 'mysql://root@localhost/wp3f'
const session = require('express-session')
app.use( express.urlencoded({ extended: true }))

app.use(express.json())
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
 
app.get('/kosik', (req, res) => {
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

app.get('/kosik/objednavka', (req, res) => {
    res.render('objednavka');
});

app.post('/odeslat-objednavku', (req, res) => {
    const { jmeno, prijmeni, email, telefon, adresa } = req.body;
    
    const produkty = JSON.stringify(req.session.kosik || []);
    
    if (!jmeno || !prijmeni || !email || !telefon || !adresa) {
        return res.status(400).send('Všechna pole formuláře musí být vyplněna.');
        
      }

    const query = 'INSERT INTO objednavka (jmeno, prijmeni, email, telefon, adresa, produkty, vyrizena) VALUES (?, ?, ?, ?, ?, ?, ?)';
    
    db.query(query, [jmeno, prijmeni, email, telefon, adresa, produkty, 0], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Došlo k chybě při zpracování objednávky.');
        } else {
            res.send('Objednávka byla úspěšně odeslána.');
        }
    });
});

app.get('/vymazat-kosik', (req, res) => {
    req.session.kosik = [];
    res.redirect('/kosik');
});

const userRouter = require("./routes/users");
app.use("/users", userRouter)


app.listen(1500); 