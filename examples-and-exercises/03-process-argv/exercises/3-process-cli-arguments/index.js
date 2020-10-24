'use strict';

const repeater = require('./repeater.js');

const userArguments = process.argv.slice(2);

console.log(userArguments);

const result = repeater(userArguments[0], parseInt(userArguments[1]));

console.log(result);
