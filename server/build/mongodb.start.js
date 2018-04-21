const spawn = require('child_process').spawn;

module.exports = function(DB_PATH){
	try {
		spawn('mongod',[DB_PATH]);
	} catch (e) {
		console.log(e);
	}
}
