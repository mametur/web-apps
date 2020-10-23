'use strict';

// write this file

console.log('BEGIN', './keep-truthy.js');

module.exports = (array) => {
	let newArray = [];

	array.forEach((element) => {
		if (Boolean(element)) {
			newArray.push(element);
		}
	});
	return newArray;
};
