import inquirer from 'inquirer';
import {envInfo, checkRequiredCommand} from './app/utils.js';

//https://github.com/contentful/contentful-cli/blob/ba28cb3f210dbf23095ebd4dfb78c22f124deb64/lib/cmds/guide.js#L22

//https://stackoverflow.com/questions/68170024/keep-repeating-the-prompter-questions-with-inquirer-js-based-on-answer
//https://stackoverflow.com/questions/74075310/how-to-properly-nest-inquirer-prompts


//        - create config yaml file
// - blog name
// - tittle
// - feed name
// - declaration
// - developer name
// - email

envInfo();
checkRequiredCommand();

const blogCreatoreGuide = [  
    {
        type: "string",
        name: "init",
        message: "Do u want to create new App?",
    },
    {
        type: "string",
        name: "blog_name",
    },
    {
        type: "string",
        name: "tittle",
    },
    {
        type: "string",
        name: "email",
    }
];

(async ()=> {

});