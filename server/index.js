const apm = require('elastic-apm-node').start({
  // Set required app name (allowed characters: a-z, A-Z, 0-9, -, _, and space)
  appName: 'thesis'
  //custom APM Server URL (default: http://localhost:8200)
})
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Moment = require('moment');



let urlencodedParser = bodyParser.urlencoded({ extended: false })
let startTime = Moment();
let experienceId = 5000001;
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
})

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
	const endTime = Moment(); 
	// set time up for created at and upodated at;
	console.log('tiome ',endTime.diff(startTime))

	sequelize.authenticate().then(() => {
		sequelize.query(`INSERT INTO ${type} (itemid, location, itemtype, hostid, createdat, updatedat) VALUES (${usedId},'${req.body.location}', '${req.body.itemtype}', ${req.body.hostid}, '2017-12-14 16:31:11.109-08', '2017-12-14 16:31:11.109-08')`)
		.then(() => {
			console.log('updated') // 1
			
			res.send(201);
		}).catch((err) => {
	  	console.log(err);
		});
	});
	res.send(200)
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

