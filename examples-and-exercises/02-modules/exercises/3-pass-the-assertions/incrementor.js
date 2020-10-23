'use strict';
const chalk = require('chalk');
// write this file

console.log(chalk.green('Begin'), './incrementor.js');

const myObj = {
	state: {
		value: 0,
		increment: 1,
	},
	up() {
		this.state.value += this.state.increment;
	},

	get count() {
		return this.state.value;
	},
	down() {
		this.state.value -= this.state.increment;
	},
	set step(param) {
		this.state.increment = param;
	},
};

module.exports.increment = new Object(myObj);
