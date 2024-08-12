const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const { spawn } = require('child_process');

// Path to the nest-cli.json file
const nestCliPath = path.resolve(__dirname, '../nest-cli.json');

// Read and parse the nest-cli.json file
const nestCliConfig = JSON.parse(fs.readFileSync(nestCliPath, 'utf8'));

// Filter the projects to include only those with type "application"
const applications = Object.entries(nestCliConfig.projects)
	.filter(([_name, config]) => config.type === 'application')
	.map(([name]) => name);

// Prompt the user to select an application
let appChosen = null;
inquirer.default
	.prompt([
		{
			type: 'list',
			name: 'choice',
			message: 'Select an application to run:',
			choices: applications,
		},
	])
	.then((answers) => {
		const { choice } = answers;
		console.log(`Starting development server for: ${choice}`);
		appChosen = choice;

		// Run the command to start the selected application
		const command = `pnpm`;
		const args = [`start:dev`, choice];
		const child = spawn(command, args, { stdio: 'inherit' });

		// Handle process events
		child.on('error', (error) => {
			console.error(`Error: ${error.message}`);
		});

		child.on('close', (code) => {
			if (code !== 0) {
				console.error(`Process exited with code ${code}`);
			}
		});
	})
	.catch((error) => {
		console.error(`Something went wrong when start app: ${appChosen}`, error);
	});
