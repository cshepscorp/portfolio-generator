const inquirer = require('inquirer');

const promptUser = () => {
  return inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'what is your name?',
        validate: nameInput => {
          if (nameInput) {
            return true;
          } else {
            console.log('Please enter your name!');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'github',
        message: 'Enter your GitHub Username',
        validate: githubInput => {
          if (githubInput) {
            return true;
          } else {
            console.log('Please enter your github username!');
            return false;
          }
        }
      },
      {
        type: 'confirm',
        name: 'confirmAbout',
        message: 'Would you like to enter some information about yourself for an "About" section?',
        default: true
      },
      {
        type: 'input',
        name: 'about',
        message: 'Provide some information about yourself: ',
        // The inquirer method automatically passes an object 
        // containing the user's answers to the when function
        when: ({ confirmAbout }) => {
          if (confirmAbout) {
            return true;
          } else {
            return false;
          }
        }
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
        message: 'What is the name of your project?',
        validate: projNameInput => {
          if (projNameInput) {
            return true;
          } else {
            console.log('Please enter a project name!');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'description',
        messge: 'Provide a description of the project (Required)',
        validate: projDescInput => {
          if (projDescInput) {
            return true;
          } else {
            console.log('Please enter a project description.');
            return false;
          }
        }
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
        message: 'Enter the GitHub link to your project. (Required)',
        validate: githubLinkInput => {
          if (githubLinkInput) {
            return true;
          } else {
            console.log('Please enter the link to your project on github.');
            return false;
          }
        }
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
 
promptUser()
  .then(promptProject)
  .then(portfolioData => {
    console.log(portfolioData);
  });


  // const fs = require('fs');
// const generatePage = require('./src/page-template.js'); // variable name here can be whatever but the relative path must be precise
// const pageHTML = generatePage(name, github);


// fs.writeFile('./index.html', pageHTML, err => {
// 	if (err) throw err;
// 	console.log('Portfolio complete! Check out index.html to see the output!');
// });