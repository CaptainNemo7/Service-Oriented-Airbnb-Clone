const express = require('express');
const app = express();
const bodyParser = require('body-parser');

let urlencodedParser = bodyParser.urlencoded({ extended: false })

app.set('port', 8082);

app.get('/', (req, res) => {
	res.send('hello bookings')
})

app.post('/createdBooking', urlencodedParser, (req, res) => {
	console.log('bookings received created event');
	res.send(201);
})

app.listen(app.get('port'));
console.log('listening on port 8081')