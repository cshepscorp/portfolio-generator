const fs = require('fs');
const generatePage = require('./src/page-template.js'); // variable name here can be whatever but the relative path must be precise

const profileDataArgs = process.argv.slice(2);

const [name, github] = profileDataArgs;

//console.log(generatePage(name, github));

fs.writeFile('./index.html', generatePage(name, github), err => {
	if (err) throw err;
	console.log('Portfolio complete! Check out index.html to see the output!');
});
 

