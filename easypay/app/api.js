var express = require('express')
var mysql = require('mysql')

var Router = express.Router();

var ConnPool = mysql.createPool({
  host: '10.100.137.83',
  user: 'root',
  password: 'admin',
  database: 'mysql'
})


// create database and MESSAGE table if not exist
ConnPool.query('CREATE DATABASE IF NOT EXISTS k8smysqldb', function (err) {
if (err) throw Error('\n\t **** error creating database **** ' + err)

console.log('\n\t ==== database k8smysqldb created !! ====')

})

// create the table in k8smysqldb
ConnPool.query('CREATE TABLE IF NOT EXISTS k8smysqldb.messages('
+ 'id INT NOT NULL AUTO_INCREMENT,'
+ 'PRIMARY KEY(id),'
+ 'text VARCHAR(100)'
+ ')', function (err) {
if (err) throw Error('\n\t **** error creating table **** ' + err);
})

/**
* /all
*/
Router.get('/all', function (req, res) {
   ConnPool.getConnection(function (errConn, conn) {
   if (errConn) throw Error('error get connection : ' + errConn)

   conn.query('SELECT * FROM k8smysqldb.messages', function (errSelect, rows) {
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
