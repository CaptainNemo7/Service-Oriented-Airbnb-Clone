
const Moment = require('moment');
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

// Location: STRING,
//   itemId: INTEGER,
//   itemType: STRING,
//   hostId: INTEGER

const locationsObj = [
	'Los Angeles', 
	'San Francisco', 
	'Miami', 
	'Paris', 
	'Barcelona', 
	'San Juan',
	'Austin',
	'Seattle'
]

const itemTypes = 'Experiences'
// // let hostId = Math.floor(Math.random() * 1000000);
// let hostIdCounter = 1;
// let randLocation = locationsObj[Math.floor(Math.random() * 6)]

// let startTime = Moment();

// let Listings = sequelize.define('listings', {
// 	itemid: {
// 		type: Sequelize.INTEGER,
// 		autoIncrement: true,
// 		primaryKey: true,
// 	},
// 	location: {
// 		type: Sequelize.STRING
// 	},
// 	itemtype: {
// 		type: Sequelize.STRING
// 	},
// 	hostid: {
// 		type: Sequelize.INTEGER,
// 	}
// 	}, {
// 		freezeTableName: true
// });
// let Experiences = sequelize.define('experiences', {
// 	itemid: {
// 		type: Sequelize.INTEGER,
// 		autoIncrement: true,
// 		primaryKey: true,
// 	},
// 	location: {
// 		type: Sequelize.STRING
// 	},
// 	itemtype: {
// 		type: Sequelize.STRING
// 	},
// 	hostid: {
// 		type: Sequelize.INTEGER,
// 	}
// 	}, {
// 		freezeTableName: true
// });
let Connections = sequelize.define('connections', {
	itemid: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	listingid: {
		type: Sequelize.INTEGER
	},
	experienceid: {
		type: Sequelize.INTEGER,
	}
	}, {
		freezeTableName: true
});

// const creation = () => {
// 	for ( let i=1; i<1001; i++ ) {
// 		// hostId = i;
// 		Listings.sync().then(() => {
//   	return Listings.create({
//   		location: locationsObj[Math.floor(Math.random() * 6)],
//   		itemtype: itemTypes,
//   		hostid: i,
//   	})

//   	// hostIdCounter += 1;
//   	console.log('it is number!: ', i)
//   	console.log('===================================')
//   	// 	const endTime = Moment();
// 		// console.log('All Done!');
// 		// console.log('It took ' + endTime.diff(startTime, 'seconds') + ' seconds');

// 	  }).catch((err) => {
// 	  	console.log(err)
// 	  })
// 	}
// }

sequelize.authenticate().then(() => {
  console.log("Success!");

 Connections.sync().then(() => {
  	return Connections.create({
  		listingid: 1,
  		experienceid: 1,
  	})
  })
  
}).catch((err) => {
  console.log(err);
});



