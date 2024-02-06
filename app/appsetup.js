const {logger } = require('utils');
const fs = require("fs");

const makeAppDirectory = (appName) => {
	const dirName = appName;
	if (fs.existsSync(dirName)) {
		logger.error(`dir ${dirName} alsready exists!`);
		return;
	}
	try {
		fs.mkdirSync(folderName);
	} catch(err) {
		logger.error(`dir ${dirName} error while creating directory!`);
	}

};

const createStaticYmlConfig = () => {

};



const runNewSetupJob = (setupConfig) => {
	//     {
	//   blog_name: 'g',
	//   tittle: 'h',
	//   contact_name: 'foo bar',
	//   email: 'null@null.null',
	//   feed_dir: 'tb_gbbbg'
	// }
	// make dir app
	// create a web page
	// create feed dir
	// app_config.yml create yml file
	// create feed_dir
	// _data/data.yml
	// _source
	// xml

	
};

module.exports = {
	runNewSetupJob,
};
