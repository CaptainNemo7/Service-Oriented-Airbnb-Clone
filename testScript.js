const axios = require('axios');
const bodyParser = require('body-parser');

const express = require('express');
const app = express();
let urlencodedParser = bodyParser.urlencoded({ extended: false })

// app.get('http://localhost:3000/search/Paris', function(req, res) {
// 	res.send('hey')
// })






const test = () => {
	axios.get('http://localhost:80/search/Paris')
	.then((res) => {
		setTimeout(function() {
		
			test()
			

		}, 2)
		// test()
	})
	.catch((err) => {
		console.log(err)
	})
}


test()


