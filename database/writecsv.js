const Moment = require('moment');
let fs = require('fs');
let wstream = fs.createWriteStream('connections.txt');

const locationsObj = [
	'Los Angeles', 
	'San Francisco', 
	'Miami', 
	'Paris', 
	'Barcelona', 
	'San Juan',
	'Austin',
	'Seattle',
	'New York',
	'Tokyo'
]
let itemId = 1;
const itemTypes = 'Listing';
let hostIdCounter = 1;
let experienceidCounter = 1;
let randLocation = locationsObj[Math.floor(Math.random() * 10)]

// for listings and experiences

// let startTime = Moment();
// for ( var i=1; i<=5000000; i++ ) {
// 	wstream.write(itemId + '|' + randLocation + '|' + itemTypes + '|' + hostIdCounter + '|' + '2017-12-14 16:31:11.109-08' + '|' + '2017-12-14 16:31:11.109-08' + '\n');
// 	itemId += 1;
// 	hostIdCounter += 1;
// 	randLocation = locationsObj[Math.floor(Math.random() * 10)]
// }
// const endTime = Moment();
// wstream.end(console.log('It took ' + endTime.diff(startTime, 'seconds') + ' seconds'))

// for join table: connections 

let startTime = Moment();
for ( var i=1; i<=5000000; i++ ) {
	wstream.write(itemId + '|' + hostIdCounter + '|' + experienceidCounter + '|' + '2017-12-14 16:31:11.109-08' + '|' + '2017-12-14 16:31:11.109-08' + '\n');
	itemId += 1;
	hostIdCounter += 1;
	experienceidCounter += 1;
}
const endTime = Moment();
wstream.end(console.log('It took ' + endTime.diff(startTime, 'seconds') + ' seconds'))




