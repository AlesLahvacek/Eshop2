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
            kosik: req.session.kosik || [],
            user: req.session.user
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
                res.render('kosik',
                {produkty: results,
                 user: req.session.user });
            })
            .catch(err => {
                throw err;
            });
    } else {
        res.render(
            'kosik',
            {produkty: [],
             user: req.session.user });
    }
});

app.get('/kosik/objednavka', (req, res) => {
    res.render('objednavka');
});

app.post('/odeslat-objednavku', (req, res) => {
    const { jmeno, prijmeni, email, telefon, adresa } = req.body;
    if (!req.session.kosik || req.session.kosik.length === 0) {
       return res.redirect('/kosik?empty=true')
    }
    const produkty = JSON.stringify(req.session.kosik || []);
    
    const query = 'INSERT INTO objednavka (jmeno, prijmeni, email, telefon, adresa, produkty, vyrizena) VALUES (?, ?, ?, ?, ?, ?, ?)';
    
    db.query(query, [jmeno, prijmeni, email, telefon, adresa, produkty, 0], (err, result) => {
        if (err) {
            console.error(err);
            res.redirect('/kosik?error=true')
        } else {
            req.session.kosik = []
            res.redirect('/kosik?send=true')
        }
    });
});

app.get('/vymazat-kosik', (req, res) => { 
    req.session.kosik = [];
    res.redirect('/kosik');
});

app.get('/user', (req, res) => {
    res.render('user', { user: req.session.user });
});

app.post('/user', (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    
    db.query(query, [username, password], (err, result) => {
        if (err) {
            console.error(err);
            res.redirect('/user?error=true');
        } else if (result.length > 0) {
            req.session.user = result[0];
            res.redirect('/dashboard');
        } else {
            res.redirect('/user?invalid=true');
        }
    });
});

app.get('/dashboard', (req, res) => {
    if(req.session && req.session.user){
        let orders = [];
        if(req.session.user.admin === 1) {
            const query = 'SELECT * FROM objednavka';
            db.query(query, function(err, rows, fields) {
                if (err) throw err;
                orders = rows;
                res.render('dashboard', { user: req.session.user, isAdmin: req.session.user.admin === 1, orders });
            });
        } else {
            res.render('dashboard',{user: req.session.user,isAdmin: req.session.user.admin === 1});
        }
    }
});

app.post('/delete-order', (req, res) => {
    const orderId = req.body.orderId
    const query = 'DELETE FROM objednavka WHERE id = ?'
    db.query(query, [orderId], (err, result) => {
        if (err) {
            console.error(err)
        } else {
            res.redirect('/dashboard')
        }
    })
})

app.post('/toggle-order', (req, res) => {
    const orderId = req.body.orderId;
    const query = 'UPDATE objednavka SET vyrizena = NOT vyrizena WHERE id = ?';
    db.query(query, [orderId], (err, result) => {
        if (err) {
            console.error(err);
        } else {
            res.redirect('/dashboard');
        }
    });
});


app.post('/logout', (req, res) => {
    if(req.session) {
        req.session.user = null
    }
    res.redirect('/');
});

app.get('/register', (req, res) => {
    res.render('register');  
});

app.post('/register', (req, res) => {
    const { username, password } = req.body; 

    
    const query = 'INSERT INTO users (username, password, admin) VALUES (?, ?, 0)';

    
    db.query(query, [username, password], (err, result) => {
        if (err) {
            console.error(err);
            
        } else {
            
            res.redirect('/user');
        }
    });
});

app.listen(1500); 