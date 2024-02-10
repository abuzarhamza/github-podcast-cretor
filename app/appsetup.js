const { logger } = require("utils");
const fs = require("fs");

const makeAppDirectory = (appName) => {
	const dirName = appName;
	if (fs.existsSync(dirName)) {
		logger.error(`dir ${dirName} alsready exists!`);
		return;
	}
	try {
		fs.mkdirSync(dirName);
	} catch (err) {
		logger.error(`dir ${dirName} error while creating directory!`);
	}
};

const makeWebPage = () => {};
const createStaticYmlConfig = () => {};

const runNewSetupJob = (setupConfig) => {
	//     {
	//   blog_name: 'g',
	//   tittle: 'h',
	//   contact_name: 'foo bar',
	//   email: 'null@null.null',
	//   feed_dir: 'tb_gbbbg'
	// }
	// make dir app || done
	makeAppDirectory();
	// create a web page
	makeWebPage();
	// create feed dir ||
	// app_config.yml create yml file
	// create feed_dir
	// _data/data.yml
	// _source
	// xml
};

module.exports = {
	runNewSetupJob,
};
