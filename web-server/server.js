var express = require('express');
var app = express();
var PORT = 3000;
// app.get('/', function(req, res) {
//   res.send('Hello Express!');
// });

app.get('/patient', function(req, res) {
  res.send('Patient ID');
});

app.use(express.static(__dirname + '/public'));
//console.log(__dirname);

app.listen(PORT, function() {
  console.log('Express server started on ' + PORT)
});
