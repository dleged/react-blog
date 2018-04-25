const spawn = require('child_process').spawn;

//mongod --dbpath=/Users/fanduanduan/Desktop/前端/node/react-blog/server/db --auth

module.exports = function(DB_PATH){
	try {
		spawn('mongod',[DB_PATH]);
	} catch (e) {
		console.log(e);
	}
}
