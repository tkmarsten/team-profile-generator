const inquirer = require('inquirer')
const fs = require('fs')
const generate = require('./util/generateHtml')
const Manager = require('./lib/Manager')
const Engineer = require('./lib/Engineer')
const Intern = require('./lib/Intern')

// Initialize team array
const team = []

/**
 * Displays the prompt asking the user for the manager information.
 */
function userPrompt() {
  inquirer.prompt([
    {
      type: 'input',
      message: 'Enter the team manager name',
      name: 'managerName'
    },
    {
      type: 'input',
      message: 'Enter the team manager employee ID',
      name: 'managerID'
    },
    {
      type: 'input',
      message: 'Enter the team manager email',
      name: 'managerEmail'
    },
    {
      type: 'input',
      message: 'Enter the team manager office number',
      name: 'managerOfficeNumber'
    }
  ])
    .then(answers => {
      team.push(new Manager(answers.managerName, answers.managerID, answers.managerEmail, answers.managerOfficeNumber))
      displayOptions()
    })
}

/**
 * Displays available options for adding additional team members.
 */
function displayOptions() {
  inquirer.prompt([
    {
      type: 'list',
      message: 'Select an option',
      choices: ['Add engineer', 'Add intern', 'Finish building team'],
      name: 'userOptions'
    }
  ])
    .then(answers => {
      switch (answers.userOptions) {
        case 'Add engineer':
          createEngineer()
          break

        case 'Add intern':
          createIntern()
          break

        default:
          fs.writeFile('index.html', generate(team), (err) => {
            console.log(err)
          })
          break
      }
    })
}

/**
 * Prompts the user to create a new engineer.
 */
function createEngineer() {
  inquirer.prompt([
    {
      type: 'input',
      message: 'Enter the engineer name',
      name: 'engineerName'
    },
    {
      type: 'input',
      message: 'Enter the engineer employee ID',
      name: 'engineerID'
    },
    {
      type: 'input',
      message: 'Enter the engineer email',
      name: 'engineerEmail'
    },
    {
      type: 'input',
      message: 'Enter the engineer Github',
      name: 'engineerGithub'
    }
  ])
    .then(answers => {
      team.push(new Engineer(answers.engineerName, answers.engineerID, answers.engineerEmail, answers.EngineerGithub))
      displayOptions()
    })
}

/**
 * Prompts the user to create a new intern.
 */
function createIntern() {
  inquirer.prompt([
    {
      type: 'input',
      message: 'Enter the intern name',
      name: 'internName'
    },
    {
      type: 'input',
      message: 'Enter the intern employee ID',
      name: 'internID'
    },
    {
      type: 'input',
      message: 'Enter the intern email',
      name: 'internEmail'
    },
    {
      type: 'input',
      message: 'Enter the intern school',
      name: 'internSchool'
    }
  ])
    .then(answers => {
      team.push(new Intern(answers.internName, answers.internID, answers.internEmail, answers.internSchool))
      displayOptions()
    })
}

userPrompt()