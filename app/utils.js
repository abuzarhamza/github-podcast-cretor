const chalk = require("chalk");
const commandExistsSync = require("command-exists").sync;
const getos = require("getos");

const logger = {
	warning: (str) => {
		console.log(chalk.yellow(`warning : ${str}`));
	},
	error: (err) => {
		console.log(chalk.red(`error : ${err}`));
	},
	info: (info) => {
		console.log(chalk.blue(`info : ${info}`));
	},
	log: (log) => {
		console.log(chalk.green(`log : ${log}`));
	},
};
const envInfo = () => {
	getos((e, os) => {
		if (e) {
			logger.error(e);
		}
		logger.info(` os info: ${os.os}`);
		logger.info(` os info: ${os.dists}`);
	});
};
const checkRequiredCommand = () => {
	if (commandExistsSync("git")) {
		console.log(chalk.red(logger.warning("missing git command")));
	}
};

module.exports = {
	envInfo,
	checkRequiredCommand,
};
