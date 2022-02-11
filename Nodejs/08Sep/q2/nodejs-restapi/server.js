var express = require('express');
var app = express();
// var bodyParser = require('body-parser');
app.use(express.json())

require('./app/routes/customer.routes.js')(app);


// Create a Server
app.listen(8081);
console.log('Listening to the server 8081!!');