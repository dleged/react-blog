const spawn = require('child_process').spawn;

module.exports = function(DB_PATH){
	try {
		spawn('mongod',[DB_PATH]);
	} catch (e) {
		console.log(e);
	}
}


//echo "/usr/local/mongodb/bin/mongod --dbpath=/home/mongodb-database/react-blog-db/data –logpath=/home/mongodb-database/react-blog-db/logs –logappend  --auth –port=27017"
