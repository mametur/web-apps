'use strict';
const chalk = require('chalk');
// write this file

console.log(chalk.green('Begin', './name-tag.js'));

class Name {
	state = {
		name: '',
		greeting: '',
	};

	constructor(name, greeting) {
		this.state.name = name;
		this.state.greeting = greeting;
	}

	get introduction() {
		return `${this.state.greeting} ${this.state.name}`;
	}

	set name(newName) {
		this.state.name = newName;
	}
}

module.exports = Name;
