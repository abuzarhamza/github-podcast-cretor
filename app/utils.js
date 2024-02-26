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
	$("head").append(`<title>${data?.title}</title>`);

	//about
	$("body").append(`<h1 style="font-family:monospace;">About</h1>`);
	$("body").append(
		`<p style="font-family:monospace;">${data?.discription}</p>`
	);
	$("body").append(`<h2 style="font-family:monospace;">${data?.name}</h1>`);
	$("body").append(`<p class="p1" id="p1"></p>`);

	const selected = $(".p1");
	if (data && data.feed_list) {
		Object.keys(data.feed_list)
			.sort()
			.forEach((keyName, index) => {
				let feedData = data.feed_list[keyName];
				if (feedData && feedData.description && feedData.name) {
					const feedIndex = index + 1;
					selected.append(`${feedIndex}. <a id="f${feedIndex}" href="${feedData.description}">${feedData.name}</a>
                    <br/>
                    <br/>

                `);
					if (feedData.youtube_music) {
						selected.append(
							`<a href="${feedData.youtube_music}">Listen on Youtube Music</a>
								<br/>
								<br/>
							`
						);
					}
					if (feedData.itunes) {
						selected.append(
							`<a href="${feedData.itunes}">Listen on itunes</a>
								<br/>
								<br/>
							`
						);
					}
					if (feedData.itunes) {
						selected.append(
							`<a href="${feedData.itunes}">Listen on itunes</a>
								<br/>
								<br/>
							`
						);
					}
					if (feedData.spotify) {
						selected.append(
							`<a href="${feedData.spotify}">Listen on spotify</a>
								<br/>
								<br/>
							`
						);
					}
				}
			});

		if (
			data.sections &&
			Array.isArray(data.sections) &&
			data.sections.length > 0
		) {
			data.sections.sort((a, b) => {
				return a?.id - b?.id;
			});
			data.sections.forEach((section) => {
				if (section?.type && section.type === "list") {
					if (section?.data && Array.isArray(section.data)) {
					}
				}
			});
		}
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
	website_name: "podislam",
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
	sections: [
		{
			id: 1,
			section_name: "Disclaimer",
			type: "list",
			data: [
				"podislam and its developers is not responsible for any content linked to or referred to from this website.",
				"podislam and its developers does not accept responsibility for content hosted on third party websites.",
				"podislam and its developers is not responsible for any content uploaded to YouTube, Soundcloud, Video or any other online video hosting/streaming service embedded on our site.",
				"podislam feeds can be used for development of third party apps that has advertisement or monetary gain thereof without our permission.",
				"podislam and its developer does not necessarily agree with or condone the ideologies, messages, theological opinions and views of the speakers.",
				"Content on this site may be downloaded and can be forked . You may not use these files for commercial purposes as many of these files have rules and regulations that prevent their sale except by the publishing companies.",
				"podislam and its developers is not affiliated with any particular movement, sect, group, etc. We absolutely condemn in the strongest terms terrorism and any extremism done in the name of Islam and we refuse to associate ourselves with those who practice and condone such behavior and thoughts.",
			],
		},
	],
});

createWebPage();
module.exports = {
	envInfo,
	checkRequiredCommand,
	logger,
	createWebPage,
};
