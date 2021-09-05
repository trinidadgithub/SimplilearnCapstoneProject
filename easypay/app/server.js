var express = require('express')
var msgApi = require('./api')

var app = express()

app.use('/msg-api', msgApi)

app.get('/ping', function (req, res) {
res.write("hello there! I m up and running!");
res.end();
})

app.listen(8080, function () {
console.log('\n\t ==== Message API listening on 8080! ====')
})
