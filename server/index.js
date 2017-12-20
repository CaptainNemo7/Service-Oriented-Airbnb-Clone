const apm = require('elastic-apm-node').start({
  // Set required app name (allowed characters: a-z, A-Z, 0-9, -, _, and space)
  appName: 'thesis'
  //custom APM Server URL (default: http://localhost:8200)
})
const http = require('http');
const querystring = require('querystring');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Moment = require('moment');



let urlencodedParser = bodyParser.urlencoded({ extended: false })
let experienceId = 6000001;
let listingId = 10000001;

const Sequelize = require('sequelize');
const sequelize = new Sequelize('testdb', '', '', {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 9,
    min: 0,
    idle: 10000
  }
});




// location = \'' + req.body + '\''
// Por Tomás

app.get('/search/:location', function(req, res) {
	console.log('recieved and running')
	console.log(req.params.location)
	sequelize.authenticate().then(() => {
		sequelize.query(`SELECT * from experiences WHERE location = '${req.params.location}' LIMIT 5 `)
		.then((listings) => {
			
			sequelize.query(`SELECT * from listings WHERE location = '${req.params.location}' LIMIT 5 `)
				.then((experiences) => {
				console.log("Success!");
				console.log(listings[0])
				console.log(experiences[0])
				let holder = {'listings': listings[0], 'experiences':experiences[0]}
				res.send(holder)
			})
		})
	  
	}).catch((err) => {
	  console.log(err);
	});
})

app.post('/delete', urlencodedParser, (req, res) => {
	if ( !req.body ) {
		return res.sendStatus(400);
	}
	console.log('deleted! ', req.body);

	let type = '';
	if ( req.body.itemtype === 'Listing' ) {
		type = 'listings'
	} else {
		type = 'experiences'
	}
	sequelize.authenticate().then(() => {
		sequelize.query(`UPDATE ${type} SET location = 'Null' WHERE ${type}.hostid = ${req.body.hostid}`)
		.then(() => {
			console.log('updated') // 1
			
			res.send(201);
		}).catch((err) => {
	  	console.log(err);
		});
	});
	let startTime = Moment();
	let updatesToChris = {
		host: //need to fill in,
		port: // need to fill in,
		path: '/deleted',
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': Buffer.byteLength(data)
		}
	};
	let data = {req.body.itemid, req.body.itemtype, req.body.hostid, startTime.format()}
	data.querystring.stringify();
	let info = http.request(options, (res)=> {
		info.setEncoding('utf8');
		info.on('data'., (chunk) => {
			console.log('body: ', chunk);
		});
	});
	info.write(data);
	info.end();

})
// for chris - itemid, type, hostid, time updated/destroyed
app.post('/create', urlencodedParser, (req, res) => {
	if ( !req.body ) {
		return res.sendStatus(400);
	}
	console.log('hey received! ',req.body);

	let type = '';
	let usedId = '';
	if ( req.body.itemtype === 'Listing' ) {
		type = 'listings'
		usedId = listingId;
		listingId += 1;
	} else {
		type = 'experiences'
		usedId = experienceId;
		experienceId += 1;
	}
	let startTime = Moment();


	sequelize.authenticate().then(() => {
		sequelize.query(`INSERT INTO ${type} (itemid, location, itemtype, hostid, createdat, updatedat) VALUES (${usedId},'${req.body.location}', '${req.body.itemtype}', ${req.body.hostid}, '${startTime.format()}', '${startTime.format()}')`)
		.then(() => {
			console.log('updated') // 1
			
			res.send(201);
		}).catch((err) => {
	  	console.log(err);
		});
	});

	let updatesToChris = {
		host: //need to fill in,
		port: // need to fill in,
		path: '/created',
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': Buffer.byteLength(data)
		}
	};
	let data = {usedId, req.body.itemtype, req.body.hostid, startTime.format()}
	data.querystring.stringify();
	let info = http.request(options, (res)=> {
		info.setEncoding('utf8');
		info.on('data'., (chunk) => {
			console.log('body: ', chunk);
		});
	});
	info.write(data);
	info.end();
})


//For Joe
app.post('/books', urlencodedParser, (req, res) => {

})

// app.get('/search', function (req, res) {
// 	console.log('hey')
//   res.send('hello world')
// })


// any errors caught by Express can be logged by the agent as well
app.use(apm.middleware.express())

app.listen(3000)
console.log('listening on port 3000!')

