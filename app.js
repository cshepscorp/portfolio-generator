const inquirer = require('inquirer');

const promptUser = () => {
  return inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'what is your name?'
      },
      {
        type: 'input',
        name: 'github',
        message: 'Enter your GitHub Username'
      },
      {
        type: 'input',
        name: 'about',
        message: 'Provide some information about yourself:'
      }
    ]);
    
  };

const promptProject = portfolioData => {
    if (!portfolioData.projects) {// if no projects in portfolioData array
      portfolioData.projects = [];
    } 
    console.log(`
    =================
    ADD A NEW PROJECT
    =================
    `);
    return inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your project?'
      },
      {
        type: 'input',
        name: 'description',
        messge: 'Provide a description of the project (Required)'
      },
      {
        type: 'checkbox',
        name: 'languages',
        message: 'What did you build this project with? (Check all that apply)',
        choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
      },
      {
        type: 'input',
        name: 'link',
        message: 'Enter the GitHub link to your project. (Required)'
      },
      {
        type: 'confirm',
        name: 'feature',
        message: 'Would you like to feature this project?',
        default: false
      },
      {
        type: 'confirm',
        name: 'confirmAddProject',
        message: 'Would you like to enter another project?',
        default: false
      }
      ]).then(projectData => {
        portfolioData.projects.push(projectData);
        if (projectData.confirmAddProject) {
          // if we didn't include portfolioData as the argument, existing project data would be lost
          return promptProject(portfolioData);
       } else {
         return portfolioData;
       }
      });
    
};
// const fs = require('fs');
// const generatePage = require('./src/page-template.js'); // variable name here can be whatever but the relative path must be precise
// const pageHTML = generatePage(name, github);


// fs.writeFile('./index.html', pageHTML, err => {
// 	if (err) throw err;
// 	console.log('Portfolio complete! Check out index.html to see the output!');
// });
 
promptUser()
  .then(promptProject)
  .then(portfolioData => {
    console.log(portfolioData);
  });
