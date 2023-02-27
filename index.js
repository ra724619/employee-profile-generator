// define module
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

// define output directory, output file path and name
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// html page template
const render = require("./src/page-template.js");

// an empty array for team
const team = [];

// Initial app
const teamMember = () => {
    inquirer.prompt(
        [
    {
        type:'list',
        name:'teamMember',
        message:'What is the title of your employee?',
        choices:['Manager','Engineer','Intern','That is for today.'],
    },
    ])
    .then((val) => {
        if (val.teamMember === 'Manager') {
            getManager();
        } else if (val.teamMember === 'Engineer') {
            getEngineer();
        } else if (val.teamMember === 'Intern') {
            getIntern();
        } else {
            avengerAssemble();
        }
    });
}

// Get manager information
const getManager = () => {
    inquirer.prompt(
        [
    {
        type:'input',
        name: 'name',
        message: 'What is the name of the team manager?',
    },
    {
        type:'input',
        name: 'id',
        message: 'What is the employee ID of the team manager?', 
    },
    {
        type:'input',
        name: 'email',
        message: 'What is the employee email of the team manager?', 
    },
    {
        type:'input',
        name: 'officeNumber',
        message: 'What is the office number of the team manager?', 
    },
    ])
    .then((val) => {
        const manager = new Manager(val.name, val.id, val.email, val.officeNumber);
        console.table(manager);
        team.push(manager);
        teamMember();
    })
}

// Get engineer information
const getEngineer = () => {
    inquirer.prompt(
        [
    {
        type:'input',
        name: 'name',
        message: 'What is the name of the engineer?',
    },
    {
        type:'input',
        name: 'id',
        message: 'What is the employee ID of the engineer?', 
    },
    {
        type:'input',
        name: 'email',
        message: 'What is the employee email of the engineer?', 
    },
    {
        type:'input',
        name: 'github',
        message: 'What is the Github username of the engineer?', 
    },
    ])
    .then((val) => {
        const engineer = new Engineer(val.name, val.id, val.email, val.github);
        console.table(engineer);
        team.push(engineer);
        teamMember();
    })
}

// Get engineer information
const getIntern = () => {
    inquirer.prompt(
        [
    {
        type:'input',
        name: 'name',
        message: 'What is the name of the intern?',
    },
    {
        type:'input',
        name: 'id',
        message: 'What is the employee ID of the intern?', 
    },
    {
        type:'input',
        name: 'email',
        message: 'What is the employee email of the intern?', 
    },
    {
        type:'input',
        name: 'school',
        message: 'Which school is the intern from?', 
    },
    ])
    .then((val) => {
        const intern = new Intern(val.name, val.id, val.email, val.school);
        console.table(intern);
        team.push(intern);
        teamMember();
    })
}

const avengerAssemble = () => {
    if (!fs.existsSync(OUTPUT_DIR)){
        fs.mkdirSync(OUTPUT_DIR)
    } else {
        fs.writeFileSync(outputPath,render(team),'utf-8');
        console.log('HTML file created in the dist folder');
    }
}

const startApp = () => {
    teamMember();
}

startApp();