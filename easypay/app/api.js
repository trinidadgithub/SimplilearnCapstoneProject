var express = require('express')
var mysql = require('mysql')

var Router = express.Router();

var con = mysql.createConnection({
  host: '10.100.137.83',
  user: 'root',
  password: 'admin'
})

// create database and MESSAGE table if not exist

con.connect(function(err) {
   if (err) throw err;
   console.log("Connected!");
   con.query('CREATE DATABASE IF NOT EXISTS k8smysqldb', function (err, result) {
       if (err) throw err;
       console.log("Database k8smysqldb created");
   });
   var sql = "CREATE TABLE IF NOT EXISTS k8smysqldb.messages ( id INT NOT NULL AUTO_INCREMENT, PRIMARY KEY(ID), text VARCHAR(100))"
   con.query(sql, function (err, result) {
       if (err) throw err;
       console.log("Table messages created.");
   });
});

/**
* /all
*/
Router.get('/all', function (req, res) {
   ConnPoolk8smysqldb.getConnection(function (errConn, conn) {
   if (errConn) throw Error('error get connection : ' + errConn)

   conn.query('SELECT * FROM messages', function (errSelect, rows) {
	if (errSelect) throw Error('error selecting messages : ' + errSelect)
	res.writeHead(200, 
          {
		'Content-Type': 'application/json'
	  });

	var result = 
          {
	   success: true,
	   rows: rows.length,
	  }

	res.write(JSON.stringify(rows));
	res.end();
	})
   })
})

module.exports = Router
