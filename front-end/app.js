const express = require('express')
var request = require('request')
const app = express()

app.use(express.static('dist'))

var apiUrl = 'http://localhost:3000'
app.use('/api', function(req, res) {
  var url = apiUrl + req.url;
  req.pipe(request(url)).pipe(res);
});

app.listen(80, () => console.log('twinword listening on port 80!'))