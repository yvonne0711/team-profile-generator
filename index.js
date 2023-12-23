const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
// from activity 7 
// asychronous 
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

// team being an array
const team = [];

// array of questions for user
const questionManager = () =>
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the manager\'s name?',
                name: 'name',
            },
            {
                type: 'input',
                message: 'What is the manager\'s ID?',
                name: 'id',
            },
            {
                type: 'input',
                message: 'What is the manager\'s email address?',
                name: 'email',
            },
            {
                type: 'input',
                message: 'What is the manager\'s office number?',
                name: 'officeNumber',
            },
        ]);

//constructing class and store
questionManager()
        .then((answers) => {
            const manager = new Manager(
                answers.name,
                answers.id,
                answers.email,
                answers.officeNumber
            );
            //push these to the team array
            team.push(manager);
            //menu
            questionTeam();
        })

// array of questions for user
const questionTeam = () =>
    inquirer
        .prompt([
            {
                //choose team member menu
                type: 'list',
                message: 'Please add a team member',
                name: 'members',
                choices: ['Engineer', 'Intern', 'Finish building the team'],
            },
        ])
        .then((answers) => {
            if (answers.members === 'Engineer') {
                questionEngineer();
            }
            else if (answers.members === 'Intern') {
                questionIntern();
            }
            else {
                if (err) {
                    console.error(err);
                } else {
                    const generateHTML = render(team);
                    writeFileAsync(outputPath, generateHTML);
                    console.log("Successful");
                }     
            }
        });

// array of questions for user
const questionEngineer = () =>
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the engineer\'s name?',
                name: 'name',
            },
            {
                type: 'input',
                message: 'What is the engineer\'s ID?',
                name: 'id',
            },
            {
                type: 'input',
                message: 'What is the engineer\'s email address?',
                name: 'email',
            },
            {
                type: 'input',
                message: 'What is the engineer\'s github username?',
                name: 'github',
            },
        ]);

//constructing class and store
questionEngineer()
        .then((answers) => {
            const engineer = new Engineer(
                answers.name,
                answers.id,
                answers.email,
                answers.github
            );
            //push these to the team array
            team.push(engineer);
            //menu
            questionTeam();
        })

// array of questions for user
const questionIntern = () =>
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the intern\'s name?',
                name: 'name',
            },
            {
                type: 'input',
                message: 'What is the intern\'s ID?',
                name: 'id',
            },
            {
                type: 'input',
                message: 'What is the intern\'s email address?',
                name: 'email',
            },
            {
                type: 'input',
                message: 'What is the intern\'s school?',
                name: 'school',
            },
        ]);

//constructing class and store
questionIntern()
        .then((answers) => {
            const intern = new Intern(
                answers.name,
                answers.id,
                answers.email,
                answers.school
            );
            //push these to the team array
            team.push(intern);
            //menu
            questionTeam();
        })

// initialisation 
questionManager();