var express = require('express');
var app = express();
// var PORT = 3000;
// app.get('/', function(req, res) {
//   res.send('Hello Express!');
// });

app.get('/patient', function(req, res) {
  res.send('Patient ID');
});

app.use(express.static(__dirname + '/public'));
//console.log(__dirname);

// app.listen(PORT, function() {
//   console.log('Express server started on ' + PORT)
// });

var http = require('http'),
    fs = require('fs');


fs.readFile('./index.html', function (err, html) {
    if (err) {
        throw err;
    }
    http.createServer(function(request, response) {
        response.writeHeader(200, {"Content-Type": "text/html"});
        response.write(html);
        response.end();
    }).listen(8000);
});
