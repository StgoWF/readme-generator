// index.js

// Import the inquirer and fs packages
const inquirer = require('inquirer');
const fs = require('fs');

// Function to generate a license badge based on the user's choice
function generateBadge(license) {
    if (license !== 'None') {
        // Convert to URL-friendly format
        const formattedLicense = license.replace(/ /g, '_').replace(/\./g, '').toUpperCase();
        return `![License](https://img.shields.io/badge/License-${formattedLicense}-yellow.svg)`;
    } else {
        return '';
    }
}

// Function to generate README content
function generateReadme(answers) {
    return `
# ${answers.title}
${generateBadge(answers.license)}

## Description
${answers.description}

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation
\`\`\`
${answers.installation}
\`\`\`

## Usage
${answers.usage}

## License
This project is licensed under the ${answers.license} license.

## Contributing
${answers.contributing}

## Tests
\`\`\`
${answers.tests}
\`\`\`

## Questions
If you have any questions about the repo, open an issue or contact me directly at [${answers.email}](mailto:${answers.email}).
You can find more of my work at [${answers.github}](https://github.com/${answers.github}/).
`;
}

// Function to initialize the application
function init() {
    const questions = [
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of your project?',
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project:',
        },
        {
            type: 'input',
            name: 'installation',
            message: 'Provide the installation instructions:',
        },
        {
            type: 'input',
            name: 'usage',
            message: 'Provide the usage information:',
        },
        {
            type: 'input',
            name: 'contributing',
            message: 'Provide the contributing guidelines:',
        },
        {
            type: 'input',
            name: 'tests',
            message: 'Provide the test instructions:',
        },
        {
            type: 'list',
            name: 'license',
            message: 'Choose a license for your project:',
            choices: ['MIT', 'Apache 2.0', 'GPLv3', 'BSD 3-Clause', 'None'],
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub username:',
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter your email address:',
        },
    ];

    inquirer.prompt(questions).then((answers) => {
        const readmeContent = generateReadme(answers);
        fs.writeFile('README.md', readmeContent, (err) => {
            if (err) throw err;
            console.log('Successfully wrote README.md');
        });
    });
}

// Call the initialize function to start the application
init();
