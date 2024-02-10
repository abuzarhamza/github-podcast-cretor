const chalk = require("chalk");
const commandExistsSync = require("command-exists").sync;
const getos = require("getos");
const cheerio = require("cheerio");

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

const createWebPage = (data) => {
	const $ = cheerio.load('<!DOCTYPE html><html lang="en"><>');

	//title
	$("head").append(`<title>${data.title}</title>`);

	//about
	$("body").append(`<h1 style="font-family:monospace;">About</h1>`);
	$("body").append(
		`<p style="font-family:monospace;">${data.discription}</p>`
	);
	$("body").append(`<h2 style="font-family:monospace;">${data.name}</h1>`);
	$("body").append(`<p class="p1" id="p1"></p>`);

	const selected = $(".p1");
	if (data && data.feed_list) {
		Object.keys(data.feed_list)
			.sort()
			.forEach((keyName, index) => {
				const feedIndex = index + 1;
				let feedData = data.feed_list[keyName];
				selected.append(`${feedIndex}. <a id="f${feedIndex}" href="${feedData.description}">${feedData.name}</a>
                    <br/>
                    <br/>

                `);
			});
	}
	// 1. <a href="https://en.wikipedia.org/wiki/Khurram_Murad">Khurram Murrad</a>
	//          <br/>
	//          <br/>
	//             <a href="https://podcasts.google.com/feed/aHR0cHM6Ly9raGF1bGFmYXRpbWEuZ2l0aHViLmlvL2lzbGFtNGFsbC5naXRodWIuaW8va2h1cnJhbV9tdXJyYWQvcG9kY2FzdC9sZWN0dXJlcy54bWw">Listen on Google Play Music</a>
	//          <br/>
	//          <br/>
	//             <a href="https://podcasts.apple.com/us/podcast/khurram-murrad-lectures/id1471393649">Listen on itunes</a>
	//          <br/>
	//          <br/>
	//             <a href="http://www.subscribeonandroid.com/khaulafatima.github.io/islam4all.github.io/khurram_murrad/podcast/lectures.xml">Subscribe on Android</a>
	//          <br/>
	//          <br/>
	console.log($.root().html());
};

createWebPage({
	title: "foo",
	discription: "heppy",
	name: "india",
	feed_list: [
		{
			name: "name1",
			description: "desddd",
			youtube_music: "aaalll",
			itunes: "aaaa",
			spotify: "saasdasda",
			"Subscribe on Android": "asdasdasd",
		},
	],
});
module.exports = {
	envInfo,
	checkRequiredCommand,
	logger,
	createWebPage,
};
