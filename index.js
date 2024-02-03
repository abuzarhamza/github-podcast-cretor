const inquirer = require("inquirer");
const fs = require("fs");

//import { envInfo, checkRequiredCommand } from "./app/utils.js";
const { envInfo, checkRequiredCommand } = require("./app/utils");

//https://github.com/contentful/contentful-cli/blob/ba28cb3f210dbf23095ebd4dfb78c22f124deb64/lib/cmds/guide.js#L22

//https://stackoverflow.com/questions/68170024/keep-repeating-the-prompter-questions-with-inquirer-js-based-on-answer
//https://stackoverflow.com/questions/74075310/how-to-properly-nest-inquirer-prompts

// # TODO
// -  add command for
//     -init
//         - create new config yaml file
//             -y
//             -n
//                 Have the yaml config file
//                 Want to initialize app folder

//         - blog name
//         - tittle
//         - declaration
//         - developer name
//         - email
//         - feed_name folder
//     -feed-updater
//         - create new feed folder
//         - update feed folder
//             - mp3 url
//             - title
//             -tag
//             - discription
//         - delete
//     - gitlab-init

// envInfo();
// checkRequiredCommand();

async function createAppFromYmlPrompter() {
	let createAppData = await inquirer.prompt([
		{
			type: "string",
			name: "yml_file_path",
			message: "Give the complete path of the config yml file?",
			validate(value) {
				if (!fs.existsSync(value)) {
					return "no file found!";
				}
				return true;
			},
		},
	]);
}

async function createNewAppPromter() {
	const answers = await inquirer.prompt([
		{
			type: "string",
			name: "blog_name",
			message: "What is the blog name?",
		},
		{
			type: "string",
			name: "tittle",
			message: "What is the tittle?",
		},
		{
			type: "string",
			name: "contact_name",
			message: "What is the contact?",
			default() {
				return "foo bar";
			},
		},
		{
			type: "string",
			name: "email",
			message: "What is the email for podcast?",
			default() {
				return "null@null.null";
			},
		},
		{
			type: "string",
			name: "feed_dir",
			message: "What is the new feed name for podcast?",
			validate(value) {
				const fail = !value.match(/^[a-zA-Z0-9_]*$/);
				if (fail) return "feed name directory has special character!";
				return true;
			},
		},
	]);
	await runNewSetupJob(answers);
}

async function newAppPrompter() {
	const answer = await inquirer.prompt([
		{
			type: "string",
			name: "yml_file_status",
			message: "Have the yaml config file? y|n",
			validate(value) {
				console.log(value);
				const pass = value.match(/^(y|n)$/);
				if (pass) return true;
				return "Enter `y` or `n`";
			},
		},
	]);

	switch (answer.yml_file_status) {
		case "y":
			createAppFromYmlPrompter();
			break;
		case "n":
			createNewAppPromter();
			break;
	}
}

async function startApp() {
	let answer = await inquirer.prompt([
		{
			type: "list",
			name: "command",
			message: "What u want to do?",
			choices: [
				"create_a_new_app",
				"update_app_config_yml",
				"update_feed_yml",
			],
		},
	]);
	console.log(answer);
	switch (answer.command) {
		case "create_a_new_app":
			newAppPrompter();
			break;
		case "update_app_config_yml":
			break;
		case "update_feed_yml":
			break;
	}
}

async function main() {
	envInfo();
	checkRequiredCommand();
	await startApp();
}
console.log("Hello 💖💓💜❤️‍🔥  aisha 🍌🍌🍌🍌🍌🍌");
main();
