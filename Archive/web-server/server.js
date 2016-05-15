var express = require('express');
var app = express();
// var PORT = 3000;
// app.get('/', function(req, res) {
//   res.send('Hello Express!');
// });

app.get('/patient', function(req, res) {
  res.send('Patient ID');
});

app.use(express.static(__dirname + './public'));
//console.log(__dirname);

// app.listen(PORT, function() {
//   console.log('Express server started on ' + PORT)
// });

var fs = require('fs');
var http = require('http');
var https = require('https');
var app = require('express')();

var options = {
   key  : fs.readFileSync('server.key'),
   cert : fs.readFileSync('server.crt')
};

function setup (ssl) {
   if (ssl && ssl.active) {
      return {
         key  : fs.readFileSync(ssl.key),
         cert : fs.readFileSync(ssl.certificate)
      };
   }
}

function start (app, options) {
   if (options)
      return require('https').createServer(options, app);

   return require('http').createServer(app);
}

module.exports = {
   create: function (settings, app, cb) {
      var options = setup(settings.ssl);
      return start(app, options).listen(settings.port, cb);
   }
};

fs.readFile('./index.html', function (err, html) {
    if (err) {
        throw err;
    }
    http.createServer(function(req, res) {
        res.writeHeader(200, {"Content-Type": "text/html"});
        res.write(html);
        res.end();
    }).listen(3000);
});
