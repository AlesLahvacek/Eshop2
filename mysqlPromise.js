const mysql = require('mysql');

module.exports = class {
    constructor(connectionData){
        this.connection = mysql.createConnection(connectionData);
    }

    close(){
        new Promise((resolve, reject) => {
            this.connection.end(err => {
                if (err) {
                    reject(err)
                }else{
                    resolve()
                }
            })
        })
    }

    queryMany(sql, params){
        return new Promise((resolve, reject) =>{
            this.connection.query(sql, params, (err, resultData) =>{
                if (err) {
                    reject(err)
                }else{
                    resolve(resultData)
                }
            })
        })
    }


    querySingle(sql, params){
        return new Promise((resolve, reject) =>{
            this.connection.query(sql, params, (err, resultData) =>{
                if (err) {
                    reject(err)
                }else{
                    resolve(resultData[0] ?? null)
                }
            })
        })
    }

    executeQuery(sql, params =[]){
        return new Promise((resolve, reject) =>{
            this.connection.query(sql, params, (err, resultData) =>{
                if (err) {
                    reject(err)
                }else{
                    resolve()
                }
            })
        })
    }

}