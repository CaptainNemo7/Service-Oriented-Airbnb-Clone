const express = require('express');
const app = express();
const bodyParser = require('body-parser');

let urlencodedParser = bodyParser.urlencoded({ extended: false })

app.set('port', 8081);

app.get('/', (req, res) => {
	res.send('hello events')
})

app.post('/deleted', urlencodedParser, (req, res) => {
	console.log('events received deleted event');
	res.send(201);
})

app.post('/created', urlencodedParser, (req, res) => {
	console.log('events received created event');
	res.send(201);
})

app.listen(app.get('port'));
console.log('listening on port 8080')